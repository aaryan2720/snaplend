
import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { confirmStripePayment } from "@/services/stripePaymentService";
import { useToast } from "@/components/ui/use-toast";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { bookingIds, totalAmount, paymentIntentId = null, paymentStatus = "succeeded" } = location.state || {};
  
  useEffect(() => {
    // If no bookingIds are passed, navigate back to home
    if (!bookingIds || bookingIds.length === 0) {
      navigate("/");
      return;
    }
    
    // Confirm payment in backend if paymentIntentId is provided
    const updatePaymentStatus = async () => {
      if (paymentIntentId) {
        try {
          await confirmStripePayment(paymentIntentId, paymentStatus);
        } catch (error) {
          console.error("Error confirming payment:", error);
          toast({
            title: "Payment confirmation issue",
            description: "There was an issue confirming your payment, but your order is being processed.",
            variant: "destructive"
          });
        }
      }
    };
    
    updatePaymentStatus();
  }, [bookingIds, navigate, paymentIntentId, paymentStatus, toast]);
  
  return (
    <Container className="py-12 min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <Card className="w-full max-w-md border-green-200 shadow-md">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your payment of ₹{totalAmount} has been processed successfully.
          </p>
          
          <div className="w-full p-4 bg-gray-50 rounded-md mb-6">
            <h3 className="font-medium mb-2">Order Details</h3>
            <p className="text-sm text-gray-600">
              Booking ID{bookingIds.length > 1 ? 's' : ''}: {bookingIds.join(', ')}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Amount: ₹{totalAmount}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button 
              onClick={() => navigate("/profile")}
              className="flex-1"
              variant="outline"
            >
              View My Bookings
            </Button>
            
            <Button 
              asChild
              className="flex-1"
            >
              <Link to="/explore">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentSuccess;
