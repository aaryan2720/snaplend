
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchListingById } from "@/services/listingService";
import { ListingProps } from "@/components/ListingCard";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemDetailContent from "@/components/ItemDetailContent";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<ListingProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      if (id) {
        try {
          const data = await fetchListingById(id);
          if (data) {
            setListing(data);
            console.log("Fetched listing:", data);
          } else {
            toast({
              title: "Item not found",
              description: "The requested item doesn't exist or has been removed.",
              variant: "destructive"
            });
          }
        } catch (error) {
          console.error("Error fetching item:", error);
          toast({
            title: "Error",
            description: "Failed to load item details. Please try again.",
            variant: "destructive"
          });
        }
      }
      setLoading(false);
    };
    
    fetchItem();
  }, [id, toast]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <Container className="py-12 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-gray-600">Loading item details...</p>
          </div>
          <Button variant="outline" className="fixed top-20 right-6" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </Container>
        <Footer />
      </>
    );
  }
  
  if (!listing) {
    return (
      <>
        <Navbar />
        <Container className="py-12 min-h-screen">
          <div className="max-w-lg mx-auto text-center py-16 bg-gray-50 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
            <p className="text-gray-600 mb-8">The item you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <Container className="py-12 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Button variant="outline" className="mb-6" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <ItemDetailContent listing={listing} />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ItemDetail;
