
import { Container } from "@/components/ui/container";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categories = [
  { name: "Furniture", icon: "🪑" },
  { name: "Electronics", icon: "📱" },
  { name: "Vehicles", icon: "🚗" },
  { name: "Tools", icon: "🔧" },
  { name: "Sports", icon: "🏄‍♂️" },
];

const Hero = () => {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full opacity-20 blur-3xl -z-10"></div>
      
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-peerly-900 leading-tight animate-fade-up">
            Rent anything, from anyone
          </h1>
          <p className="mt-6 text-xl text-peerly-600 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            The smarter way to access what you need—without the commitment of ownership. Connect with owners near you and rent with confidence.
          </p>
          
          {/* Search bar */}
          <div 
            className="mt-10 relative max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="What would you like to rent?"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-4 pl-5 pr-14 text-lg rounded-xl border border-peerly-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm subtle-shadow"
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
            
            {/* Category pills */}
            <div className="flex flex-wrap justify-center mt-6 gap-3">
              {categories.map((category, index) => (
                <button 
                  key={category.name}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full border border-peerly-200 bg-white hover:bg-peerly-50 transition-all focus-ring animate-fade-up",
                  )}
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium text-peerly-800">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
