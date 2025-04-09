
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Heart, MapPin, Calendar, User, ExternalLink, Plus, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Tooltip } from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";

export interface Owner {
  id?: string; // Added id property
  name: string;
  avatar: string;
  rating: number;
}

export interface ListingProps {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: "hour" | "day" | "week" | "month";
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  image: string;
  image_urls?: string[];
  additionalImages?: string[];
  owner: Owner;
  featured?: boolean;
  category?: string;
}

interface ListingCardProps {
  listing: ListingProps;
  className?: string;
  style?: React.CSSProperties;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, className, style }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const unitDisplay = {
    hour: "hr",
    day: "day",
    week: "wk",
    month: "mo"
  };
  
  const originalPrice = Math.round(listing.price * 1.2);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(listing);
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 ${className || ""}`}
      style={style}
    >
      <Link to={`/item/${listing.id}`} className="relative pt-[75%] bg-gray-100 overflow-hidden">
        <motion.img
          src={listing.image}
          alt={listing.title}
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 py-1 shadow-md">
            {listing.priceUnit === "day" ? "Daily Rental" : 
             listing.priceUnit === "hour" ? "Hourly Rental" : 
             listing.priceUnit === "week" ? "Weekly Rental" : "Monthly Rental"}
          </Badge>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
          >
            <Heart 
              size={18} 
              className={`${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} transition-colors`} 
            />
          </motion.button>
        </div>
        
        {listing.featured && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold shadow-md">
            Featured
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center">
          <Avatar className="h-6 w-6 border border-white mr-2">
            <img src={listing.owner.avatar} alt={listing.owner.name} />
          </Avatar>
          <span className="text-xs font-medium">{listing.owner.name}</span>
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-amber-50 px-2 py-1 rounded-full flex items-center">
              <Star className="mr-1 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-sm">{listing.rating}</span>
              <span className="ml-1 text-xs text-gray-500">({listing.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <MapPin size={12} className="mr-1" />
            <span>{listing.distance}</span>
          </div>
        </div>
        
        <Link to={`/item/${listing.id}`} className="group-hover:text-indigo-600 transition-colors">
          <h3 className="font-semibold line-clamp-2 text-gray-800">{listing.title}</h3>
        </Link>
        
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{listing.description || "Experience the best rental in your area. Quality guaranteed with flexible timing options."}</p>
        
        <div className="mt-3 flex items-center text-xs text-gray-600">
          <MapPin size={14} className="mr-1 text-gray-400" />
          <span>{listing.location}</span>
        </div>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-gray-900">₹{listing.price}</span>
              <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-500">per {unitDisplay[listing.priceUnit]}</span>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 text-xs border-green-200">
                {Math.round((originalPrice - listing.price) / originalPrice * 100)}% OFF
              </Badge>
            </div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 p-2 rounded-full transition-colors"
          >
            <ShoppingCart size={18} />
          </motion.button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link to={`/item/${listing.id}`}>
            <Button 
              variant="default" 
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-sm"
            >
              <span>View Details</span>
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;
