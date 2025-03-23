
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ListingProps {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: "hour" | "day" | "week" | "month";
  location: string;
  distance?: string;
  rating?: number;
  reviewCount?: number;
  image: string;
  owner: {
    name: string;
    avatar: string;
    rating?: number;
  };
  featured?: boolean;
}

interface ListingCardProps {
  listing: ListingProps;
  className?: string;
  style?: React.CSSProperties;
}

const ListingCard = ({ listing, className, style }: ListingCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div 
      className={cn(
        "listing-card glass-card rounded-xl overflow-hidden cursor-pointer",
        listing.featured && "ring-2 ring-primary/20",
        className
      )}
      style={style}
      onClick={() => navigate(`/item/${listing.id}`)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 bg-peerly-100 animate-pulse",
            isImageLoaded && "hidden"
          )}
        />
        <img 
          src={listing.image}
          alt={listing.title}
          className={cn(
            "lazy-image w-full h-full object-cover object-center",
            !isImageLoaded && "loading"
          )}
          onLoad={handleImageLoad}
        />
        
        {/* Favorite button */}
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm z-10 transition-all"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={20} 
            className={cn(
              "transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-peerly-400 hover:text-peerly-900"
            )} 
          />
        </button>
        
        {/* Featured badge */}
        {listing.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
            Featured
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-medium text-peerly-900 line-clamp-1">
            {listing.title}
          </h3>
          {listing.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-peerly-700">{listing.rating}</span>
            </div>
          )}
        </div>
        
        <div className="mt-1 text-peerly-500 text-sm">
          {listing.location} {listing.distance && `· ${listing.distance} away`}
        </div>
        
        <div className="mt-3 text-sm text-peerly-600 line-clamp-2">
          {listing.description}
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-peerly-900">
              ₹{listing.price}
            </span>
            <span className="text-peerly-500 text-sm ml-1">
              /{listing.priceUnit}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <img 
              src={listing.owner.avatar} 
              alt={listing.owner.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-peerly-600">
              {listing.owner.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
