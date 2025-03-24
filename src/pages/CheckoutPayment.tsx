
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { createPaymentIntent, processPayment } from "@/services/paymentService";
import { createBooking } from "@/services/bookingService";
import { useToast } from "@/components/ui/use-toast";

const CheckoutPayment = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Payment form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });
  
  // Process state
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error" | "processing">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { shippingDetails } = location.state || {};
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shippingDetails) {
      toast({
        title: "Missing shipping details",
        description: "Please go back and enter your shipping information",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    setPaymentStatus("processing");
    
    try {
      // Step 1: Create a booking for each cart item
      const bookingIds: string[] = [];
      
      for (const cartItem of cartItems) {
        const booking = {
          listing_id: cartItem.item.id,
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          total_price: cartItem.item.price * cartItem.quantity,
          deposit_paid: cartItem.item.price * 0.2 // 20% deposit
        };
        
        const bookingId = await createBooking(booking);
        bookingIds.push(bookingId);
      }
      
      // Step 2: Create payment intent
      const totalAmount = getCartTotal();
      const paymentIntent = await createPaymentIntent(bookingIds[0], totalAmount);
      
      // Step 3: Process the payment
      const result = await processPayment(paymentIntent.client_secret, {
        cardNumber: cardDetails.cardNumber,
        expiry: cardDetails.expiry,
        cvc: cardDetails.cvc,
        name: cardDetails.cardName
      });
      
      if (result.success) {
        setPaymentStatus("success");
        // Clear cart after successful payment
        clearCart();
        
        toast({
          title: "Payment successful!",
          description: "Your order has been placed successfully.",
          variant: "default"
        });
        
        // Redirect to success page after a delay
        setTimeout(() => {
          navigate("/payment-success", { 
            state: { 
              bookingIds,
              totalAmount,
              paymentIntentId: paymentIntent.id,
              paymentStatus: 'succeeded'
            }
          });
        }, 2000);
      } else {
        setPaymentStatus("error");
        setErrorMessage(result.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setPaymentStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <Container className="py-12 min-h-[calc(100vh-5rem)] flex items-center justify-center flex-col">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            You don't have any items in your cart yet. Add some items to proceed to checkout.
          </p>
          <Button onClick={() => navigate("/explore")}>Browse Items</Button>
        </div>
      </Container>
    );
  }
  
  return (
    <Container className="py-12 min-h-[calc(100vh-5rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Payment Information</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Enter your payment details</CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardDetails.cardName}
                    onChange={handleInputChange}
                    required
                    disabled={processing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    required
                    disabled={processing}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleInputChange}
                      required
                      disabled={processing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cvc">CVV/CVC</Label>
                    <Input 
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={handleInputChange}
                      required
                      disabled={processing}
                    />
                  </div>
                </div>
                
                {paymentStatus === "error" && (
                  <div className="bg-red-50 p-4 rounded-md flex items-center space-x-2 text-red-800">
                    <XCircle size={20} />
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${getCartTotal()}`
                  )}
                </Button>
                
                {paymentStatus === "success" && (
                  <div className="bg-green-50 p-4 rounded-md flex items-center space-x-2 text-green-800">
                    <CheckCircle size={20} />
                    <span>Payment successful! Redirecting...</span>
                  </div>
                )}
                
                <div className="text-sm text-gray-500 text-center pt-4">
                  <p>Test Mode: Use any values for the card fields.</p>
                  <p className="mt-1">No real payments will be processed.</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.item.image} 
                        alt={item.item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.item.title}</h4>
                      <div className="flex justify-between mt-1 text-sm">
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-medium">₹{item.item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹49</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{Math.round(getCartTotal() * 0.18)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{getCartTotal() + 49 + Math.round(getCartTotal() * 0.18)}</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-sm text-gray-600">
            <div className="flex items-start mb-2">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>This is a demo application. No real payments will be processed.</p>
            </div>
            <div className="flex items-start">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>In a production app, secure payment processing would be implemented using Stripe or a similar service.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPayment;
