
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Calendar, Check, MapPin, Info, Heart, Flag, ArrowLeft, MessageCircle, Share, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample item data - in a real app, this would come from an API
const itemData = {
  id: "1",
  title: "Professional DSLR Camera Kit",
  description: "Canon EOS 5D Mark IV with multiple lenses, perfect for photography enthusiasts or events. This kit includes the camera body, 24-70mm lens, 70-200mm lens, flash, extra batteries, memory cards, and a carrying case. Everything you need for professional photography.",
  price: 1200,
  priceUnit: "day",
  deposit: 5000,
  location: "Indiranagar, Bangalore",
  distance: "2.5 km",
  rating: 4.9,
  reviewCount: 47,
  images: [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&q=80&w=1200",
  ],
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
    memberSince: "June 2022",
    verified: true,
  },
  availability: {
    available: true,
    nextAvailable: "Tomorrow",
    booked: ["2023-08-15", "2023-08-16", "2023-08-22", "2023-08-23"],
  },
  reviews: [
    {
      id: "rev1",
      user: {
        name: "Amit R.",
        avatar: "https://i.pravatar.cc/150?img=68",
      },
      rating: 5,
      date: "July 15, 2023",
      comment: "Amazing camera kit! Everything was in perfect condition, and Priya was super helpful with setup tips for my event.",
    },
    {
      id: "rev2",
      user: {
        name: "Divya K.",
        avatar: "https://i.pravatar.cc/150?img=47",
      },
      rating: 5,
      date: "June 28, 2023",
      comment: "Great experience renting this kit. All the equipment was professional grade and well maintained. Would rent again!",
    },
    {
      id: "rev3",
      user: {
        name: "Rajan M.",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      rating: 4,
      date: "May 10, 2023",
      comment: "The camera and lenses were fantastic. Only giving 4 stars because one of the batteries wasn't fully charged, but otherwise perfect.",
    },
  ],
  relatedItems: [
    {
      id: "related1",
      title: "Sony Mirrorless Camera",
      price: 900,
      priceUnit: "day",
      image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "related2",
      title: "Drone with 4K Camera",
      price: 800,
      priceUnit: "day",
      image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "related3",
      title: "GoPro HERO10 Black",
      price: 350,
      priceUnit: "day",
      image: "https://images.unsplash.com/photo-1593080358201-8c1b590fde76?auto=format&fit=crop&q=80&w=400",
    },
  ],
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const item = itemData; // In reality, you'd fetch the item based on the id
  
  // Calculate rental duration and total cost
  const rentalDays = startDate && endDate 
    ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;
  const subtotal = rentalDays * item.price;
  const serviceFee = Math.round(subtotal * 0.1); // 10% service fee
  const total = subtotal + serviceFee;
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
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
            Back to results
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Item details */}
            <div className="lg:col-span-2">
              {/* Image gallery */}
              <div className="rounded-xl overflow-hidden mb-8">
                <div className="aspect-[4/3] relative">
                  <img 
                    src={item.images[selectedImageIndex]} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {item.images.map((image, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "cursor-pointer aspect-[4/3] overflow-hidden rounded-md",
                        selectedImageIndex === index && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Item title and quick info */}
              <div className="mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-display font-semibold text-peerly-900">{item.title}</h1>
                    <div className="flex items-center mt-2 text-peerly-600">
                      <MapPin size={16} className="mr-1" />
                      <span>{item.location}</span>
                      {item.distance && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{item.distance} away</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      className="p-2 rounded-full hover:bg-peerly-100 transition-colors"
                      onClick={handleFavoriteClick}
                      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart 
                        size={20} 
                        className={cn(
                          "transition-colors",
                          isFavorite ? "fill-red-500 text-red-500" : "text-peerly-600"
                        )} 
                      />
                    </button>
                    
                    <button 
                      className="p-2 rounded-full hover:bg-peerly-100 transition-colors"
                      aria-label="Share listing"
                    >
                      <Share size={20} className="text-peerly-600" />
                    </button>
                    
                    <button 
                      className="p-2 rounded-full hover:bg-peerly-100 transition-colors"
                      aria-label="Report listing"
                    >
                      <Flag size={20} className="text-peerly-600" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center mt-3">
                  <div className="flex items-center">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">{item.rating}</span>
                    <span className="ml-1 text-peerly-500">({item.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              {/* Item description */}
              <div className="mb-8 glass-card p-6 rounded-xl">
                <h2 className="text-xl font-medium text-peerly-900 mb-4">Description</h2>
                <p className="text-peerly-600 whitespace-pre-line">{item.description}</p>
                
                {item.features && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-peerly-900 mb-3">What's included:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-peerly-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Owner information */}
              <div className="mb-8 glass-card p-6 rounded-xl">
                <h2 className="text-xl font-medium text-peerly-900 mb-4">About the owner</h2>
                <div className="flex items-start">
                  <img 
                    src={item.owner.avatar} 
                    alt={item.owner.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-peerly-900">{item.owner.name}</h3>
                      {item.owner.verified && (
                        <div className="ml-2 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Check size={12} className="mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-peerly-500 text-sm">Member since {item.owner.memberSince}</div>
                    <div className="mt-3 flex items-center">
                      <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{item.owner.rating}</span>
                      <span className="mx-2">•</span>
                      <span className="text-peerly-600">Response rate: {item.owner.responseRate}%</span>
                      <span className="mx-2">•</span>
                      <span className="text-peerly-600">Responds {item.owner.responseTime}</span>
                    </div>
                    <button className="mt-4 flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                      <MessageCircle size={16} className="mr-1" />
                      Contact {item.owner.name}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Reviews */}
              <div className="mb-8">
                <h2 className="text-xl font-medium text-peerly-900 mb-4">Reviews</h2>
                <div className="space-y-6">
                  {item.reviews.map((review) => (
                    <div key={review.id} className="glass-card p-5 rounded-xl">
                      <div className="flex items-start">
                        <img 
                          src={review.user.avatar} 
                          alt={review.user.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-peerly-900">{review.user.name}</h3>
                            <span className="mx-2 text-peerly-400">•</span>
                            <span className="text-peerly-500 text-sm">{review.date}</span>
                          </div>
                          <div className="flex mt-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={cn(
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-peerly-300"
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-peerly-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 text-primary font-medium hover:text-primary/80 transition-colors">
                  View all {item.reviewCount} reviews
                </button>
              </div>
              
              {/* Related items */}
              <div>
                <h2 className="text-xl font-medium text-peerly-900 mb-4">You might also like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {item.relatedItems.map((relatedItem) => (
                    <div 
                      key={relatedItem.id}
                      className="glass-card rounded-xl overflow-hidden cursor-pointer hover-scale"
                      onClick={() => navigate(`/item/${relatedItem.id}`)}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={relatedItem.image} 
                          alt={relatedItem.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-peerly-900 line-clamp-1">{relatedItem.title}</h3>
                        <div className="mt-1">
                          <span className="font-semibold">₹{relatedItem.price}</span>
                          <span className="text-peerly-500 text-sm ml-1">/{relatedItem.priceUnit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - Booking form */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 rounded-xl sticky top-28">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-2xl font-semibold text-peerly-900">₹{item.price}</span>
                    <span className="text-peerly-500 text-base ml-1">/{item.priceUnit}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{item.rating}</span>
                    <span className="mx-1 text-peerly-400">•</span>
                    <span className="text-peerly-500">{item.reviewCount} reviews</span>
                  </div>
                </div>
                
                {/* Date selection */}
                <div className="mb-6">
                  <div className="flex border border-peerly-200 rounded-lg overflow-hidden">
                    <div className="flex-1 p-3 border-r border-peerly-200">
                      <label className="block text-sm font-medium text-peerly-500 mb-1">From</label>
                      <button className="w-full text-left flex items-center text-peerly-900">
                        <Calendar size={16} className="mr-2 text-peerly-400" />
                        {startDate ? startDate.toLocaleDateString() : "Select date"}
                      </button>
                    </div>
                    <div className="flex-1 p-3">
                      <label className="block text-sm font-medium text-peerly-500 mb-1">To</label>
                      <button className="w-full text-left flex items-center text-peerly-900">
                        <Calendar size={16} className="mr-2 text-peerly-400" />
                        {endDate ? endDate.toLocaleDateString() : "Select date"}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Price breakdown */}
                {rentalDays > 0 && (
                  <div className="mb-6 border-t border-b border-peerly-100 py-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-peerly-600">₹{item.price} x {rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
                        <span className="text-peerly-900">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-peerly-600">Service fee</span>
                        <span className="text-peerly-900">₹{serviceFee}</span>
                      </div>
                      {item.deposit && (
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <span className="text-peerly-600">Security deposit</span>
                            <div className="ml-1 relative group">
                              <Info size={14} className="text-peerly-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-white rounded shadow-md text-xs text-peerly-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
                                This deposit will be fully refunded when the item is returned in its original condition.
                              </div>
                            </div>
                          </div>
                          <span className="text-peerly-900">₹{item.deposit}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-peerly-100 font-semibold">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Book button */}
                <Button className="w-full mb-4 py-6 text-base">
                  {item.availability.available ? "Request to Book" : "Check Availability"}
                </Button>
                
                {/* Security note */}
                <div className="flex items-center justify-center text-sm text-center text-peerly-500">
                  <Shield size={14} className="mr-1" />
                  <span>Your payment is protected by our secure payment system</span>
                </div>
                
                {/* Availability info */}
                {!item.availability.available && (
                  <div className="mt-4 bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm">
                    This item is currently unavailable. Next available: {item.availability.nextAvailable}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default ItemDetail;
