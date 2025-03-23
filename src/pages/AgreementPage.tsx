
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Check,
  Info,
  Shield,
  BadgeDollarSign,
  FileText,
  Upload,
  Camera,
  Clipboard,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

// Mock listing data
const listingData = {
  id: "1",
  title: "Professional DSLR Camera Kit",
  description: "Canon EOS 5D Mark IV with multiple lenses, perfect for photography enthusiasts or events. This kit includes the camera body, 24-70mm lens, 70-200mm lens, flash, extra batteries, memory cards, and a carrying case.",
  price: 1200,
  priceUnit: "day",
  deposit: 5000,
  location: "Indiranagar, Bangalore",
  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600&h=400",
  features: [
    "Canon EOS 5D Mark IV Body",
    "24-70mm f/2.8L Lens",
    "70-200mm f/2.8L Lens",
    "Speedlite Flash",
    "Extra Batteries",
    "64GB Memory Cards (2)",
    "Professional Carrying Case",
  ],
  owner: {
    id: "user123",
    name: "Priya S.",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 4.9,
    responseRate: 98,
    responseTime: "Within 1 hour",
    verified: true,
  },
};

const AgreementPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // In a real app, you'd fetch this from the API based on the ID
  const listing = listingData;
  
  // Calculate rental duration and costs
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const rentalDays = calculateDays();
  const subtotal = rentalDays * listing.price;
  const deliveryFee = deliveryOption === "delivery" ? 200 : 0;
  const serviceFee = Math.round(subtotal * 0.1); // 10% service fee
  const total = subtotal + serviceFee + deliveryFee;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Please select rental dates");
      return;
    }
    
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    
    setShowConfirmation(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <Container>
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-peerly-600 hover:text-peerly-900 mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to item
          </button>
          
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-peerly-900 mb-6">
            Rental Agreement
          </h1>
          
          {showConfirmation ? (
            <div className="max-w-3xl mx-auto">
              <Card className="border-green-100 bg-green-50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-green-800">Request Submitted!</h2>
                      <p className="text-green-700">Your rental request has been sent to the owner</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-green-700">
                      Your request for <span className="font-medium">{listing.title}</span> has been submitted. The owner will review your request and respond shortly.
                    </p>
                    
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <h3 className="font-medium text-peerly-900 mb-2">Rental Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-peerly-500">Rental Period</p>
                          <p className="font-medium">{startDate} to {endDate} ({rentalDays} days)</p>
                        </div>
                        <div>
                          <p className="text-sm text-peerly-500">Total Amount</p>
                          <p className="font-medium">₹{total}</p>
                        </div>
                        <div>
                          <p className="text-sm text-peerly-500">Delivery Option</p>
                          <p className="font-medium capitalize">{deliveryOption}</p>
                        </div>
                        <div>
                          <p className="text-sm text-peerly-500">Security Deposit</p>
                          <p className="font-medium">₹{listing.deposit} (refundable)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-start">
                        <Info size={20} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-blue-800 mb-1">What happens next?</h3>
                          <ol className="text-blue-700 space-y-2 list-decimal pl-4">
                            <li>The owner will review your request and accept or suggest changes</li>
                            <li>Once accepted, you'll receive payment instructions</li>
                            <li>After payment, contact details will be shared for coordination</li>
                            <li>Meet at the agreed time to collect the item</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => navigate('/bookings')}
                    className="w-full sm:w-auto"
                  >
                    View My Bookings
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full sm:w-auto"
                  >
                    Back to Home
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Agreement form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-peerly-900">Request to Rent</h2>
                    <p className="text-peerly-600">Complete this form to request this item from the owner</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Item information */}
                      <div className="flex items-center space-x-4 p-4 bg-peerly-50 rounded-lg">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={listing.image} 
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-peerly-900">{listing.title}</h3>
                          <div className="flex items-center text-sm text-peerly-600 mt-1">
                            <MapPin size={14} className="mr-1" />
                            {listing.location}
                          </div>
                          <div className="mt-1 text-primary font-semibold">
                            ₹{listing.price}/{listing.priceUnit}
                          </div>
                        </div>
                      </div>
                      
                      {/* Rental dates */}
                      <div>
                        <h3 className="font-medium text-peerly-900 mb-3 flex items-center">
                          <Calendar size={18} className="mr-2 text-primary" />
                          Rental Dates
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-peerly-700 mb-1">Start Date</label>
                            <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full px-3 py-2 border border-peerly-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              min={new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-peerly-700 mb-1">End Date</label>
                            <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="w-full px-3 py-2 border border-peerly-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              min={startDate || new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Delivery options */}
                      <div>
                        <h3 className="font-medium text-peerly-900 mb-3 flex items-center">
                          <MapPin size={18} className="mr-2 text-primary" />
                          Delivery Options
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="pickup" 
                              name="deliveryOption"
                              checked={deliveryOption === "pickup"}
                              onChange={() => setDeliveryOption("pickup")}
                              className="mr-2"
                            />
                            <label htmlFor="pickup" className="text-peerly-700">
                              <span className="font-medium">Self Pickup</span> - Collect and return the item yourself (Free)
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="radio" 
                              id="delivery" 
                              name="deliveryOption"
                              checked={deliveryOption === "delivery"}
                              onChange={() => setDeliveryOption("delivery")}
                              className="mr-2"
                            />
                            <label htmlFor="delivery" className="text-peerly-700">
                              <span className="font-medium">Home Delivery</span> - Get the item delivered to your location (₹200)
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Message to owner */}
                      <div>
                        <h3 className="font-medium text-peerly-900 mb-3 flex items-center">
                          <FileText size={18} className="mr-2 text-primary" />
                          Message to Owner
                        </h3>
                        <textarea
                          placeholder="Introduce yourself and tell the owner what you'll be using the item for..."
                          className="w-full px-3 py-2 border border-peerly-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-24"
                        ></textarea>
                      </div>
                      
                      {/* Rental agreement */}
                      <div className="border border-peerly-200 rounded-lg p-4">
                        <h3 className="font-medium text-peerly-900 mb-3 flex items-center">
                          <Clipboard size={18} className="mr-2 text-primary" />
                          Rental Agreement
                        </h3>
                        <div className="space-y-4 text-sm text-peerly-700">
                          <p>
                            By proceeding with this rental, you agree to the following terms:
                          </p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>You will take full responsibility for the item during the rental period</li>
                            <li>You agree to return the item in the same condition as received</li>
                            <li>You understand that your security deposit may be withheld for damages</li>
                            <li>You will follow any specific usage instructions provided by the owner</li>
                            <li>Cancellations more than 48 hours in advance receive a full refund; less than 48 hours may incur a fee</li>
                          </ul>
                          <div className="flex items-start mt-4">
                            <input 
                              type="checkbox" 
                              id="agreeTerms"
                              checked={agreeToTerms}
                              onChange={() => setAgreeToTerms(!agreeToTerms)}
                              className="mt-1 mr-2"
                              required
                            />
                            <label htmlFor="agreeTerms" className="text-peerly-700">
                              I agree to the rental terms, cancellation policy, and <a href="#" className="text-primary hover:underline">terms of service</a>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full py-6 text-base">
                        Submit Rental Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column - Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-peerly-900">Rental Summary</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Price calculation */}
                      <div className="space-y-2">
                        {rentalDays > 0 && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-peerly-600">₹{listing.price} x {rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
                              <span className="text-peerly-900">₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-peerly-600">Service fee</span>
                              <span className="text-peerly-900">₹{serviceFee}</span>
                            </div>
                            {deliveryOption === "delivery" && (
                              <div className="flex justify-between">
                                <span className="text-peerly-600">Delivery fee</span>
                                <span className="text-peerly-900">₹{deliveryFee}</span>
                              </div>
                            )}
                            <div className="flex justify-between pt-2 border-t border-peerly-100 font-semibold">
                              <span>Total</span>
                              <span>₹{total}</span>
                            </div>
                          </>
                        )}
                        
                        {listing.deposit && (
                          <div className="flex justify-between pt-2 border-t border-peerly-100 mt-2">
                            <div className="flex items-center">
                              <span className="text-peerly-600">Security deposit</span>
                              <div className="ml-1 relative group">
                                <Info size={14} className="text-peerly-400 cursor-help" />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-white rounded shadow-md text-xs text-peerly-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
                                  This deposit will be fully refunded when the item is returned in its original condition.
                                </div>
                              </div>
                            </div>
                            <span className="text-peerly-900">₹{listing.deposit}</span>
                          </div>
                        )}
                        
                        {rentalDays === 0 && (
                          <div className="text-peerly-500 text-sm italic">
                            Select rental dates to view pricing details
                          </div>
                        )}
                      </div>
                      
                      {/* Payment info */}
                      <div className="bg-peerly-50 p-3 rounded text-sm text-peerly-600">
                        <p className="flex items-start">
                          <BadgeDollarSign size={16} className="mr-2 text-primary mt-0.5 flex-shrink-0" />
                          Payment will be collected after the owner accepts your request
                        </p>
                      </div>
                      
                      {/* Security note */}
                      <div className="flex items-center justify-center text-sm text-center text-peerly-500 pt-3 border-t border-peerly-100">
                        <Shield size={14} className="mr-1" />
                        <span>Secure rental agreement protected by Peerly</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Owner info */}
                  <Card className="mt-4">
                    <CardHeader className="pb-3">
                      <h3 className="font-semibold text-peerly-900">About the Owner</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                          <img 
                            src={listing.owner.avatar} 
                            alt={listing.owner.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-peerly-900">{listing.owner.name}</h4>
                            {listing.owner.verified && (
                              <div className="ml-2 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Check size={12} className="mr-1" />
                                Verified
                              </div>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-peerly-500">
                            <span className="flex items-center">
                              <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                              {listing.owner.rating}
                            </span>
                            <span className="mx-2">•</span>
                            <span>Response: {listing.owner.responseRate}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgreementPage;
