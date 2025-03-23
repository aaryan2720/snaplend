
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Search, Menu, X, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 border-b",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-gray-200/20 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-display font-semibold text-peerly-900 transition-opacity hover:opacity-80"
          >
            peerly
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/browse" 
              className="text-peerly-700 hover:text-peerly-900 font-medium transition-colors"
            >
              Browse
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-peerly-700 hover:text-peerly-900 font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/create-listing" 
              className="text-peerly-700 hover:text-peerly-900 font-medium transition-colors"
            >
              List an Item
            </Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="p-2 text-peerly-700 hover:text-peerly-900 rounded-full hover:bg-peerly-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <div className="border-l border-peerly-200 h-6 mx-2"></div>
            
            <Link to="/login">
              <Button variant="outline" size="sm" className="font-medium">
                <LogIn size={16} className="mr-2" />
                Sign In
              </Button>
            </Link>
            
            <Link to="/signup">
              <Button size="sm" className="font-medium">
                <UserPlus size={16} className="mr-2" />
                Join
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-peerly-700 hover:text-peerly-900 rounded-full hover:bg-peerly-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out pt-20",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Container>
          <nav className="flex flex-col space-y-6 py-8">
            <Link 
              to="/browse" 
              className="text-xl text-peerly-900 font-medium px-4 py-2 rounded-lg hover:bg-peerly-50 transition-colors"
            >
              Browse
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-xl text-peerly-900 font-medium px-4 py-2 rounded-lg hover:bg-peerly-50 transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/create-listing" 
              className="text-xl text-peerly-900 font-medium px-4 py-2 rounded-lg hover:bg-peerly-50 transition-colors"
            >
              List an Item
            </Link>
            
            <div className="border-t border-peerly-100 my-4"></div>
            
            <Link 
              to="/login" 
              className="text-xl text-peerly-900 font-medium px-4 py-2 rounded-lg hover:bg-peerly-50 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="text-xl text-peerly-900 font-medium px-4 py-2 rounded-lg hover:bg-peerly-50 transition-colors"
            >
              Join
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
