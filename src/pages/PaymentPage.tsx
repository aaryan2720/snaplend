import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { processPayment } from '@/services/paymentService';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';

interface PaymentDetails {
  cardNumber: string;
  expiry: string;
  cvc: string;
  name: string;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const clientSecret = location.state?.clientSecret;
  const amount = location.state?.amount;

  useEffect(() => {
    if (!clientSecret || !amount) {
      navigate('/checkout');
    }
  }, [clientSecret, amount, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmation = async (confirmed: boolean) => {
    if (confirmed) {
      setShowConfirmation(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      navigate('/checkout');
    }
  };

  const [showStripeInfo, setShowStripeInfo] = useState(false);

  useEffect(() => {
    const handleClick = () => {
      if (!showStripeInfo) {
        setShowStripeInfo(true);
        setTimeout(() => setShowStripeInfo(false), 2000);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showStripeInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await processPayment(clientSecret, paymentDetails);
      if (result.success) {
        setShowConfirmation(true);
      } else {
        setError(result.error || 'Payment failed');
      }
    } catch (err) {
      setError('An error occurred while processing your payment');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen flex items-center justify-center">
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 1,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            className="inline-block mb-6"
          >
            <CheckCircle2 className="w-24 h-24 text-green-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-600 mb-8"
          >
            Thank you for your payment. You will be redirected to homepage shortly...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen flex items-center justify-center">
        <Card className="p-8 w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to proceed with the payment?</p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => handleConfirmation(false)}
              >
                No, Cancel
              </Button>
              <Button
                onClick={() => handleConfirmation(true)}
              >
                Yes, Proceed
              </Button>
            </div>
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl relative">
      {showStripeInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <svg className="h-12 mx-auto mb-4" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg">
              <path d="M59.64 14.28h-8.06v-1.83h8.06v1.83zm-9.92-5.85h-5.36v1.83h5.36v-1.83zm-8.06 5.85h4.87v-1.83h-4.87v1.83zm-4.95-5.85h-6.85v1.83h6.85v-1.83zm-8.93 5.85h4.87v-1.83h-4.87v1.83zm-4.95-5.85h-6.85v1.83h6.85v-1.83zm-8.93 5.85h4.87v-1.83h-4.87v1.83zM.94 8.43H0v1.83h.94V8.43z" fill="#32325d"/>
            </svg>
            <p className="text-gray-800 font-medium">Protected by Stripe</p>
            <p className="text-sm text-gray-600 mt-2">Your payment is secured with industry-standard encryption</p>
          </div>
        </motion.div>
      )}
      <Card className="p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Amount: ₹{amount}</p>
        </div>

        <div className="flex justify-center mb-6">
          {/* QR Code placeholder - to be replaced with actual QR code */}
          <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">QR Code</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              name="name"
              value={paymentDetails.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                name="expiry"
                value={paymentDetails.expiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                name="cvc"
                value={paymentDetails.cvc}
                onChange={handleInputChange}
                placeholder="123"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          <div className="flex items-center justify-center space-x-2">
            <span>Powered by</span>
            <svg className="h-6" viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg">
              <path d="M59.64 14.28h-8.06v-1.83h8.06v1.83zm-9.92-5.85h-5.36v1.83h5.36v-1.83zm-8.06 5.85h4.87v-1.83h-4.87v1.83zm-4.95-5.85h-6.85v1.83h6.85v-1.83zm-8.93 5.85h4.87v-1.83h-4.87v1.83zm-4.95-5.85h-6.85v1.83h6.85v-1.83zm-8.93 5.85h4.87v-1.83h-4.87v1.83zM.94 8.43H0v1.83h.94V8.43z" fill="#32325d"/>
            </svg>
          </div>
          <p className="mt-2">Secure payment processing</p>
        </div>
      </Card>
    </div>
  );
}