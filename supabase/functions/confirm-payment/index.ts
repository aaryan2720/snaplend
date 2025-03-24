
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
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
    const { paymentIntentId, status } = await req.json();
    
    if (!paymentIntentId || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    // Get the payment intent
    const { data: paymentIntent, error: paymentIntentError } = await supabaseClient
      .from('payment_intents')
      .select('booking_id, status')
      .eq('id', paymentIntentId)
      .single();
    
    if (paymentIntentError || !paymentIntent) {
      return new Response(
        JSON.stringify({ error: 'Payment intent not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }
    
    // Update payment intent status
    const { error: updatePaymentError } = await supabaseClient
      .from('payment_intents')
      .update({ status })
      .eq('id', paymentIntentId);
    
    if (updatePaymentError) {
      return new Response(
        JSON.stringify({ error: 'Failed to update payment intent' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // If payment was successful, update booking status
    if (status === 'succeeded') {
      const { error: updateBookingError } = await supabaseClient
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', paymentIntent.booking_id);
      
      if (updateBookingError) {
        console.error('Error updating booking status:', updateBookingError);
        // We don't return an error here because the payment was successful
      }
    }
    
    return new Response(
      JSON.stringify({ success: true, status }),
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
