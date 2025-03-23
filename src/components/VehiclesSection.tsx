
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import ListingCard, { ListingProps } from "./ListingCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample vehicle listings
const vehicleListings: ListingProps[] = [
  {
    id: "v1",
    title: "2022 Royal Enfield Classic 350",
    description: "Well-maintained Royal Enfield Classic 350 available for rent. Perfect for weekend rides and trips.",
    price: 800,
    priceUnit: "day",
    location: "Koramangala, Bangalore",
    distance: "3.1 km",
    rating: 4.8,
    reviewCount: 23,
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Rahul M.",
      avatar: "https://i.pravatar.cc/150?img=60",
      rating: 4.9,
    },
  },
  {
    id: "v2",
    title: "Luxury Sedan - Audi A4",
    description: "Premium Audi A4 available for rent for special occasions or business meetings.",
    price: 3500,
    priceUnit: "day",
    location: "Indiranagar, Bangalore",
    distance: "4.2 km",
    rating: 4.9,
    reviewCount: 17,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Akash S.",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4.7,
    },
  },
  {
    id: "v3",
    title: "Electric Scooter - Ather 450X",
    description: "Eco-friendly electric scooter, perfect for city commutes and running errands.",
    price: 500,
    priceUnit: "day",
    location: "HSR Layout, Bangalore",
    distance: "2.8 km",
    rating: 4.7,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1564396797379-e1a1f3d7fa8a?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Nisha T.",
      avatar: "https://i.pravatar.cc/150?img=25",
      rating: 4.8,
    },
  },
  {
    id: "v4",
    title: "Vintage Vespa Scooter",
    description: "Classic Italian Vespa scooter, fully restored and in perfect working condition.",
    price: 1000,
    priceUnit: "day",
    location: "Whitefield, Bangalore",
    distance: "8.6 km",
    rating: 4.8,
    reviewCount: 14,
    image: "https://images.unsplash.com/photo-1598549745541-137139901876?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Rohan P.",
      avatar: "https://i.pravatar.cc/150?img=36",
      rating: 4.9,
    },
  },
  {
    id: "v5",
    title: "Mountain Bicycle - Trek X-Caliber",
    description: "High-quality mountain bike for trails and outdoor adventures.",
    price: 600,
    priceUnit: "day",
    location: "JP Nagar, Bangalore",
    distance: "5.2 km",
    rating: 4.6,
    reviewCount: 22,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Arun K.",
      avatar: "https://i.pravatar.cc/150?img=67",
      rating: 4.7,
    },
  },
];

const VehiclesSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center">
              <Car className="mr-2 text-primary" size={24} />
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-peerly-900">
                Vehicles
              </h2>
            </div>
            <p className="mt-2 text-peerly-600">Rent cars, bikes, scooters, and more for your transportation needs</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/browse/vehicles')}
            className="font-medium"
          >
            View all vehicles
          </Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {vehicleListings.map((vehicle) => (
              <CarouselItem key={vehicle.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <ListingCard listing={vehicle} />
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

export default VehiclesSection;
