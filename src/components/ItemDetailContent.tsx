import React from "react";
import { ListingProps } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import ImageGallery from "./ImageGallery";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ItemDetailContentProps {
  listing: ListingProps;
}

const ItemDetailContent: React.FC<ItemDetailContentProps> = ({ listing }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(listing);
    toast({
      title: "Added to cart",
      description: "Item added to your cart successfully.",
    });
  };

  const { user } = useAuth();
  const isOwner = listing.owner_id === user?.id;

  return (
    <div>
      <div className="mb-8">
        <ImageGallery images={listing.additionalImages} mainImage={listing.image} />
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-500 mr-1" size={20} />
            <span className="text-gray-700 font-medium">{listing.rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-2">({listing.reviewCount} reviews)</span>
          </div>
          <div className="mb-4">
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {listing.category}
            </span>
          </div>
          <p className="text-gray-700 mb-6">{listing.description}</p>
        </div>

        <div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rental Details</h2>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">Price per day:</span>
              <span className="font-medium text-gray-900">₹{listing.price}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">Location:</span>
              <span className="font-medium text-gray-900">{listing.location}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">Owner:</span>
              <div className="flex items-center">
                <img src={listing.owner.avatar} alt={listing.owner.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="font-medium text-gray-900">{listing.owner.name}</span>
              </div>
            </div>
            {isOwner ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-amber-800 font-medium">This is your listing</p>
                <p className="text-amber-700 text-sm mt-1">You cannot rent your own items.</p>
              </div>
            ) : (
              <Button onClick={handleAddToCart} className="w-full md:w-auto">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContent;
