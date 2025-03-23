import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Star,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Share2,
  ChevronRight,
  Compass,
  TrendingUp,
  Zap
} from "lucide-react";

// Enhanced ListingCard component for recommendations
const EnhancedListingCard = ({ listing }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Card hover animations
  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  // Image hover animations
  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image container with overlay */}
      <div className="relative h-52 overflow-hidden rounded-t-xl">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/50 z-10 opacity-60 group-hover:opacity-75 transition-opacity"
        />
        <motion.img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover"
          variants={imageVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        />
        
        {/* Actions overlay */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <motion.button
            className={`p-2 rounded-full ${isSaved ? 'bg-primary text-white' : 'bg-white/90 text-gray-700'} shadow-sm hover:shadow-md transition-all`}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart size={16} className={isSaved ? "fill-white" : ""} />
          </motion.button>
        </div>
        
        {/* Price tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <motion.div 
            className="px-3 py-1 bg-white rounded-lg shadow-sm flex items-center gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-bold text-primary">₹{listing.price}</span>
            <span className="text-gray-500 text-xs">/{listing.priceUnit}</span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-medium text-lg text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>
        
        <p className="mt-1 text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {listing.description}
        </p>
        
        <div className="mt-3 flex items-center text-sm text-gray-500 gap-3">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-primary/70" />
            <span className="truncate max-w-[120px]">{listing.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-primary/70" />
            <span>{listing.distance}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img 
              src={listing.owner.avatar} 
              alt={listing.owner.name}
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
            />
            <span className="text-xs font-medium text-gray-700">{listing.owner.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="font-medium text-xs text-gray-800">{listing.rating}</span>
            <span className="text-xs text-gray-500">({listing.reviewCount})</span>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/90 to-purple-500/90"
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
};

// Enhanced skeleton loader with animation
const EnhancedSkeleton = ({ index }) => (
  <motion.div 
    className="space-y-3"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Skeleton className="h-52 w-full rounded-lg bg-gradient-to-r from-gray-200 to-gray-300" />
    <Skeleton className="h-5 w-4/5 rounded bg-gradient-to-r from-gray-200 to-gray-300" />
    <Skeleton className="h-4 w-3/5 rounded bg-gradient-to-r from-gray-200 to-gray-300" />
    <div className="flex justify-between">
      <Skeleton className="h-4 w-1/3 rounded bg-gradient-to-r from-gray-200 to-gray-300" />
      <Skeleton className="h-4 w-1/4 rounded bg-gradient-to-r from-gray-200 to-gray-300" />
    </div>
  </motion.div>
);

// Main component
const RecommendedItems = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Simulated API call - in a real app, this would fetch from your backend
  const fetchRecommendedItems = async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // This would be replaced with an actual API call in production
    return [
      {
        id: "5",
        title: "Mountain Bike - Premium Trek Model",
        description: "High-quality mountain bike perfect for weekend adventures, well-maintained with front suspension.",
        price: 600,
        priceUnit: "week",
        location: "Jayanagar, Bangalore",
        distance: "3.7 km",
        rating: 4.8,
        reviewCount: 32,
        image: "https://images.unsplash.com/photo-1552642762-f55d06580015?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Vikram S.",
          avatar: "https://i.pravatar.cc/150?img=33",
          rating: 4.9,
        },
      },
      {
        id: "6",
        title: "Drone with 4K Camera",
        description: "DJI Mavic Air 2 with 4K camera, perfect for aerial photography and video projects.",
        price: 800,
        priceUnit: "day",
        location: "MG Road, Bangalore",
        distance: "5.5 km",
        rating: 4.9,
        reviewCount: 41,
        image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Kiran R.",
          avatar: "https://i.pravatar.cc/150?img=15",
          rating: 4.7,
        },
      },
      {
        id: "7",
        title: "Projector for Home Cinema",
        description: "Full HD projector with Bluetooth speakers, perfect for movie nights and presentations.",
        price: 450,
        priceUnit: "day",
        location: "Bellandur, Bangalore",
        distance: "8.2 km",
        rating: 4.6,
        reviewCount: 28,
        image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Anjali P.",
          avatar: "https://i.pravatar.cc/150?img=19",
          rating: 4.8,
        },
      },
      {
        id: "8",
        title: "Stand Mixer - Professional Grade",
        description: "Commercial-grade stand mixer perfect for baking enthusiasts and small catering businesses.",
        price: 350,
        priceUnit: "day",
        location: "Domlur, Bangalore",
        distance: "6.1 km",
        rating: 4.7,
        reviewCount: 19,
        image: "https://images.unsplash.com/photo-1599594641587-c11cfc758d1a?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Deepak J.",
          avatar: "https://i.pravatar.cc/150?img=53",
          rating: 4.6,
        },
      },
      {
        id: "9",
        title: "Camping Gear Complete Set",
        description: "Complete camping set with tent, sleeping bags, portable stove, and more for your next outdoor adventure.",
        price: 700,
        priceUnit: "week",
        location: "Electronic City, Bangalore",
        distance: "12.4 km",
        rating: 4.8,
        reviewCount: 36,
        image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Rohan M.",
          avatar: "https://i.pravatar.cc/150?img=42",
          rating: 4.9,
        },
      },
      {
        id: "10",
        title: "Electric Guitar with Amplifier",
        description: "Fender Stratocaster with Marshall amplifier, perfect for practice, recording, or small gigs.",
        price: 550,
        priceUnit: "week",
        location: "Marathahalli, Bangalore",
        distance: "9.3 km",
        rating: 4.7,
        reviewCount: 22,
        image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Naina K.",
          avatar: "https://i.pravatar.cc/150?img=27",
          rating: 4.8,
        },
      },
    ];
  };

  const { data: recommendedItems, isLoading, error } = useQuery({
    queryKey: ['recommendedItems'],
    queryFn: fetchRecommendedItems,
  });

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/70">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-100/80 to-transparent" />
      <div className="absolute -bottom-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      
      <Container>
        <motion.div
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="relative">
                <Sparkles size={22} className="text-primary absolute -top-2 -right-2" />
                <Compass size={28} className="text-primary" />
              </div>
              <div>
                <Badge className="mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium inline-flex items-center gap-1">
                  <Zap size={12} className="text-primary" />
                  <span>Personalized</span>
                </Badge>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                  Recommended for you
                </h2>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="hidden md:flex overflow-x-auto space-x-2 scrollbar-hide">
                {["All", "Popular", "Nearby", "New", "Trending"].map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full px-4 text-sm ${
                      activeFilter === filter 
                        ? "bg-primary text-white" 
                        : "text-gray-600 border-gray-200 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
              
              <Button 
                variant="ghost"
                onClick={() => navigate('/explore')}
                className="text-primary hover:text-primary/80 hover:bg-primary/5 font-medium group flex items-center gap-1"
              >
                View all
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        {isLoading ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {[...Array(4)].map((_, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <EnhancedSkeleton index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : error ? (
          <motion.div 
            className="text-center p-8 bg-red-50 rounded-lg border border-red-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-500 flex items-center justify-center gap-2">
              <span className="bg-red-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </span>
              Oops! We couldn't load recommendations right now. Please try again later.
            </p>
          </motion.div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              <AnimatePresence>
                {recommendedItems?.map((item, index) => (
                  <CarouselItem 
                    key={item.id} 
                    className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <EnhancedListingCard listing={item} />
                    </motion.div>
                  </CarouselItem>
                ))}
              </AnimatePresence>
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 -translate-x-1/2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700" />
              <CarouselNext className="right-0 translate-x-1/2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700" />
            </div>
          </Carousel>
        )}
        
        {/* Mobile scroll indicator */}
        <motion.div 
          className="mt-6 flex justify-center md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full ${i === 0 ? 'w-6 bg-primary' : 'w-3 bg-gray-300'}`}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default RecommendedItems;