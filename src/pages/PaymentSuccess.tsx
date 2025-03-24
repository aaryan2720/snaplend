
import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Home, ShoppingBag } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const { bookingIds, totalAmount } = location.state || {};
  
  // If no booking data, redirect to home
  if (!bookingIds || !totalAmount) {
    return <Navigate to="/" replace />;
  }
  
  // Generate a random order ID
  const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
  
  return (
    <Container className="py-16 min-h-[calc(100vh-5rem)]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-700">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mt-2">
            Thank you for your order. Your transaction has been completed.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between pb-4 border-b">
                <div>
                  <h3 className="font-medium text-gray-500">Order ID</h3>
                  <p className="font-bold">{orderId}</p>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <h3 className="font-medium text-gray-500">Date</h3>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Total Amount</span>
                    <span className="font-bold">₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tax</span>
                    <span>₹{Math.round(totalAmount * 0.18)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>₹49</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                    <span>Total Paid</span>
                    <span>₹{totalAmount + Math.round(totalAmount * 0.18) + 49}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-500 mb-2">Booking Information</h3>
                <p className="text-sm text-gray-600">
                  {bookingIds.length === 1 ? (
                    `Your booking (ID: ${bookingIds[0]}) has been confirmed.`
                  ) : (
                    `${bookingIds.length} bookings have been confirmed.`
                  )}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  You can view your booking details in your account under "My Bookings".
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">What happens next?</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    The owner will be notified of your booking. You'll receive further instructions about the pickup or delivery of your rental item via email.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
          <Link to="/profile">
            <Button className="w-full sm:w-auto">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View My Bookings
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
