
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
  X,
  Loader2
} from "lucide-react";
import { fetchListings } from "@/services/listingService";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "all",
    priceRange: "all",
    location: "all",
    sortBy: "relevance",
    searchQuery: searchQuery
  });
  
  const [allListings, setAllListings] = useState<ListingProps[]>([]);
  const [filteredListings, setFilteredListings] = useState<ListingProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  // Fetch all listings on component mount
  useEffect(() => {
    const loadListings = async () => {
      setIsLoading(true);
      try {
        const data = await fetchListings();
        setAllListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast({
          title: "Error",
          description: "Failed to load listings. Please try again later.",
          variant: "destructive"
        });
        setAllListings([]);
        setFilteredListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadListings();
  }, [toast]);
  
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
      // Filter by category if the listing has a category field
      results = results.filter(listing => 
        listing.category && listing.category.toLowerCase() === filters.category.toLowerCase()
      );
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
      case "newest":
        // In a real app, you'd sort by created_at date
        results = results;
        break;
      default:
        // Sort by relevance (featured items first)
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setFilteredListings(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, allListings]);
  
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
                    className={`rounded-r-none ${activeView === "grid" && "bg-peerly-50"}`}
                    onClick={() => setActiveView("grid")}
                  >
                    <List size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`rounded-l-none ${activeView === "list" && "bg-peerly-50"}`}
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
            
            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-gray-600">Loading listings...</p>
              </div>
            )}
            
            {/* No results message */}
            {!isLoading && filteredListings.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-peerly-100 rounded-full">
                  <Search size={32} className="text-peerly-400" />
                </div>
                <h2 className="text-xl font-medium text-peerly-900 mb-2">No results found</h2>
                <p className="text-peerly-600 mb-6">
                  We couldn't find any items matching your criteria. Try adjusting your filters or create your own listing.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                  <Button asChild>
                    <a href="/create-listing">Create a listing</a>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Results grid */}
            {!isLoading && filteredListings.length > 0 && (
              <div className={`grid gap-6 ${
                activeView === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
              }`}>
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

export default Explore;
