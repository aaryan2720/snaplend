import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Search, 
  PlusCircle, 
  Bell, 
  Home, 
  ShoppingBag,
  Car, 
  Sofa, 
  Smartphone, 
  Info, 
  ChevronDown,
  Mic,
  MicOff
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";
import CartButton from "./CartButton";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const categories = [
  { 
    name: "Furniture", 
    icon: Sofa, 
    slug: "furniture",
    subcategories: ["Chairs", "Tables", "Sofas", "Beds", "Storage"] 
  },
  { 
    name: "Vehicles", 
    icon: Car, 
    slug: "vehicles",
    subcategories: ["Cars", "Bikes", "Scooters", "Luxury Cars", "Vans"] 
  },
  { 
    name: "Electronics", 
    icon: Smartphone, 
    slug: "electronics",
    subcategories: ["Cameras", "Drones", "Laptops", "Audio Equipment", "Gaming Consoles"] 
  },
];

// Define placeholder suggestions for the search bar
const searchPlaceholders = [
  "Find a comfy sofa...",
  "Search for electronics...",
  "Looking for a vehicle?",
  "Find gaming consoles...",
  "Need a new table?",
  "Discover luxury cars...",
  "Search for audio equipment...",
  "Looking for storage solutions?",
  "Find the perfect chair...",
  "Browse drones and cameras..."
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const searchInputRef = useRef(null);
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Speech recognition setup
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript]);

  // Handle voice search
  const toggleVoiceSearch = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support voice search.");
      return;
    }
    
    if (listening) {
      SpeechRecognition.stopListening();
      setIsVoiceSearchActive(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      setIsVoiceSearchActive(true);
      // Focus search input
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex(prev => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      resetTranscript();
      if (listening) {
        SpeechRecognition.stopListening();
        setIsVoiceSearchActive(false);
      }
    }
  };

  // Animation variants for framer motion
  const navbarVariants = {
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    hidden: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const mobileMenuVariants = {
    open: { 
      height: "auto",
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    closed: { 
      height: 0,
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    closed: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const logoVariants = {
    normal: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={cn(
        "fixed w-full top-0 z-40 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-peerly-100" 
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover="hover"
            variants={logoVariants}
          >
            <Link to="/" className="text-2xl font-display font-semibold text-peerly-900 relative overflow-hidden group">
              <span className="bg-clip-text bg-gradient-to-r from-primary to-primary/70 text-transparent">SnapLend</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/40 origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          </motion.div>
          
          {/* Desktop Nav */}
          <motion.nav 
            className="hidden md:flex items-center space-x-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "transition-all duration-300 hover:bg-primary/10"
                    )}>
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="transition-all duration-300 hover:bg-primary/10">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <motion.ul 
                      className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories.map((category, index) => (
                        <motion.li 
                          key={category.name} 
                          className="row-span-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/browse/${category.slug}`}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-peerly-50/50 to-peerly-50 p-6 no-underline outline-none transition-all duration-300 hover:shadow-md hover:bg-gradient-to-b hover:from-primary/5 hover:to-primary/10"
                            >
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                <category.icon className="h-6 w-6 text-primary" />
                              </motion.div>
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {category.name}
                              </div>
                              <p className="text-sm leading-tight text-peerly-600">
                                {category.subcategories.join(", ")}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/explore">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "transition-all duration-300 hover:bg-primary/10"
                    )}>
                      Explore
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/how-it-works">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "transition-all duration-300 hover:bg-primary/10"
                    )}>
                      <Info className="mr-2 h-4 w-4" />
                      How it works
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </motion.nav>
          
          {/* Desktop Right Side */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <form onSubmit={handleSearch} className="relative group">
              <Search className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300",
                isSearchFocused ? "text-primary" : "text-peerly-400"
              )} size={18} />
              
              <motion.input
                ref={searchInputRef}
                type="text"
                placeholder={searchPlaceholders[currentPlaceholderIndex]}
                value={isVoiceSearchActive ? transcript || searchQuery : searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  "pl-10 pr-12 py-2 w-56 lg:w-64 rounded-full border transition-all duration-300",
                  isSearchFocused 
                    ? "border-primary shadow-sm shadow-primary/20 bg-white" 
                    : "border-peerly-200 bg-peerly-50/50",
                  "placeholder-peerly-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                )}
                initial={{ width: "16rem" }}
                animate={{ width: isSearchFocused ? "18rem" : "16rem" }}
                transition={{ duration: 0.3 }}
              />
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    type="button" 
                    onClick={toggleVoiceSearch}
                    className={cn(
                      "absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all duration-300",
                      isVoiceSearchActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-peerly-400 hover:text-primary"
                    )}
                  >
                    {isVoiceSearchActive ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Mic size={16} />
                      </motion.div>
                    ) : (
                      <MicOff size={16} />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {isVoiceSearchActive ? "Stop voice search" : "Start voice search"}
                </TooltipContent>
              </Tooltip>
            </form>
            
            {user && (
              <motion.div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/create-listing">
                    <Button 
                      variant="outline" 
                      className="flex items-center rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all duration-300 border-primary/30"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      List an item
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.button 
                  className="p-2 rounded-full hover:bg-primary/10 relative overflow-hidden transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell size={20} className="text-peerly-600" />
                  <motion.span 
                    className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2
                    }}
                  />
                </motion.button>
              </motion.div>
            )}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CartButton />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserMenu />
            </motion.div>
          </motion.div>
          
          {/* Mobile Menu Button and Search */}
          <div className="flex md:hidden items-center space-x-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300",
                isSearchFocused ? "text-primary" : "text-peerly-400"
              )} size={18} />
              
              <input
                ref={searchInputRef}
                type="text"
                placeholder={searchPlaceholders[currentPlaceholderIndex]}
                value={isVoiceSearchActive ? transcript || searchQuery : searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  "pl-10 pr-12 py-2 w-36 rounded-full border transition-all duration-300",
                  isSearchFocused 
                    ? "border-primary shadow-sm shadow-primary/20" 
                    : "border-peerly-200 bg-peerly-50/50",
                  "placeholder-peerly-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                )}
              />
              
              <button 
                type="button" 
                onClick={toggleVoiceSearch}
                className={cn(
                  "absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors",
                  isVoiceSearchActive ? "text-primary" : "text-peerly-400"
                )}
              >
                {isVoiceSearchActive ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Mic size={16} />
                  </motion.div>
                ) : (
                  <MicOff size={16} />
                )}
              </button>
            </form>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CartButton />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserMenu />
            </motion.div>
            
            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-peerly-50 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-peerly-800" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-peerly-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t border-peerly-100 shadow-md overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <Container>
              <motion.nav className="py-4 space-y-1">
                <motion.div variants={itemVariants}>
                  <Link
                    to="/"
                    className={cn(
                      "flex items-center px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-all duration-300",
                      isActive("/") && "bg-primary/10 text-primary"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <Home size={18} className="mr-2" />
                    Home
                  </Link>
                </motion.div>

                {categories.map((category, index) => (
                  <motion.div 
                    key={category.slug}
                    variants={itemVariants}
                    custom={index}
                  >
                    <Link
                      to={`/browse/${category.slug}`}
                      className={cn(
                        "flex items-center justify-between px-4 py-2 text-peerly-600 rounded-md hover:bg-primary/5 hover:text-primary font-medium transition-all duration-300",
                        isActive(`/browse/${category.slug}`) && "bg-primary/10 text-primary"
                      )}
                      onClick={closeMobileMenu}
                    >
                      <div className="flex items-center">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <category.icon size={18} className="mr-2" />
                        </motion.div>
                        {category.name}
                      </div>
                      <ChevronDown size={16} className="text-peerly-400" />
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div variants={itemVariants}>
                  <Link
                    to="/explore"
                    className={cn(
                      "flex items-center px-4 py-2 text-peerly-600 rounded-md hover:bg-primary/5 hover:text-primary font-medium transition-all duration-300",
                      isActive("/explore") && "bg-primary/10 text-primary"
                    )}
                    onClick={closeMobileMenu}
                  >
                    Explore
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link
                    to="/how-it-works"
                    className={cn(
                      "flex items-center px-4 py-2 text-peerly-600 rounded-md hover:bg-primary/5 hover:text-primary font-medium transition-all duration-300",
                      isActive("/how-it-works") && "bg-primary/10 text-primary"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <Info size={18} className="mr-2" />
                    How it works
                  </Link>
                </motion.div>
                
                {user && (
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/create-listing"
                      className="flex items-center px-4 py-2 text-peerly-600 rounded-md hover:bg-primary/5 hover:text-primary font-medium transition-all duration-300"
                      onClick={closeMobileMenu}
                    >
                      <PlusCircle size={18} className="mr-2" />
                      List an item
                    </Link>
                  </motion.div>
                )}
              </motion.nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;