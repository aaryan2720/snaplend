
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const gadgetCategories = [
  {
    id: "cameras",
    name: "Cameras & Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=300",
    featured: true,
    description: "Professional DSLRs to instant cameras"
  },
  {
    id: "drones",
    name: "Drones & Aerial",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=400&h=300",
    featured: true,
    description: "Capture stunning aerial footage"
  },
  {
    id: "audio",
    name: "Audio Equipment",
    image: "https://images.unsplash.com/photo-1558578706-f34553b4bb10?auto=format&fit=crop&q=80&w=400&h=300",
    featured: true,
    description: "Speakers, microphones & DJ gear"
  },
  {
    id: "gaming",
    name: "Gaming Consoles",
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&q=80&w=400&h=300",
    description: "PlayStation, Xbox, Nintendo & more"
  },
  {
    id: "projectors",
    name: "Projectors & Screens",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?auto=format&fit=crop&q=80&w=400&h=300",
    description: "Create your home cinema experience"
  },
  {
    id: "computers",
    name: "Computers & Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400&h=300",
    description: "High-performance computers for any task"
  },
];

const GadgetsSection = () => {
  const navigate = useNavigate();
  
  const featuredGadgets = gadgetCategories.filter(gadget => gadget.featured);
  const otherGadgets = gadgetCategories.filter(gadget => !gadget.featured);
  
  return (
    <section className="section-padding bg-gradient-to-b from-white to-peerly-50/50">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center">
              <Smartphone className="mr-2 text-primary" size={24} />
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-peerly-900">
                Electronics & Gadgets
              </h2>
            </div>
            <p className="mt-2 text-peerly-600">Rent the latest tech gadgets without the commitment of buying</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/browse/electronics')}
            className="font-medium"
          >
            View all gadgets
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {featuredGadgets.map((gadget) => (
            <Card 
              key={gadget.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => navigate(`/browse/electronics/${gadget.id}`)}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img 
                  src={gadget.image} 
                  alt={gadget.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-medium">{gadget.name}</h3>
                  <p className="text-white/80 text-sm mt-1">{gadget.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {otherGadgets.map((gadget) => (
            <Card 
              key={gadget.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/browse/electronics/${gadget.id}`)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={gadget.image} 
                  alt={gadget.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-peerly-900">{gadget.name}</h3>
                <p className="text-sm text-peerly-500 mt-1">{gadget.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default GadgetsSection;
