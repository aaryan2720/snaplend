
import { supabase } from "@/integrations/supabase/client";

export interface PaymentIntent {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled' | 'failed';
  client_secret: string;
}

// This function will call our Supabase Edge Function to create a Stripe payment intent
export const createStripePaymentIntent = async (bookingId: string, amount: number): Promise<PaymentIntent> => {
  const { data, error } = await supabase.functions.invoke('create-stripe-payment', {
    body: { bookingId, amount }
  });

  if (error) {
    console.error("Error creating Stripe payment intent:", error);
    throw error;
  }

  return data as PaymentIntent;
};

// Confirm the payment with Stripe
export const confirmStripePayment = async (
  paymentIntentId: string, 
  status: PaymentIntent['status']
): Promise<void> => {
  const { error } = await supabase.functions.invoke('confirm-stripe-payment', {
    body: { paymentIntentId, status }
  });

  if (error) {
    console.error("Error confirming payment:", error);
    throw error;
  }
};
