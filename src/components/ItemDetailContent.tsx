
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListingProps } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ItemDetailContentProps {
  listing: ListingProps;
}

const ItemDetailContent: React.FC<ItemDetailContentProps> = ({ listing }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    addToCart(listing);
    toast({
      title: "Added to cart",
      description: `${listing.title} has been added to your cart.`
    });
  };
  
  const handleRentNow = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to rent this item"
      });
      navigate("/login", { state: { returnTo: `/item/${listing.id}` } });
      return;
    }
    
    addToCart(listing);
    navigate("/checkout");
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div>
        <div className="rounded-2xl overflow-hidden bg-gray-100 mb-4 aspect-square">
          <img 
            src={listing.image} 
            alt={listing.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* Placeholder for additional images */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden bg-gray-100 aspect-square">
              <img 
                src={listing.image} 
                alt={`${listing.title} - view ${i+1}`} 
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Item Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-amber-500 flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
          </span>
          <span className="text-gray-600">{listing.rating} ({listing.reviewCount} reviews)</span>
        </div>
        
        <div className="mb-6">
          <span className="text-3xl font-bold">₹{listing.price}</span>
          <span className="text-gray-600">/{listing.priceUnit}</span>
        </div>
        
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{listing.description}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Owner</h2>
          <div className="flex items-center gap-3">
            <img 
              src={listing.owner.avatar} 
              alt={listing.owner.name} 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{listing.owner.name}</p>
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-600 text-sm">{listing.owner.rating}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Location</h2>
          <p className="text-gray-600">{listing.location}</p>
          
          {/* Map placeholder - could be replaced with an actual map */}
          <div className="mt-2 rounded-lg overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
            <span className="text-gray-500">Map view will be shown here</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            onClick={handleRentNow}
            className="flex-1 py-6"
            size="lg"
          >
            Rent Now
          </Button>
          <Button 
            onClick={handleAddToCart}
            variant="outline" 
            className="flex-1 py-6"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContent;
