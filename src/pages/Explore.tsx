
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Search,
  ChevronsLeft,
  ChevronsRight,
  Star,
  MapPin,
  BadgeDollarSign,
  Calendar,
  X
} from "lucide-react";

// Sample listings data
const allListings: ListingProps[] = [
  // ... Featured listings (first 4)
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
  // ... Recommended items (next 6)
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
];

// Available filter options
const categories = [
  { id: "all", name: "All Categories" },
  { id: "furniture", name: "Furniture" },
  { id: "electronics", name: "Electronics" },
  { id: "vehicles", name: "Vehicles" },
  { id: "tools", name: "Tools & Equipment" },
  { id: "sports", name: "Sports & Outdoors" },
  { id: "fashion", name: "Fashion & Accessories" },
];

const priceRanges = [
  { id: "all", name: "Any Price" },
  { id: "0-500", name: "₹0 - ₹500" },
  { id: "500-1000", name: "₹500 - ₹1000" },
  { id: "1000-2000", name: "₹1000 - ₹2000" },
  { id: "2000+", name: "₹2000+" },
];

const sortOptions = [
  { id: "relevance", name: "Relevance" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rating" },
  { id: "distance", name: "Distance: Nearest" },
  { id: "newest", name: "Newest First" },
];

const locations = [
  { id: "all", name: "All Locations" },
  { id: "indiranagar", name: "Indiranagar" },
  { id: "koramangala", name: "Koramangala" },
  { id: "hsr", name: "HSR Layout" },
  { id: "jayanagar", name: "Jayanagar" },
  { id: "whitefield", name: "Whitefield" },
  { id: "electronic-city", name: "Electronic City" },
];

interface FilterOptions {
  category: string;
  priceRange: string;
  location: string;
  sortBy: string;
  searchQuery: string;
}

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";
  
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "all",
    priceRange: "all",
    location: "all",
    sortBy: "relevance",
    searchQuery: searchQuery
  });
  
  const [filteredListings, setFilteredListings] = useState<ListingProps[]>(allListings);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  // Filter listings based on the current filter options
  useEffect(() => {
    let results = [...allListings];
    
    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        listing => 
          listing.title.toLowerCase().includes(query) || 
          listing.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.category !== "all") {
      // In a real app, you would have a category field to filter on
      // This is just a placeholder implementation
    }
    
    // Apply price range filter
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (max) {
        results = results.filter(listing => listing.price >= min && listing.price <= max);
      } else {
        // For "2000+" case
        results = results.filter(listing => listing.price >= min);
      }
    }
    
    // Apply location filter
    if (filters.location !== "all") {
      // In a real app, you would filter on exact location
      // This is a simplified implementation
      const locationName = locations.find(loc => loc.id === filters.location)?.name.toLowerCase();
      if (locationName) {
        results = results.filter(listing => 
          listing.location.toLowerCase().includes(locationName)
        );
      }
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "distance":
        results.sort((a, b) => {
          const distA = parseFloat(a.distance?.replace(" km", "") || "0");
          const distB = parseFloat(b.distance?.replace(" km", "") || "0");
          return distA - distB;
        });
        break;
      // In a real app, you would have more sorting options based on listing properties
      default:
        // Sort by relevance (featured items first)
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setFilteredListings(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);
  
  // Update search query when URL params change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchQuery: searchQuery
    }));
  }, [searchQuery]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredListings.slice(startIndex, endIndex);
  
  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      location: "all",
      sortBy: "relevance",
      searchQuery: ""
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Filter Bar */}
        <div className="bg-white border-b border-peerly-200 sticky top-16 md:top-20 z-30">
          <Container>
            <div className="py-3 flex items-center justify-between flex-wrap gap-3">
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
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
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
              
              <div className="flex items-center">
                {Object.entries(filters).some(([key, value]) => key !== "sortBy" && value !== "all" && value !== "") && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-peerly-500 hover:text-peerly-700 mr-2"
                    onClick={clearFilters}
                  >
                    <X size={14} className="mr-1" />
                    Clear all
                  </Button>
                )}
                
                <p className="text-sm text-peerly-500">
                  Showing <span className="font-medium text-peerly-900">{filteredListings.length}</span> results
                </p>
              </div>
            </div>
          </Container>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-peerly-50 border-b border-peerly-200 animate-slideDown">
            <Container>
              <div className="py-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="font-medium text-snaplend-900 mb-2 flex items-center">
                    <BadgeDollarSign size={16} className="mr-1 text-primary" />
                    Category
                  </h3>
                  <div className="space-y-1">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`category-${category.id}`} 
                          name="category"
                          className="mr-2"
                          checked={filters.category === category.id}
                          onChange={() => handleFilterChange("category", category.id)}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm text-snaplend-700 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-snaplend-900 mb-2 flex items-center">
                    <BadgeDollarSign size={16} className="mr-1 text-primary" />
                    Price Range
                  </h3>
                  <div className="space-y-1">
                    {priceRanges.map(range => (
                      <div key={range.id} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`price-${range.id}`} 
                          name="priceRange"
                          className="mr-2"
                          checked={filters.priceRange === range.id}
                          onChange={() => handleFilterChange("priceRange", range.id)}
                        />
                        <label 
                          htmlFor={`price-${range.id}`}
                          className="text-sm text-snaplend-700 cursor-pointer"
                        >
                          {range.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-snaplend-900 mb-2 flex items-center">
                    <MapPin size={16} className="mr-1 text-primary" />
                    Location
                  </h3>
                  <div className="space-y-1">
                    {locations.map(loc => (
                      <div key={loc.id} className="flex items-center">
                        <input 
                          type="radio" 
                          id={`location-${loc.id}`} 
                          name="location"
                          className="mr-2"
                          checked={filters.location === loc.id}
                          onChange={() => handleFilterChange("location", loc.id)}
                        />
                        <label 
                          htmlFor={`location-${loc.id}`}
                          className="text-sm text-snaplend-700 cursor-pointer"
                        >
                          {loc.name}
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
                          className="px-2 py-1 border border-snaplend-200 rounded text-sm flex-1"
                        />
                        <span className="text-peerly-500">-</span>
                        <input 
                          type="date" 
                          className="px-2 py-1 border border-snaplend-200 rounded text-sm flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
        
        {/* Search Results */}
        <section className="py-8">
          <Container>
            {/* Search query display */}
            {filters.searchQuery && (
              <div className="mb-6">
                <h1 className="text-2xl font-display font-semibold text-peerly-900 mb-2">
                  Search results for "{filters.searchQuery}"
                </h1>
                <p className="text-peerly-600">
                  Found {filteredListings.length} items matching your search
                </p>
              </div>
            )}
            
            {/* No results message */}
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-peerly-100 rounded-full">
                  <Search size={32} className="text-peerly-400" />
                </div>
                <h2 className="text-xl font-medium text-peerly-900 mb-2">No results found</h2>
                <p className="text-peerly-600 mb-6">
                  We couldn't find any items matching your criteria. Try adjusting your filters.
                </p>
                <Button 
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
            
            {/* Results grid */}
            {filteredListings.length > 0 && (
              <div className={cn(
                "grid gap-6",
                activeView === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
              )}>
                {currentItems.map(listing => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing} 
                  />
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {filteredListings.length > itemsPerPage && (
              <div className="mt-10 flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <span className="text-sm text-peerly-600 px-2">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight size={16} />
                </Button>
              </div>
            )}
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper function for className conditionals
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default Explore;
