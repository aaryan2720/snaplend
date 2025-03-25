
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Printer, Share2 } from "lucide-react";
import { confirmStripePayment } from "@/services/stripePaymentService";
import { useToast } from "@/components/ui/use-toast";
import confetti from "canvas-confetti";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  const { bookingIds, totalAmount, paymentIntentId = null, paymentStatus = "succeeded" } = location.state || {};
  
  useEffect(() => {
    // If no bookingIds are passed, navigate back to home
    if (!bookingIds || bookingIds.length === 0) {
      navigate("/");
      return;
    }
    
    // Trigger success animation
    const runAnimation = async () => {
      // Launch confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const confettiAnimation = () => {
        confetti({
          particleCount: 2,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'],
        });
        
        if (Date.now() < animationEnd) {
          requestAnimationFrame(confettiAnimation);
        } else {
          setAnimationComplete(true);
        }
      };
      
      confettiAnimation();
      
      // Fire a big burst of confetti at start
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };
    
    runAnimation();
    
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
  
  const handleDownloadAgreement = async () => {
    setDownloading(true);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Agreement Downloaded",
      description: "Rental agreement has been downloaded successfully.",
    });
    
    setDownloading(false);
  };
  
  return (
    <Container className="py-12 min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="animate-fade-in">
          <Card className="border-green-200 shadow-md overflow-hidden">
            <div className="bg-green-50 p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-[pulse_2s_ease-in-out_infinite]">
                <CheckCircle className="h-12 w-12 text-green-600" strokeWidth={1.5} />
              </div>
              
              <h1 className="text-2xl font-bold mb-2 text-green-800">Payment Successful!</h1>
              
              <p className="text-green-700 mb-2">
                Thank you for your order. Your payment of ₹{totalAmount} has been processed successfully.
              </p>
              
              <div className="text-sm text-green-600 py-2 px-3 bg-green-100 rounded-full inline-block">
                Transaction ID: {paymentIntentId?.substring(0, 8) || "TXN12345678"}
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <h3 className="font-medium mb-2 text-snaplend-800">Booking Details</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      Booking ID{bookingIds.length > 1 ? 's' : ''}: {bookingIds.join(', ')}
                    </p>
                    <p>
                      Amount: ₹{totalAmount}
                    </p>
                    <p>
                      Status: <span className="text-green-600 font-medium">Confirmed</span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h3 className="font-medium mb-2 text-blue-800">Trust Agreement</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Your rental trust agreement has been generated and is ready for download.
                  </p>
                  <Button 
                    onClick={handleDownloadAgreement} 
                    variant="outline"
                    className="w-full flex items-center justify-center bg-white hover:bg-blue-50"
                    disabled={downloading}
                  >
                    {downloading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        Preparing Document...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download Agreement
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center justify-center space-x-3 pt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600"
                    onClick={() => {
                      toast({
                        title: "Print requested",
                        description: "Printing dialog should open now.",
                      });
                      // In a real app, this would trigger the print dialog
                    }}
                  >
                    <Printer className="mr-1 h-4 w-4" />
                    Print
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600"
                    onClick={() => {
                      toast({
                        title: "Link copied",
                        description: "Booking confirmation link copied to clipboard.",
                      });
                      // In a real app, this would copy a link to clipboard
                    }}
                  >
                    <Share2 className="mr-1 h-4 w-4" />
                    Share
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Button 
                    onClick={() => navigate("/bookings")}
                    variant="outline"
                  >
                    View My Bookings
                  </Button>
                  
                  <Button 
                    asChild
                  >
                    <Link to="/explore">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
