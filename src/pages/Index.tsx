
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryList from "@/components/CategoryList";
import FeaturedListings from "@/components/FeaturedListings";
import RecommendedItems from "@/components/RecommendedItems";
import FurnitureSection from "@/components/FurnitureSection";
import VehiclesSection from "@/components/VehiclesSection";
import GadgetsSection from "@/components/GadgetsSection";

export default function Index() {
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
