
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sofa } from "lucide-react";

const furnitureCategories = [
  {
    id: "sofas",
    name: "Sofas & Couches",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400&h=300",
    count: 87,
  },
  {
    id: "tables",
    name: "Tables & Desks",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=400&h=300",
    count: 64,
  },
  {
    id: "chairs",
    name: "Chairs & Seating",
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=400&h=300",
    count: 112,
  },
  {
    id: "beds",
    name: "Beds & Mattresses",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400&h=300",
    count: 43,
  },
  {
    id: "storage",
    name: "Storage & Organization",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400&h=300",
    count: 57,
  },
  {
    id: "office",
    name: "Office Furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400&h=300",
    count: 36,
  },
];

const FurnitureSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding bg-peerly-50/50">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center">
              <Sofa className="mr-2 text-primary" size={24} />
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-peerly-900">
                Furniture
              </h2>
            </div>
            <p className="mt-2 text-peerly-600">Find the perfect furniture pieces for your home or event</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate('/browse/furniture')}
            className="font-medium"
          >
            View all furniture
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {furnitureCategories.map((category) => (
            <Card 
              key={category.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/browse/furniture/${category.id}`)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm md:text-base text-peerly-900 line-clamp-1">{category.name}</h3>
                <p className="text-xs text-peerly-500 mt-1">{category.count} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FurnitureSection;
