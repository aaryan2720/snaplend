
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import ListingCard, { ListingProps } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  ArrowUpDown, 
  Map, 
  List,
  BadgeDollarSign,
  MapPin,
  Calendar,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock category data
const categoryData = {
  furniture: {
    name: "Furniture",
    description: "Rent furniture for your home, office, or event",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
    subcategories: ["Sofas & Couches", "Tables & Desks", "Chairs & Seating", "Beds & Mattresses", "Storage", "Office Furniture"],
    items: [
      {
        id: "f1",
        title: "Modern Leather Sofa",
        description: "Contemporary 3-seater leather sofa in black, perfect for living rooms or office waiting areas.",
        price: 1000,
        priceUnit: "week",
        location: "Indiranagar, Bangalore",
        distance: "2.3 km",
        rating: 4.8,
        reviewCount: 24,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Rohan K.",
          avatar: "https://i.pravatar.cc/150?img=11",
          rating: 4.9,
        },
      },
      {
        id: "f2",
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
      },
      {
        id: "f3",
        title: "Ergonomic Office Chair",
        description: "Professional-grade ergonomic chair, perfect for remote work or home office setup.",
        price: 300,
        priceUnit: "week",
        location: "HSR Layout, Bangalore",
        distance: "5.5 km",
        rating: 4.6,
        reviewCount: 18,
        image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Aarti P.",
          avatar: "https://i.pravatar.cc/150?img=37",
          rating: 4.5,
        },
      },
      {
        id: "f4",
        title: "King Size Bed with Mattress",
        description: "Luxurious king-size bed with premium mattress, ideal for guests or temporary accommodations.",
        price: 800,
        priceUnit: "week",
        location: "Whitefield, Bangalore",
        distance: "7.8 km",
        rating: 4.9,
        reviewCount: 31,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Priya D.",
          avatar: "https://i.pravatar.cc/150?img=23",
          rating: 4.8,
        },
      },
      {
        id: "f5",
        title: "Dining Table Set for 6",
        description: "Elegant dining table with 6 chairs, perfect for dinner parties or family gatherings.",
        price: 700,
        priceUnit: "week",
        location: "Jayanagar, Bangalore",
        distance: "4.2 km",
        rating: 4.7,
        reviewCount: 14,
        image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Ajay S.",
          avatar: "https://i.pravatar.cc/150?img=54",
          rating: 4.6,
        },
      },
      {
        id: "f6",
        title: "Bookshelf / Display Unit",
        description: "Modern bookshelf with multiple compartments, great for displaying books, decorations or organizing items.",
        price: 400,
        priceUnit: "week",
        location: "JP Nagar, Bangalore",
        distance: "5.8 km",
        rating: 4.5,
        reviewCount: 11,
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Neha G.",
          avatar: "https://i.pravatar.cc/150?img=29",
          rating: 4.7,
        },
      },
    ]
  },
  vehicles: {
    name: "Vehicles",
    description: "Cars, bikes, and scooters for all your transportation needs",
    image: "https://images.unsplash.com/photo-1552642762-f55d06580015?auto=format&fit=crop&q=80&w=1200",
    subcategories: ["Cars", "Bikes", "Scooters", "Luxury Cars", "Vans & Trucks"],
    items: [
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
    ]
  },
  electronics: {
    name: "Electronics",
    description: "Cameras, drones, and other tech gadgets for any project",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=1200",
    subcategories: ["Cameras", "Drones", "Laptops", "Audio Equipment", "Gaming Consoles", "Projectors & TVs"],
    items: [
      {
        id: "e1",
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
      },
      {
        id: "e2",
        title: "DJI Mavic Air 2 Drone",
        description: "High-quality drone with 4K camera, perfect for aerial photography and videography.",
        price: 950,
        priceUnit: "day",
        location: "HSR Layout, Bangalore",
        distance: "5.2 km",
        rating: 4.8,
        reviewCount: 34,
        image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Varun K.",
          avatar: "https://i.pravatar.cc/150?img=53",
          rating: 4.7,
        },
      },
      {
        id: "e3",
        title: "MacBook Pro 16-inch",
        description: "Latest model MacBook Pro with M1 Pro chip, perfect for remote work or video editing.",
        price: 800,
        priceUnit: "day",
        location: "Koramangala, Bangalore",
        distance: "3.7 km",
        rating: 4.9,
        reviewCount: 29,
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Rishi M.",
          avatar: "https://i.pravatar.cc/150?img=42",
          rating: 4.8,
        },
      },
      {
        id: "e4",
        title: "Professional DJ Equipment",
        description: "Complete DJ setup including mixer, controllers, speakers, and lighting for parties and events.",
        price: 2000,
        priceUnit: "day",
        location: "MG Road, Bangalore",
        distance: "6.1 km",
        rating: 4.7,
        reviewCount: 19,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600&h=400",
        owner: {
          name: "Karan D.",
          avatar: "https://i.pravatar.cc/150?img=27",
          rating: 4.9,
        },
      },
    ]
  },
  tools: {
    name: "Tools & Equipment",
    description: "Power tools and equipment for any project or home improvement task",
    image: "https://images.unsplash.com/photo-1581147036324-c47a03b8f120?auto=format&fit=crop&q=80&w=1200",
    subcategories: ["Power Tools", "Hand Tools", "Gardening Equipment", "Construction Equipment", "Cleaning Equipment"],
    items: []
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  // Get the category data based on the URL parameter
  const currentCategory = category && categoryData[category as keyof typeof categoryData];
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <Container>
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium text-peerly-900 mb-4">Category not found</h2>
              <p className="text-peerly-600 mb-6">
                The category you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/explore')}>
                Explore all categories
              </Button>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Category Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={currentCategory.image} 
            alt={currentCategory.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <Container className="absolute inset-0 flex flex-col justify-end pb-8">
            <button
              onClick={() => navigate(-1)}
              className="mb-auto mt-4 text-white flex items-center hover:underline"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back
            </button>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-white mb-2">
              {currentCategory.name}
            </h1>
            <p className="text-white/90 max-w-2xl">
              {currentCategory.description}
            </p>
          </Container>
        </div>
        
        {/* Subcategory Navigation */}
        <div className="bg-white border-b border-peerly-200 sticky top-16 md:top-20 z-30">
          <Container>
            <div className="py-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center overflow-x-auto py-2 hide-scrollbar">
                {currentCategory.subcategories.map((subcat) => (
                  <button
                    key={subcat}
                    className="px-4 py-1.5 text-sm rounded-full border border-peerly-200 text-peerly-700 mr-2 whitespace-nowrap hover:bg-peerly-50 hover:text-peerly-900 transition-colors"
                  >
                    {subcat}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                >
                  <ArrowUpDown size={16} className="mr-2" />
                  <select 
                    className="bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </Button>
                
                <div className="hidden md:flex items-center border border-peerly-200 rounded-md">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "rounded-r-none",
                      activeView === "grid" && "bg-peerly-50"
                    )}
                    onClick={() => setActiveView("grid")}
                  >
                    <List size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "rounded-l-none",
                      activeView === "list" && "bg-peerly-50"
                    )}
                    onClick={() => setActiveView("list")}
                  >
                    <Map size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-peerly-50 border-b border-peerly-200 animate-slideDown">
            <Container>
              <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-medium text-peerly-900 mb-2 flex items-center">
                    <BadgeDollarSign size={16} className="mr-1 text-primary" />
                    Price Range
                  </h3>
                  <div className="space-y-1">
                    {["Any Price", "₹0 - ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "₹2000+"].map((range) => (
                      <div key={range} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`price-${range}`} 
                          name="priceRange"
                          className="mr-2"
                        />
                        <label 
                          htmlFor={`price-${range}`}
                          className="text-sm text-peerly-700 cursor-pointer"
                        >
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-peerly-900 mb-2 flex items-center">
                    <MapPin size={16} className="mr-1 text-primary" />
                    Location
                  </h3>
                  <div className="space-y-1">
                    {["All Locations", "Indiranagar", "Koramangala", "HSR Layout", "Whitefield"].map((loc) => (
                      <div key={loc} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`location-${loc}`} 
                          name="location"
                          className="mr-2"
                        />
                        <label 
                          htmlFor={`location-${loc}`}
                          className="text-sm text-peerly-700 cursor-pointer"
                        >
                          {loc}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-peerly-900 mb-2 flex items-center">
                    <Calendar size={16} className="mr-1 text-primary" />
                    Availability
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="available-now" 
                        className="mr-2"
                      />
                      <label 
                        htmlFor="available-now"
                        className="text-sm text-peerly-700 cursor-pointer"
                      >
                        Available Now
                      </label>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-peerly-700">Date Range</p>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="date" 
                          className="px-2 py-1 border border-peerly-200 rounded text-sm flex-1"
                        />
                        <span className="text-peerly-500">-</span>
                        <input 
                          type="date" 
                          className="px-2 py-1 border border-peerly-200 rounded text-sm flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
        
        {/* Category Items */}
        <section className="py-8">
          <Container>
            {currentCategory.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-peerly-100 rounded-full">
                  <MapPin size={32} className="text-peerly-400" />
                </div>
                <h2 className="text-xl font-medium text-peerly-900 mb-2">No items found</h2>
                <p className="text-peerly-600 mb-6">
                  There are currently no listings in this category.
                </p>
                <Button onClick={() => navigate('/explore')}>
                  Explore other categories
                </Button>
              </div>
            ) : (
              <div className={cn(
                "grid gap-6",
                activeView === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
              )}>
                {currentCategory.items.map(item => (
                  <ListingCard 
                    key={item.id} 
                    listing={item} 
                  />
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
