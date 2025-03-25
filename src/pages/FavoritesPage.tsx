
import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { getFavorites } from "@/services/listingService";
import ListingCard from "@/components/ListingCard";
import { Separator } from "@/components/ui/separator";
import { Loader2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user) return;
        
        setLoading(true);
        const userFavorites = await getFavorites();
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast({
          title: "Error",
          description: "Failed to load your saved items. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, toast]);

  if (loading) {
    return (
      <Container className="min-h-screen flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-snaplend-600" />
          <p className="mt-4 text-snaplend-600">Loading your saved items...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <Heart className="text-snaplend-500 mr-2" />
          <h1 className="text-2xl font-bold text-snaplend-900">Saved Items</h1>
        </div>

        <Separator className="mb-8" />

        {favorites.length === 0 ? (
          <div className="text-center py-12 bg-snaplend-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No saved items yet</h2>
            <p className="text-snaplend-600 mb-6">
              Browse our listings and save items that interest you.
            </p>
            <Button asChild>
              <Link to="/explore">Explore Listings</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <ListingCard 
                key={favorite.id} 
                id={favorite.listing.id}
                title={favorite.listing.title}
                description={favorite.listing.description}
                price={favorite.listing.price}
                priceUnit={favorite.listing.priceUnit}
                location={favorite.listing.location}
                image={favorite.listing.image}
                rating={favorite.listing.rating}
                reviewCount={favorite.listing.reviewCount}
                owner={favorite.listing.owner}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default FavoritesPage;
