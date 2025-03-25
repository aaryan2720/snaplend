
// Mock service for stripe payments since we're not implementing real payments
import { supabase } from "@/integrations/supabase/client";

export interface PaymentIntent {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled' | 'failed';
  client_secret: string;
}

// This function simulates creating a payment intent (without making real API calls)
export const createStripePaymentIntent = async (bookingId: string, amount: number): Promise<PaymentIntent> => {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock payment intent
  return {
    id: 'pi_' + Math.random().toString(36).substring(2, 15),
    booking_id: bookingId,
    amount: amount,
    currency: 'inr',
    status: 'succeeded',
    client_secret: 'mock_secret_' + Math.random().toString(36).substring(2, 15)
  };
};

// Confirm the payment (mock function)
export const confirmStripePayment = async (
  paymentIntentId: string, 
  status: PaymentIntent['status']
): Promise<void> => {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Payment ${paymentIntentId} confirmed with status: ${status}`);
  return;
};
