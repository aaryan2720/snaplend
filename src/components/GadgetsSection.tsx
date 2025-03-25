import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Bookmark, ChevronRight, Clock, Smartphone, Star, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gadgetCategories = [
  {
    id: "cameras",
    name: "Cameras & Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=300", // Using placeholder image
    featured: true,
    description: "Professional DSLRs to instant cameras",
    popularity: 98,
    rentalCount: 1240,
    avgRating: 4.8
  },
  {
    id: "drones",
    name: "Drones & Aerial",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=400&h=300", // Using placeholder image
    featured: true,
    description: "Capture stunning aerial footage",
    popularity: 92,
    rentalCount: 830,
    avgRating: 4.7
  },
  {
    id: "audio",
    name: "Audio Equipment",
    image: "https://unsplash.com/photos/flatlay-photography-of-wireless-headphones-PDX_a_82obo", // Using placeholder image
    featured: true,
    description: "Speakers, microphones & DJ gear",
    popularity: 89,
    rentalCount: 1120,
    avgRating: 4.6
  },
  {
    id: "gaming",
    name: "Gaming Consoles",
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&q=80&w=400&h=300", // Using placeholder image
    description: "PlayStation, Xbox, Nintendo & more",
    popularity: 94,
    rentalCount: 970,
    avgRating: 4.5
  },
  {
    id: "projectors",
    name: "Projectors & Screens",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=400&h=300", // Using placeholder image
    description: "Create your home cinema experience",
    popularity: 78,
    rentalCount: 650,
    avgRating: 4.4
  },
  {
    id: "computers",
    name: "Computers & Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400&h=300", // Using placeholder image
    description: "High-performance computers for any task",
    popularity: 90,
    rentalCount: 1050,
    avgRating: 4.7
  },
];

const GadgetsSection = () => {
  const navigate = useNavigate();
  const [hoveredCardId, setHoveredCardId] = useState(null);
  
  const featuredGadgets = gadgetCategories.filter(gadget => gadget.featured);
  const otherGadgets = gadgetCategories.filter(gadget => !gadget.featured);
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-snaplend-50/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute -top-96 -left-96 w-192 h-192 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-64 -right-64 w-192 h-192 bg-violet-500/5 rounded-full blur-3xl"></div>
      
      <Container className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-3 py-1 px-3">
              <TrendingUp size={14} className="mr-1 animate-pulse" />
              <span>Trending Gadgets</span>
            </Badge>
            <div className="flex items-center">
              <Smartphone className="mr-3 text-primary" size={32} />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-snaplend-900 tracking-tight">
                Electronics & Gadgets
              </h2>
            </div>
            <p className="mt-3 text-snaplend-600 text-lg leading-relaxed max-w-xl">
              Rent the latest tech gadgets without the commitment of buying. Try before you invest!
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/browse/electronics')}
            className="font-medium group text-primary border-primary/30 hover:bg-primary/5 hover:border-primary self-start sm:self-center transition-all duration-300"
          >
            View all gadgets
            <ChevronRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        
        {/* Featured gadgets with enhanced cards */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          data-aos="fade-up" 
          data-aos-delay="100"
        >
          {featuredGadgets.map((gadget) => (
            <Card 
              key={gadget.id}
              className={`overflow-hidden rounded-xl border-none shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer group ${
                hoveredCardId === gadget.id ? 'scale-[1.02]' : 'scale-100'
              }`}
              onClick={() => navigate(`/browse/electronics/${gadget.id}`)}
              onMouseEnter={() => setHoveredCardId(gadget.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img 
                  src={gadget.image} 
                  alt={gadget.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90"></div>
                
                {/* Featured badge */}
                <Badge className="absolute top-3 right-3 bg-yellow-500 text-white border-none px-3 py-1">
                  <Star size={12} className="mr-1" fill="white" />
                  Featured
                </Badge>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 ease-out group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-2xl font-bold text-white leading-tight">{gadget.name}</h3>
                  <p className="text-white/90 mt-2 leading-relaxed">{gadget.description}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center text-white/80">
                      <Clock size={14} className="mr-1" />
                      <span className="text-sm">{gadget.rentalCount}+ rentals</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Star size={14} className="mr-1" fill="white" />
                      <span className="text-sm">{gadget.avgRating} rating</span>
                    </div>
                  </div>
                  
                  <div className="h-1 w-full bg-white/20 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-violet-500 rounded-full"
                      style={{ width: `${gadget.popularity}%` }}
                    ></div>
                  </div>
                  <p className="text-white/70 text-xs mt-1">Popularity: {gadget.popularity}%</p>
                </div>
                
                {/* Subtle "View details" prompt on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                    View details <ChevronRight size={14} className="inline ml-1" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Other gadgets with improved cards */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-aos="fade-up" 
          data-aos-delay="200"
        >
          {otherGadgets.map((gadget, index) => (
            <Card 
              key={gadget.id}
              className="overflow-hidden rounded-xl border border-snaplend-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(`/browse/electronics/${gadget.id}`)}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: `translateY(${hoveredCardId === gadget.id ? '-8px' : '0'})`,
                transition: 'transform 0.4s ease-out'
              }}
              onMouseEnter={() => setHoveredCardId(gadget.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={gadget.image} 
                  alt={gadget.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-white/90 text-snaplend-900">
                      <Star size={12} className="mr-1 text-yellow-500" fill="currentColor" />
                      {gadget.avgRating}
                    </Badge>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-2 right-2 rounded-full w-8 h-8 p-0 bg-white/20 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Bookmark size={16} />
                </Button>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-snaplend-900 text-lg group-hover:text-primary transition-colors">{gadget.name}</h3>
                <p className="text-snaplend-600 mt-2 leading-relaxed">{gadget.description}</p>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center">
                <div className="flex items-center text-snaplend-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>{gadget.rentalCount}+ rentals</span>
                </div>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-primary font-medium p-0 group-hover:underline"
                >
                  Explore
                  <ChevronRight size={14} className="ml-1 transform transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-700 text-white border-none font-medium px-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            onClick={() => navigate('/browse/electronics')}
          >
            Browse All Electronics
            <ChevronRight size={18} className="ml-2 transform transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default GadgetsSection;