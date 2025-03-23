
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, PlusCircle, Bell } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import UserMenu from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useMobile();
  const { user } = useAuth();
  const location = useLocation();
  
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
  
  return (
    <header
      className={cn(
        "fixed w-full top-0 z-40 transition-all duration-200",
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
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
            <Link
              to="/"
              className={cn(
                "px-3 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                isActive("/") && "bg-peerly-50 text-peerly-900"
              )}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={cn(
                "px-3 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                isActive("/explore") && "bg-peerly-50 text-peerly-900"
              )}
            >
              Explore
            </Link>
            <Link
              to="/how-it-works"
              className={cn(
                "px-3 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                isActive("/how-it-works") && "bg-peerly-50 text-peerly-900"
              )}
            >
              How it works
            </Link>
          </nav>
          
          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-peerly-400" size={18} />
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 w-56 lg:w-64 rounded-full border border-peerly-200 placeholder-peerly-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            
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
            
            <UserMenu />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-peerly-50">
              <Search size={20} className="text-peerly-600" />
            </button>
            
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
        <div className="md:hidden bg-white border-t border-peerly-100 animate-slideDown">
          <Container>
            <nav className="py-4 space-y-1">
              <Link
                to="/"
                className={cn(
                  "block px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                  isActive("/") && "bg-peerly-50 text-peerly-900"
                )}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/explore"
                className={cn(
                  "block px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                  isActive("/explore") && "bg-peerly-50 text-peerly-900"
                )}
                onClick={closeMobileMenu}
              >
                Explore
              </Link>
              <Link
                to="/how-it-works"
                className={cn(
                  "block px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors",
                  isActive("/how-it-works") && "bg-peerly-50 text-peerly-900"
                )}
                onClick={closeMobileMenu}
              >
                How it works
              </Link>
              
              {user && (
                <Link
                  to="/create-listing"
                  className="block px-4 py-2 text-peerly-600 rounded-md hover:bg-peerly-50 hover:text-peerly-900 font-medium transition-colors"
                  onClick={closeMobileMenu}
                >
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
