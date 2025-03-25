
import { supabase } from "@/integrations/supabase/client";

export interface PaymentIntent {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled' | 'failed';
  client_secret: string;
}

// This function will call our Supabase Edge Function to create a payment intent
export const createPaymentIntent = async (bookingId: string, amount: number): Promise<PaymentIntent> => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Auth session details:', {
        hasSession: !!session,
        error: sessionError,
        accessToken: session?.access_token
      });
      throw new Error('Authentication required');
    }
    
    console.log('Attempting to create payment intent with:', {
      bookingId,
      amount,
      accessToken: session.access_token.substring(0, 6) + '...'
    });
    
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: { bookingId, amount },
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });

    if (error) {
      console.error("Error creating payment intent:", {
        message: error.message,
        status: error.status,
        stack: error.stack
      });
      throw new Error(error.message || 'Failed to create payment intent');
    }

    if (!data) {
      throw new Error('No payment intent data received');
    }

    return data as PaymentIntent;
  } catch (error) {
    console.error("Error in createPaymentIntent:", error);
    throw error;
  }
};

// This function will store the payment result after successful processing
export const confirmPayment = async (
  paymentIntentId: string, 
  status: PaymentIntent['status']
): Promise<void> => {
  const { error } = await supabase.functions.invoke('confirm-payment', {
    body: { paymentIntentId, status }
  });

  if (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};

// Mock function to process payment client-side
// In a real implementation, this would use Stripe Elements or similar
export const processPayment = async (
  clientSecret: string,
  paymentDetails: {
    cardNumber: string;
    expiry: string;
    cvc: string;
    name: string;
  }
): Promise<{ success: boolean; error?: string }> => {
  // In a real app, this would use Stripe.js to handle the payment processing
  // For now, we'll simulate a successful payment
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple validation
  if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvc) {
    return { success: false, error: "All card details are required" };
  }
  
  // Randomly succeed or fail for demo purposes
  const success = Math.random() > 0.2; // 80% success rate
  
  if (success) {
    return { success: true };
  } else {
    return { 
      success: false, 
      error: "Payment failed. Please try again or use a different payment method." 
    };
  }
};
