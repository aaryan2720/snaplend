import { Container } from "@/components/ui/container";
import { Search, ArrowRight, TrendingUp, Shield, Clock, MapPin, Mic, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

// Expanded categories with enhanced styling
const categories = [
  { name: "Furniture", icon: "🪑", color: "#4F46E5", hoverColor: "#4338CA" },
  { name: "Electronics", icon: "📱", color: "#06B6D4", hoverColor: "#0891B2" },
  { name: "Vehicles", icon: "🚗", color: "#10B981", hoverColor: "#059669" },
  { name: "Tools", icon: "🔧", color: "#F59E0B", hoverColor: "#D97706" },
  { name: "Sports", icon: "🏏", color: "#EC4899", hoverColor: "#DB2777" }, // Cricket bat for Indian context
  { name: "Clothing", icon: "👕", color: "#8B5CF6", hoverColor: "#7C3AED" },
  { name: "Photography", icon: "📷", color: "#D946EF", hoverColor: "#C026D3" },
  { name: "Gaming", icon: "🎮", color: "#2563EB", hoverColor: "#1D4ED8" },
  { name: "Music", icon: "🎵", color: "#DC2626", hoverColor: "#B91C1C" },
  { name: "Home Appliances", icon: "🏠", color: "#0891B2", hoverColor: "#0E7490" },
  { name: "Party Supplies", icon: "🎉", color: "#7C3AED", hoverColor: "#6D28D9" },
  { name: "Wedding Decor", icon: "💍", color: "#65A30D", hoverColor: "#4D7C0F" }, // More relevant for Indian market
];

// App features for rotating banner
const appFeatures = [
  "Sustainable Renting • Better for the Planet",
  "Verified Users • Safe and Secure Transactions",
  "Save Money • Rent Instead of Buy",
  "Insurance Included • Peace of Mind Guarantee",
  "Local Community • Support Your Neighbors",
  "Fast Delivery • Get Items When You Need Them",
  "Flexible Rental Periods • Daily, Weekly, Monthly Options",
  "Quality Guarantee • Only the Best Items",
];

// Search examples that will rotate in placeholder
const searchExamples = [
  "Wedding photography equipment for the weekend",
  "Camping setup for trip to Rishikesh",
  "Power drill for home renovation project",
  "Royal Enfield bike for weekend ride",
  "Projector for Diwali family gathering",
  "Designer lehenga for wedding function",
  "Refrigerator for temporary home setup",
  "DJ equipment for sangeet ceremony",
  "Gaming console for trying before buying",
  "Air conditioner for summer months",
];

// Indian-focused user testimonials for the carousel
const testimonials = [
  { 
    name: "Arjun K.", 
    location: "Bangalore", 
    rating: 5,
    item: "Royal Enfield",
    review: "Saved ₹80,000 by renting instead of buying! Perfect condition too.",
    avatar: "/api/placeholder/40/40"
  },
  { 
    name: "Priya S.", 
    location: "Mumbai", 
    rating: 5,
    item: "DSLR Camera",
    review: "Used it for my cousin's wedding functions. Photos came out amazing!",
    avatar: "/api/placeholder/40/40"
  },
  { 
    name: "Rahul M.", 
    location: "Delhi", 
    rating: 4,
    item: "Power Tools Set",
    review: "Completed my kitchen renovation for a fraction of the cost.",
    avatar: "/api/placeholder/40/40"
  },
  { 
    name: "Anjali T.", 
    location: "Jaipur", 
    rating: 5,
    item: "Camping Gear",
    review: "First time camping in Himachal. Great experience without huge investment!",
    avatar: "/api/placeholder/40/40"
  },
  { 
    name: "Vikram P.", 
    location: "Chennai", 
    rating: 5,
    item: "Projector",
    review: "Hosted an incredible cricket match viewing party. Worth every rupee!",
    avatar: "/api/placeholder/40/40"
  },
  { 
    name: "Meera L.", 
    location: "Kolkata", 
    rating: 4,
    item: "Designer Saree",
    review: "Wore a designer saree to a wedding that I could never afford to buy!",
    avatar: "/api/placeholder/40/40"
  },
  { 
    name: "Karthik N.", 
    location: "Hyderabad", 
    rating: 5,
    item: "Air Conditioner",
    review: "Rented AC for summer months instead of buying. Saved so much money!",
    avatar: "/api/placeholder/40/40"
  },
];

const Hero = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isEarningButtonHovered, setIsEarningButtonHovered] = useState(false);
  const backgroundElements = useRef([]);
  const testimonialContainerRef = useRef(null);
  const earningButtonRef = useRef(null);
  
  // Initialize background elements
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    backgroundElements.current = [
      { x: 20, y: 20, size: 400, color: "rgba(125, 211, 252, 0.2)", speed: 0.02 },
      { x: 70, y: 40, size: 300, color: "rgba(167, 139, 250, 0.15)", speed: 0.015 },
      { x: 40, y: 80, size: 350, color: "rgba(110, 231, 183, 0.1)", speed: 0.025 },
      { x: 10, y: 60, size: 250, color: "rgba(251, 191, 36, 0.1)", speed: 0.018 },
      { x: 80, y: 10, size: 280, color: "rgba(239, 68, 68, 0.07)", speed: 0.022 },
      { x: 60, y: 70, size: 320, color: "rgba(79, 70, 229, 0.12)", speed: 0.016 },
    ];
    
    setIsLoaded(true);
  }, []);
  
  // Track mouse movements for subtle background animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Rotate feature text in single banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => 
        (prevIndex + 1) % appFeatures.length
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Rotate search placeholder examples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => 
        (prevIndex + 1) % searchExamples.length
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Subtle floating animation for earning button
  useEffect(() => {
    if (!earningButtonRef.current) return;
    
    const floatAnimation = () => {
      const button = earningButtonRef.current;
      if (!button) return;
      
      let startTime;
      const duration = 3000; // 3 seconds per cycle
      const floatHeight = 8; // pixels to float up and down
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Sine wave movement for natural floating effect
        const offset = Math.sin(progress * 2 * Math.PI) * floatHeight;
        button.style.transform = `translateY(${offset}px)`;
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      let animationFrame = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    };
    
    const cleanup = floatAnimation();
    return cleanup;
  }, [isLoaded]);
  
  // Mock voice search functionality
  const handleVoiceSearch = () => {
    setIsListening(true);
    
    // Simulate voice recognition process
    setTimeout(() => {
      setSearchValue("royal enfield rental near me");
      setIsListening(false);
    }, 2000);
  };
  
  // Auto-scroll testimonials
  useEffect(() => {
    if (!testimonialContainerRef.current) return;
    
    const scrollWidth = testimonialContainerRef.current.scrollWidth;
    const containerWidth = testimonialContainerRef.current.offsetWidth;
    
    let scrollPosition = 0;
    const speed = 1; // pixels per frame
    
    const scroll = () => {
      if (!testimonialContainerRef.current) return;
      
      scrollPosition += speed;
      
      // Reset when all testimonials have scrolled through
      if (scrollPosition >= scrollWidth - containerWidth) {
        scrollPosition = 0;
      }
      
      testimonialContainerRef.current.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };
    
    const animation = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animation);
  }, [isLoaded]);
  
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-40 overflow-hidden">
      {/* Animated background shapes that move subtly with cursor */}
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%" className="absolute top-0 left-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
          
          {backgroundElements.current.map((element, index) => {
            // Subtle movement based on cursor position
            const xOffset = (cursorPosition.x - 0.5) * element.speed * 100;
            const yOffset = (cursorPosition.y - 0.5) * element.speed * 100;
            
            const xPosition = `${element.x + xOffset / 10}%`;
            const yPosition = `${element.y + yOffset / 10}%`;
            
            return (
              <circle
                key={index}
                cx={xPosition}
                cy={yPosition}
                r={element.size}
                fill={element.color}
                style={{
                  transition: "cx 3s ease-out, cy 3s ease-out",
                  filter: "url(#goo)",
                  mixBlendMode: "overlay"
                }}
              />
            );
          })}
        </svg>
      </div>
      
      {/* Gradient base background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white -z-20"></div>
      
      
      <Container>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Single Rotating Feature Banner */}
          <div className="py-1 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 mb-6 inline-block overflow-hidden h-7">
            <div className="transition-all duration-700 ease-in-out">
              {appFeatures[currentFeatureIndex]}
            </div>
          </div>
          
          <div className={cn(
            "transition-all duration-700 transform",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-peerly-900 leading-tight">
              <span className="relative inline-block">
                Rent
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-primary/20 rounded-full"></span>
              </span>{" "}
              anything, from anyone{" "}
              <span className="relative inline-block">
                nearby
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-primary/20 rounded-full"></span>
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-peerly-600">
              The smarter way to access what you need—without the commitment of ownership. 
              Connect with trusted local owners and <span className="text-primary font-semibold">save up to 70%</span> compared to buying new.
            </p>
          </div>
          
          {/* Enhanced search bar with voice search */}
          <div 
            className={cn(
              "mt-10 relative max-w-2xl mx-auto transition-all duration-700 delay-300 transform",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder={searchExamples[currentPlaceholderIndex]}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full py-4 pl-5 pr-24 text-lg rounded-xl border border-peerly-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-lg backdrop-blur-sm bg-white/90"
                />
                
                {/* Voice search button */}
                <button 
                  className={cn(
                    "absolute right-14 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors shadow-md",
                    isListening ? "animate-pulse bg-red-500 text-white" : "bg-gray-100 text-peerly-600 hover:bg-gray-200"
                  )}
                  aria-label="Voice Search"
                  onClick={handleVoiceSearch}
                >
                  <Mic size={20} />
                </button>
                
                {/* Search button */}
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>
            </div>
            
            {/* Popular search tags */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs text-peerly-500 mr-1">Popular:</span>
              {["Projector for wedding", "DJ setup", "Moving truck", "AC for summer", "Wedding decor"].map((tag) => (
                <button 
                  key={tag}
                  className="text-xs text-peerly-600 hover:text-primary transition-colors"
                  onClick={() => setSearchValue(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Enhanced Category Grid with Improved Styling and Animations */}
          <div className="mt-14 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-peerly-800 mb-5 relative inline-block">
              Browse Popular Categories
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 rounded-full transform -translate-y-1"></span>
            </h3>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {categories.map((category, index) => (
                <button 
                  key={category.name}
                  className={cn(
                    "flex flex-col items-center gap-2 px-3 py-4 rounded-xl border transition-all duration-300 focus-ring",
                    "shadow-sm hover:shadow-md transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm hover:bg-white",
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ 
                    animationDelay: `${0.3 + index * 0.05}s`,
                    transitionDelay: `${0.4 + index * 0.05}s`,
                    borderColor: hoveredCategory === index ? `${category.hoverColor}80` : `${category.color}40`,
                    boxShadow: hoveredCategory === index ? `0 4px 12px ${category.color}40` : "",
                  }}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div 
                    className={cn(
                      "text-3xl p-2 rounded-full transition-all duration-300",
                      hoveredCategory === index ? "scale-110" : "scale-100"
                    )}
                    style={{ 
                      background: hoveredCategory === index 
                        ? `linear-gradient(135deg, ${category.color}30, ${category.hoverColor}50)` 
                        : `linear-gradient(135deg, ${category.color}20, ${category.color}30)`,
                      textShadow: '0 0 10px rgba(255,255,255,0.8)',
                      boxShadow: hoveredCategory === index 
                        ? `0 4px 8px ${category.color}30` 
                        : `0 2px 4px ${category.color}20`,
                    }}
                  >
                    {category.icon}
                  </div>
                  <span 
                    className={cn(
                      "font-medium text-sm transition-all duration-300",
                      hoveredCategory === index ? "text-primary font-semibold" : "text-peerly-800"
                    )}
                  >
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Testimonial scrolling carousel with Indian context */}
          <div className="mt-16">
            <div className="mb-5">
              <p className="text-sm uppercase tracking-wider text-peerly-500 font-medium">Trusted by 10,000+ renters across 50+ cities in India</p>
            </div>
            
            <div className="relative">
              {/* Gradient fade on edges */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
              
              {/* Scrolling testimonials container */}
              <div 
                ref={testimonialContainerRef}
                className="flex gap-4 overflow-x-hidden py-2"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Double the testimonials to create a seamless loop effect */}
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-64 bg-white rounded-lg p-4 shadow-md border border-peerly-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-peerly-800">{testimonial.name}</p>
                        <p className="text-xs text-peerly-500">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-sm font-medium text-primary mb-1">Rented: {testimonial.item}</p>
                    <p className="text-sm text-peerly-600">{testimonial.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Dual CTA Buttons - Make it clear users can both rent and lend */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <a 
              href="#browse" 
              className="inline-flex items-center gap-2 py-3 px-8 rounded-lg bg-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group w-full md:w-auto justify-center"
            >
              <span>Find Items to Rent</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            
            <a 
              href="/create-listing" 
              className="inline-flex items-center gap-2 py-3 px-8 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group w-full md:w-auto justify-center"
            >
              <PlusCircle size={18} />
              <span>List Your Items</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;