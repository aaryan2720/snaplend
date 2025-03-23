
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Owner {
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
  owner: Owner;
}

interface ListingCardProps {
  listing: ListingProps;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group h-full flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md">
      <Link to={`/item/${listing.id}`} className="relative pt-[70%] bg-gray-100 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{listing.rating}</span>
            <span className="ml-1 text-gray-500">({listing.reviewCount})</span>
          </div>
          <div className="text-sm text-gray-500">{listing.distance}</div>
        </div>
        
        <Link to={`/item/${listing.id}`} className="mb-2 flex-1">
          <h3 className="font-medium line-clamp-2 hover:underline">{listing.title}</h3>
        </Link>
        
        <div className="mt-auto">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-gray-900">₹{listing.price}</span>
              <span className="text-sm text-gray-500">/{listing.priceUnit}</span>
            </div>
            <Badge variant="outline" className="text-xs font-normal">
              {listing.location}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Link to={`/item/${listing.id}`} className="flex-1">
              <Button variant="outline" className="w-full" size="sm">View Details</Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="flex-shrink-0"
              onClick={(e) => {
                e.preventDefault();
                addToCart(listing);
              }}
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
