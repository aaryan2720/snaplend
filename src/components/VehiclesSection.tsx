import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Car, MapPin, Star, Zap, Calendar, Clock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Enhanced listing card component with animations
const ListingCard = ({ listing }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative h-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 bg-white"
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image container with zoom effect */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <motion.img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Location badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium">
          <MapPin size={12} className="text-primary" />
          <span>{listing.distance}</span>
        </div>
        
        {/* Availability badge */}
        <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
          Available Now
        </Badge>
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Title and rating */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 text-snaplend-900 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-medium">{listing.rating}</span>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-snaplend-500 mb-3">
          <MapPin size={14} />
          <span className="line-clamp-1">{listing.location}</span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-snaplend-600 line-clamp-2 mb-3 h-10">
          {listing.description}
        </p>
        
        {/* Features badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
            <Zap size={12} className="mr-1" /> Quick booking
          </span>
          <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
            <Calendar size={12} className="mr-1" /> Flexible dates
          </span>
          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            <ShieldCheck size={12} className="mr-1" /> Insured
          </span>
        </div>
        
        {/* Owner info and price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img 
              src={listing.owner.avatar} 
              alt={listing.owner.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div>
              <p className="text-xs text-snaplend-600">Owner</p>
              <p className="text-sm font-medium">{listing.owner.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-snaplend-600">Price</p>
            <p className="text-lg font-bold text-primary">
              ₹{listing.price}<span className="text-xs text-snaplend-500 font-normal">/{listing.priceUnit}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Quick action buttons that appear on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-4 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Button className="w-full" size="sm">
          Rent Now
        </Button>
      </motion.div>
    </motion.div>
  );
};

// Sample vehicle listings (same as before)
const vehicleListings = [
  {
    id: "v1",
    title: "2022 Royal Enfield Classic 350",
    description: "Well-maintained Royal Enfield Classic 350 available for rent. Perfect for weekend rides and trips.",
    price: 800,
    priceUnit: "day",
    location: "Koramangala, Bangalore",
    distance: "3.1 km",
    rating: 4.8,
    reviewCount: 23,
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Rahul M.",
      avatar: "https://i.pravatar.cc/150?img=60",
      rating: 4.9,
    },
  },
  {
    id: "v2",
    title: "Luxury Sedan - Audi A4",
    description: "Premium Audi A4 available for rent for special occasions or business meetings.",
    price: 3500,
    priceUnit: "day",
    location: "Indiranagar, Bangalore",
    distance: "4.2 km",
    rating: 4.9,
    reviewCount: 17,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Akash S.",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4.7,
    },
  },
  {
    id: "v3",
    title: "Electric Scooter - Ather 450X",
    description: "Eco-friendly electric scooter, perfect for city commutes and running errands.",
    price: 500,
    priceUnit: "day",
    location: "HSR Layout, Bangalore",
    distance: "2.8 km",
    rating: 4.7,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1564396797379-e1a1f3d7fa8a?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Nisha T.",
      avatar: "https://i.pravatar.cc/150?img=25",
      rating: 4.8,
    },
  },
  {
    id: "v4",
    title: "Vintage Vespa Scooter",
    description: "Classic Italian Vespa scooter, fully restored and in perfect working condition.",
    price: 1000,
    priceUnit: "day",
    location: "Whitefield, Bangalore",
    distance: "8.6 km",
    rating: 4.8,
    reviewCount: 14,
    image: "https://images.unsplash.com/photo-1598549745541-137139901876?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Rohan P.",
      avatar: "https://i.pravatar.cc/150?img=36",
      rating: 4.9,
    },
  },
  {
    id: "v5",
    title: "Mountain Bicycle - Trek X-Caliber",
    description: "High-quality mountain bike for trails and outdoor adventures.",
    price: 600,
    priceUnit: "day",
    location: "JP Nagar, Bangalore",
    distance: "5.2 km",
    rating: 4.6,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Arun K.",
      avatar: "https://i.pravatar.cc/150?img=67",
      rating: 4.7,
    },
  },
];

const VehiclesSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        {/* Animated section header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-2"
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Car className="text-primary" size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Vehicles
              </h2>
            </motion.div>
            <motion.p 
              className="text-lg text-snaplend-600 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover a wide range of premium vehicles to rent for any occasion or travel need
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button 
              onClick={() => navigate('/browse/vehicles')}
              className="font-medium text-md gap-2 px-6 group"
              size="lg"
            >
              View all vehicles
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Carousel with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {vehicleListings.map((vehicle) => (
                <CarouselItem key={vehicle.id} className="pl-4 md:pl-6 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 py-4">
                  <ListingCard listing={vehicle} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-y-1/2 shadow-md border-none bg-white/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white transition-colors" />
              <CarouselNext className="right-0 -translate-y-1/2 shadow-md border-none bg-white/90 backdrop-blur-sm text-primary hover:bg-primary hover:text-white transition-colors" />
            </div>
          </Carousel>
        </motion.div>
        
        {/* Bottom feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Fully Insured</h3>
              <p className="text-sm text-snaplend-600">Every vehicle comes with comprehensive insurance coverage</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Quick Booking</h3>
              <p className="text-sm text-snaplend-600">Reserve your vehicle in minutes with our seamless process</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-snaplend-600">Our team is available around the clock for assistance</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default VehiclesSection;
