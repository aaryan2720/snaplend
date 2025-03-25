
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Import Stripe library for handling payments
// Note: In a real implementation, you'd use a proper Stripe deno package
interface StripePaymentIntent {
  id: string;
  client_secret: string;
  status: string;
}

// Mock Stripe implementation for demo purposes
// In a real app, you would use the Stripe SDK
const mockStripeCreatePaymentIntent = async (amount: number): Promise<StripePaymentIntent> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate random ID
  const id = `pi_${Math.random().toString(36).substring(2, 15)}`;
  const clientSecret = `${id}_secret_${Math.random().toString(36).substring(2, 15)}`;
  
  return {
    id,
    client_secret: clientSecret,
    status: 'requires_payment_method'
  };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create Supabase client
    const supabaseClient = createClient(
      'https://aklactzqyglyzkvwugjm.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbGFjdHpxeWdseXprdnd1Z2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MDE0NjIsImV4cCI6MjA1ODI3NzQ2Mn0.afOHXyKjdpGvI2MzHMr6hcwalGGukwSXG96WDprjbjY',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    // Get the requesting user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }
    
    // Parse request body
    const { bookingId, amount } = await req.json();
    
    if (!bookingId || !amount) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Verify booking exists and belongs to user
    const { data: booking, error: bookingError } = await supabaseClient
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .eq('renter_id', user.id)
      .single();
    
    if (bookingError || !booking) {
      return new Response(
        JSON.stringify({ error: 'Booking not found or not owned by user' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }
    
    // In a real app, get Stripe API key from environment variables
    // const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
    
    // Create payment intent (using mock for demo)
    const paymentIntent = await mockStripeCreatePaymentIntent(amount);
    
    // Store payment intent in database
    const { data: paymentData, error: paymentError } = await supabaseClient
      .from('payment_intents')
      .insert({
        id: paymentIntent.id,
        booking_id: bookingId,
        amount: amount,
        currency: 'inr',
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret
      })
      .select()
      .single();
    
    if (paymentError) {
      console.error('Error storing payment intent:', paymentError);
      return new Response(
        JSON.stringify({ error: 'Failed to store payment intent' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    return new Response(
      JSON.stringify(paymentData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
