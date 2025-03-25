
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { AlertCircle, Calendar, CheckCircle, CreditCard, Loader2, ShieldCheck, XCircle } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPayment = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  
  // Process state
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error" | "processing">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { shippingDetails } = location.state || {};
  
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
    
    // Basic validation
    if (!cardNumber || !cardName || !expiry || !cvc) {
      toast({
        title: "Incomplete payment details",
        description: "Please fill in all payment fields",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    setPaymentStatus("processing");
    
    try {
      // Calculate total amount including shipping and tax
      const totalAmount = getCartTotal() + 49 + Math.round(getCartTotal() * 0.18);
      
      // Generate a mock client secret (in production this would come from your backend)
      const mockClientSecret = 'mock_' + Math.random().toString(36).substr(2, 9);

      // Navigate to payment page with necessary details
      navigate("/payment", {
        state: {
          amount: totalAmount,
          clientSecret: mockClientSecret
        }
      });
      
      setPaymentStatus("success");
      clearCart(); // Clear the cart after successful navigation
    } catch (error) {
      console.error("Booking creation error:", error);
      setPaymentStatus("error");
      setErrorMessage(typeof error === 'object' && error !== null && 'message' in error 
        ? error.message 
        : "An unexpected error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format expiry date (MM/YY)
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
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
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Name on card</Label>
                    <Input 
                      id="cardName" 
                      value={cardName} 
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Smith"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber" className="flex items-center">
                      Card number
                      <CreditCard className="ml-2 h-4 w-4 text-gray-400" />
                    </Label>
                    <Input 
                      id="cardNumber" 
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="flex items-center">
                        Expiry date
                        <Calendar className="ml-2 h-4 w-4 text-gray-400" />
                      </Label>
                      <Input 
                        id="expiry" 
                        value={expiry} 
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        value={cvc} 
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        maxLength={3}
                        type="password"
                      />
                    </div>
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
                  <div className="flex items-center justify-center mb-2">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <p>Secure payment processing</p>
                  </div>
                  <p>This is a demo. No real payments will be processed.</p>
                  <p className="mt-1">Use any card number, future expiry date, and any 3 digits for CVC.</p>
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
              <p>This is a demo application with mock payment processing.</p>
            </div>
            <div className="flex items-start">
              <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>No real payments will be processed.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPayment;
