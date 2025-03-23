import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import ListingCard, { ListingProps } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  ArrowUpDown, 
  Map, 
  Grid,
  BadgeDollarSign,
  MapPin,
  Calendar,
  ChevronLeft,
  Search,
  Star,
  TrendingUp,
  Clock,
  Heart,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Mock category data (unchanged from original)
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
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [activeSort, setActiveSort] = useState("relevance");
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the category data based on the URL parameter
  const currentCategory = category && categoryData[category as keyof typeof categoryData];
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Handle scroll for animation effects
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [category]);
  
  // Handle subcategory selection
  const handleSubcategorySelect = (subcat: string) => {
    if (selectedSubcategory === subcat) {
      setSelectedSubcategory(null);
    } else {
      setSelectedSubcategory(subcat);
    }
  };
  
  // Sort options with icons
  const sortOptions = [
    { value: "relevance", label: "Relevance", icon: <Search size={14} /> },
    { value: "price-low", label: "Price: Low to High", icon: <BadgeDollarSign size={14} /> },
    { value: "price-high", label: "Price: High to Low", icon: <BadgeDollarSign size={14} /> },
    { value: "rating", label: "Highest Rating", icon: <Star size={14} /> },
    { value: "trending", label: "Trending", icon: <TrendingUp size={14} /> },
    { value: "newest", label: "Newest", icon: <Clock size={14} /> },
  ];
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-peerly-50">
        <Navbar />
        <main className="flex-1 pt-24">
          <Container>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-peerly-100 rounded-full flex items-center justify-center">
                <MapPin size={40} className="text-peerly-400" />
              </div>
              <h2 className="text-3xl font-display font-semibold text-peerly-900 mb-4">Category not found</h2>
              <p className="text-peerly-600 mb-8 max-w-lg mx-auto">
                The category you're looking for doesn't exist or has been removed.
                Let's find something awesome for you elsewhere!
              </p>
              <Button 
                onClick={() => navigate('/explore')}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-all duration-300"
              >
                <Sparkles size={18} className="mr-2" />
                Explore all categories
              </Button>
            </motion.div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Category Hero with Parallax Effect */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img 
              src={currentCategory.image} 
              alt={currentCategory.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          </motion.div>
          
          <Container className="absolute inset-0 flex flex-col justify-end pb-10">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => navigate(-1)}
              className="mb-auto mt-6 text-white flex items-center hover:scale-105 transition-transform"
            >
              <ChevronLeft size={20} className="mr-1" />
              <span className="border-b border-white/30">Back</span>
            </motion.button>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-3"
            >
              <span className="inline-block">
                {currentCategory.name}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/90 max-w-2xl text-lg"
            >
              {currentCategory.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 flex items-center space-x-4"
            >
              <Button className="bg-white text-peerly-900 hover:bg-white/90 transition-colors">
                <Search size={18} className="mr-2 text-primary" />
                Search {currentCategory.name}
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Heart size={18} className="mr-2" />
                Save Search
              </Button>
            </motion.div>
          </Container>
        </div>
        
        {/* Subcategory Navigation - Sticky with Animation */}
        <motion.div 
          className={cn(
            "bg-white border-b border-peerly-200 sticky top-16 md:top-20 z-30 transition-all duration-300",
            scrolled ? "shadow-lg" : ""
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Container>
            <div className="py-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center overflow-x-auto py-2 hide-scrollbar">
                {currentCategory.subcategories.map((subcat) => (
                  <motion.button
                    key={subcat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubcategorySelect(subcat)}
                    className={cn(
                      "px-4 py-2 text-sm rounded-full mr-2 whitespace-nowrap transition-all duration-300 font-medium",
                      selectedSubcategory === subcat 
                        ? "bg-primary text-white shadow-md" 
                        : "border border-peerly-200 text-peerly-700 hover:bg-peerly-50 hover:text-peerly-900"
                    )}
                  >
                    {subcat}
                  </motion.button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Tooltip content="Filter Results">
                  <Button 
                    variant={showFilters ? "default" : "outline"}
                    size="sm" 
                    className={cn(
                      "flex items-center transition-all",
                      showFilters ? "bg-primary text-white" : ""
                    )}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={16} className="mr-2" />
                    Filters
                  </Button>
                </Tooltip>
                
                <Tooltip content="Sort Results">
                  <div className="relative group">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center min-w-32"
                    >
                      {sortOptions.find(opt => opt.value === activeSort)?.icon}
                      <span className="mx-2 truncate">
                        {sortOptions.find(opt => opt.value === activeSort)?.label}
                      </span>
                      <ArrowUpDown size={14} />
                    </Button>
                    
                    <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg border border-peerly-200 w-48 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          className={cn(
                            "flex items-center w-full px-4 py-2 text-sm text-left hover:bg-peerly-50 transition-colors",
                            activeSort === option.value ? "bg-peerly-50 text-primary font-medium" : "text-peerly-700"
                          )}
                          onClick={() => setActiveSort(option.value)}
                        >
                          <span className="mr-2">{option.icon}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </Tooltip>
                
                <div className="hidden md:flex items-center border border-peerly-200 rounded-md overflow-hidden">
                  <Tooltip content="Grid View">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(
                        "rounded-r-none transition-colors",
                        activeView === "grid" ? "bg-peerly-100 text-primary" : ""
                      )}
                      onClick={() => setActiveView("grid")}
                    >
                      <Grid size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Map View">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(
                        "rounded-l-none transition-colors",
                        activeView === "list" ? "bg-peerly-100 text-primary" : ""
                      )}
                      onClick={() => setActiveView("list")}
                    >
                      <Map size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Container>
        </motion.div>
        
        {/* Expanded Filters with Animation */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-peerly-50 to-white border-b border-peerly-200 overflow-hidden"
            >
              <Container>
                <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-sm border border-peerly-100"
                  >
                    <h3 className="font-medium text-peerly-900 mb-3 flex items-center">
                      <BadgeDollarSign size={16} className="mr-2 text-primary" />
                      Price Range
                    </h3>
                    <div className="px-2 py-3">
                      <Slider
                        defaultValue={[0, 5000]}
                        max={5000}
                        step={100}
                        onValueChange={(value) => setPriceRange(value as number[])}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-peerly-700">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Any Price", "Under ₹500", "₹500 - ₹1000", "₹1000+"].map((range) => (
                        <Badge 
                          key={range} 
                          variant="outline"
                          className="cursor-pointer hover:bg-peerly-50 transition-colors"
                        >
                          {range}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-4 rounded-lg shadow-sm border border-peerly-100"
                  >
                    <h3 className="font-medium text-peerly-900 mb-3 flex items-center">
                      <MapPin size={16} className="mr-2 text-primary" />
                      Location
                    </h3>
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search location..."
                          className="w-full px-4 py-2 pr-10 border border-peerly-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-peerly-400" />
                      </div>
                      <div className="mt-4 space-y-1">
                        {["Near Me", "Indiranagar", "Koramangala", "HSR Layout", "Whitefield"].map((loc) => (
                          <div key={loc} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`location-${loc}`}
                              className="mr-2 h-4 w-4 rounded border-peerly-300 text-primary focus:ring-primary"
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
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-4 rounded-lg shadow-sm border border-peerly-100"
                  >
                    <h3 className="font-medium text-peerly-900 mb-3 flex items-center">
                      <Calendar size={16} className="mr-2 text-primary" />
                      Availability
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="available-now"
                          className="mr-2 h-4 w-4 rounded border-peerly-300 text-primary focus:ring-primary"
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
                        <div className="grid grid-cols-2 gap-2">
                          <div className="relative">
                            <input 
                              type="date" 
                              className="w-full px-3 py-2 border border-peerly-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            />
                          </div>
                          <div className="relative">
                            <input 
                              type="date" 
                              className="w-full px-3 py-2 border border-peerly-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="flex justify-end pb-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mr-2"
                    onClick={() => setShowFilters(false)}
                  >
                    Reset Filters
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Active Filters Pills */}
        {selectedSubcategory && (
          <Container className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-peerly-600 mr-2">Active filters:</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium flex items-center"
              >
                {selectedSubcategory}
                <button 
                  className="ml-2 hover:bg-primary/10 rounded-full p-0.5"
                  onClick={() => setSelectedSubcategory(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </motion.div>
            </div>
          </Container>
        )}
        
        {/* Category Items with Loading Animation */}
        <section className="py-8">
          <Container>
            {isLoading ? (
              // Loading skeleton
              <div className={cn(
                "grid gap-6",
                activeView === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
              )}>
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-48 bg-peerly-200 rounded-lg mb-3"></div>
                    <div className="h-5 bg-peerly-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-peerly-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-peerly-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : currentCategory.items.length === 0 ? (
              // Empty state
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-peerly-100 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      ease: "easeInOut"
                    }}
                  >
                    <MapPin size={36} className="text-peerly-400" />
                  </motion.div>
                </div>
                <h2 className="text-2xl font-display font-semibold text-peerly-900 mb-3">No items found</h2>
                <p className="text-peerly-600 mb-8 max-w-md mx-auto">
                  There are currently no listings in this category. Be the first to add one!
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button 
                    onClick={() => navigate('/explore')}
                    className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90 transition-opacity"
                  >
                    <Sparkles size={18} className="mr-2" />
                    Explore other categories
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/list-item')}
                  >
                    List an item
                  </Button>
                </div>
              </motion.div>
            ) : (
              // Item grid
              <>
                <div className="flex justify-between items-center mb-6">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-semibold text-peerly-900"
                  >
                    {currentCategory.items.length} items available
                  </motion.h2>
                </div>
                <div className={cn(
                  "grid gap-6",
                  activeView === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
                )}>
                  {currentCategory.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="transform transition-all duration-300"
                    >
                      <ListingCard 
                        listing={item}
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </Container>
        </section>
        
        {/* Related Categories Section */}
        {!isLoading && currentCategory.items.length > 0 && (
          <section className="py-12 bg-peerly-50">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-display font-semibold text-peerly-900 mb-8 text-center">
                  Explore Related Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(categoryData)
                    .filter(([key]) => key !== category)
                    .slice(0, 4)
                    .map(([key, cat], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        className="rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer transition-all duration-300"
                        onClick={() => navigate(`/category/${key}`)}
                      >
                        <div className="h-32 relative overflow-hidden">
                          <img 
                            src={cat.image} 
                            alt={cat.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-3">
                            <h3 className="text-white font-medium">{cat.name}</h3>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </Container>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;