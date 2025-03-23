
import { useState, useEffect } from "react";
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
  ChevronDown 
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };
  
  return (
    <header
      className={cn(
        "fixed w-full top-0 z-40 transition-all duration-200",
        isScrolled ? "bg-white shadow-sm" : "bg-white/90 backdrop-blur-sm"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-semibold text-peerly-900">
            peerly
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <li key={category.name} className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/browse/${category.slug}`}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-peerly-50/50 to-peerly-50 p-6 no-underline outline-none focus:shadow-md"
                            >
                              <category.icon className="h-6 w-6 text-primary" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {category.name}
                              </div>
                              <p className="text-sm leading-tight text-peerly-600">
                                {category.subcategories.join(", ")}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/explore">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Explore
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/how-it-works">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Info className="mr-2 h-4 w-4" />
                      How it works
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peerly-400" size={18} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-56 lg:w-64 rounded-full border border-peerly-200 placeholder-peerly-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </form>
            
            {user && (
              <>
                <Link to="/create-listing">
                  <Button 
                    variant="outline" 
                    className="flex items-center rounded-lg"
                  >
                    <PlusCircle size={16} className="mr-2" />
                    List an item
                  </Button>
                </Link>
                
                <button className="p-2 rounded-full hover:bg-peerly-50 relative">
                  <Bell size={20} className="text-peerly-600" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </>
            )}
            
            <CartButton />
            <UserMenu />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peerly-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border border-peerly-200 placeholder-peerly-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </form>
            
            <CartButton />
            <UserMenu />
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-peerly-50"
            >
              {isMobileMenuOpen ? 
                <X size={24} className="text-peerly-800" /> : 
                <Menu size={24} className="text-peerly-800" />
              }
            </button>
          </div>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-peerly-100 animate-slideDown shadow-md">
          <Container>
            <nav className="py-4 space-y-1">
              <Link
                to="/"
                className={cn(
                  "flex items-center px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                  isActive("/") && "bg-peerly-50 text-peerly-900"
                )}
                onClick={closeMobileMenu}
              >
                <Home size={18} className="mr-2" />
                Home
              </Link>

              {categories.map((category) => (
                <div key={category.slug}>
                  <Link
                    to={`/browse/${category.slug}`}
                    className={cn(
                      "flex items-center justify-between px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                      isActive(`/browse/${category.slug}`) && "bg-peerly-50 text-peerly-900"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center">
                      <category.icon size={18} className="mr-2" />
                      {category.name}
                    </div>
                  </Link>
                </div>
              ))}
              
              <Link
                to="/explore"
                className={cn(
                  "flex items-center px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                  isActive("/explore") && "bg-peerly-50 text-peerly-900"
                )}
                onClick={closeMobileMenu}
              >
                Explore
              </Link>
              
              <Link
                to="/how-it-works"
                className={cn(
                  "flex items-center px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                  isActive("/how-it-works") && "bg-peerly-50 text-peerly-900"
                )}
                onClick={closeMobileMenu}
              >
                <Info size={18} className="mr-2" />
                How it works
              </Link>
              
              {user && (
                <Link
                  to="/create-listing"
                  className="flex items-center px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors"
                  onClick={closeMobileMenu}
                >
                  <PlusCircle size={18} className="mr-2" />
                  List an item
                </Link>
              )}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
