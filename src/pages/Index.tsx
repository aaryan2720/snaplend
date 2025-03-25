
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CategoryList } from "@/components/CategoryList";
import FeaturedListings from "@/components/FeaturedListings";
import RecommendedItems from "@/components/RecommendedItems";
import FurnitureSection from "@/components/FurnitureSection";
import VehiclesSection from "@/components/VehiclesSection";
import GadgetsSection from "@/components/GadgetsSection";
import { initializeSupabase } from "@/utils/supabaseInit";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "@/services/listingService";

export default function Index() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const success = await initializeSupabase();
        if (success) {
          console.log("Supabase initialized successfully");
          setInitialized(true);
        } else {
          console.error("Failed to initialize Supabase");
          toast({
            title: "Warning",
            description: "Some services may not be available.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error initializing Supabase:", error);
      }
    };

    init();
  }, []);

  // Prefetch listings data
  const { isLoading: loadingListings } = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
    enabled: initialized,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <CategoryList />
        <FeaturedListings />
        <RecommendedItems />
        <FurnitureSection />
        <VehiclesSection />
        <GadgetsSection />
      </main>
      
      <Footer />
    </div>
  );
}
