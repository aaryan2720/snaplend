
import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { getUserListings } from "@/services/listingService";
import ListingCard from "@/components/ListingCard";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const UserListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (!user) return;
        
        setLoading(true);
        const userListings = await getUserListings(user.id);
        setListings(userListings);
      } catch (error) {
        console.error("Error fetching user listings:", error);
        toast({
          title: "Error",
          description: "Failed to load your listings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [user, toast]);

  if (loading) {
    return (
      <Container className="min-h-screen flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-snaplend-600" />
          <p className="mt-4 text-snaplend-600">Loading your listings...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-snaplend-900">My Listings</h1>
          <Button asChild>
            <Link to="/create-listing">Create New Listing</Link>
          </Button>
        </div>

        <Separator className="mb-8" />

        {listings.length === 0 ? (
          <div className="text-center py-12 bg-snaplend-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No listings yet</h2>
            <p className="text-snaplend-600 mb-6">
              Start earning by sharing your items with others.
            </p>
            <Button asChild>
              <Link to="/create-listing">Create Your First Listing</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <ListingCard 
                key={listing.id}
                listing={{
                  id: listing.id,
                  title: listing.title,
                  description: listing.description,
                  price: listing.price,
                  priceUnit: listing.priceUnit || "day",
                  location: listing.location,
                  distance: "Near you",
                  image: listing.image_urls?.[0] || "/placeholder.svg",
                  rating: 4.5,
                  reviewCount: 0,
                  owner: {
                    name: "You",
                    avatar: "/placeholder.svg",
                    rating: 5
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default UserListings;
