
import { Container } from "@/components/ui/container";
import ListingCard, { ListingProps } from "./ListingCard";

// Sample featured listings data
const featuredListings: ListingProps[] = [
  {
    id: "1",
    title: "Professional DSLR Camera Kit",
    description: "Canon EOS 5D Mark IV with multiple lenses, perfect for photography enthusiasts or events.",
    price: 1200,
    priceUnit: "day",
    location: "Indiranagar, Bangalore",
    distance: "2.5 km",
    rating: 4.9,
    reviewCount: 47,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Priya S.",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 4.9,
    },
    featured: true,
  },
  {
    id: "2",
    title: "Minimalist Wooden Desk",
    description: "Beautiful oak desk, perfect for a home office or study space.",
    price: 500,
    priceUnit: "week",
    location: "Koramangala, Bangalore",
    distance: "4 km",
    rating: 4.7,
    reviewCount: 23,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Rahul M.",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4.8,
    },
    featured: true,
  },
  {
    id: "3",
    title: "Electric Scooter",
    description: "Eco-friendly urban mobility solution, perfect for commuting around the city.",
    price: 300,
    priceUnit: "day",
    location: "HSR Layout, Bangalore",
    distance: "5.2 km",
    rating: 4.6,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Arjun K.",
      avatar: "https://i.pravatar.cc/150?img=59",
      rating: 4.7,
    },
    featured: true,
  },
  {
    id: "4",
    title: "Party & Event Sound System",
    description: "Professional sound system with speakers, mixer and microphones for events.",
    price: 1500,
    priceUnit: "day",
    location: "Whitefield, Bangalore",
    distance: "7.8 km",
    rating: 4.8,
    reviewCount: 34,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Neha T.",
      avatar: "https://i.pravatar.cc/150?img=47",
      rating: 5.0,
    },
    featured: true,
  },
];

const FeaturedListings = () => {
  return (
    <section className="section-padding bg-peerly-50/50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-peerly-900">
            Featured rentals
          </h2>
          <p className="mt-4 text-lg text-peerly-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated rental items
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing, index) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              className="animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium focus-ring shadow-sm"
          >
            View all listings
          </button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedListings;
