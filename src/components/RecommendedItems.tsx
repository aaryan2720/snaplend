
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import ListingCard, { ListingProps } from "./ListingCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample recommended items data
const recommendedItems: ListingProps[] = [
  {
    id: "5",
    title: "Mountain Bike - Premium Trek Model",
    description: "High-quality mountain bike perfect for weekend adventures, well-maintained with front suspension.",
    price: 600,
    priceUnit: "week",
    location: "Jayanagar, Bangalore",
    distance: "3.7 km",
    rating: 4.8,
    reviewCount: 32,
    image: "https://images.unsplash.com/photo-1552642762-f55d06580015?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Vikram S.",
      avatar: "https://i.pravatar.cc/150?img=33",
      rating: 4.9,
    },
  },
  {
    id: "6",
    title: "Drone with 4K Camera",
    description: "DJI Mavic Air 2 with 4K camera, perfect for aerial photography and video projects.",
    price: 800,
    priceUnit: "day",
    location: "MG Road, Bangalore",
    distance: "5.5 km",
    rating: 4.9,
    reviewCount: 41,
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Kiran R.",
      avatar: "https://i.pravatar.cc/150?img=15",
      rating: 4.7,
    },
  },
  {
    id: "7",
    title: "Projector for Home Cinema",
    description: "Full HD projector with Bluetooth speakers, perfect for movie nights and presentations.",
    price: 450,
    priceUnit: "day",
    location: "Bellandur, Bangalore",
    distance: "8.2 km",
    rating: 4.6,
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Anjali P.",
      avatar: "https://i.pravatar.cc/150?img=19",
      rating: 4.8,
    },
  },
  {
    id: "8",
    title: "Stand Mixer - Professional Grade",
    description: "Commercial-grade stand mixer perfect for baking enthusiasts and small catering businesses.",
    price: 350,
    priceUnit: "day",
    location: "Domlur, Bangalore",
    distance: "6.1 km",
    rating: 4.7,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1599594641587-c11cfc758d1a?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Deepak J.",
      avatar: "https://i.pravatar.cc/150?img=53",
      rating: 4.6,
    },
  },
  {
    id: "9",
    title: "Camping Gear Complete Set",
    description: "Complete camping set with tent, sleeping bags, portable stove, and more for your next outdoor adventure.",
    price: 700,
    priceUnit: "weekend",
    location: "Electronic City, Bangalore",
    distance: "12.4 km",
    rating: 4.8,
    reviewCount: 36,
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Rohan M.",
      avatar: "https://i.pravatar.cc/150?img=42",
      rating: 4.9,
    },
  },
  {
    id: "10",
    title: "Electric Guitar with Amplifier",
    description: "Fender Stratocaster with Marshall amplifier, perfect for practice, recording, or small gigs.",
    price: 550,
    priceUnit: "week",
    location: "Marathahalli, Bangalore",
    distance: "9.3 km",
    rating: 4.7,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Naina K.",
      avatar: "https://i.pravatar.cc/150?img=27",
      rating: 4.8,
    },
  },
];

const RecommendedItems = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-peerly-900">
            Recommended for you
          </h2>
          <Button 
            variant="ghost"
            onClick={() => navigate('/explore')}
            className="text-primary hover:text-primary/80 font-medium"
          >
            View all
          </Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {recommendedItems.map((item) => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ListingCard listing={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>
      </Container>
    </section>
  );
};

export default RecommendedItems;
