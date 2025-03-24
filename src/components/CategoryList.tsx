
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { BookMarked, Car, Cpu, Home, Package2, Shirt, Utensils, Bike, Package, GraduationCap, Monitor, Gamepad2 } from "lucide-react";

interface CategoryCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  link: string;
  featured?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, name, description, link, featured = false }) => {
  return (
    <Link to={link} className="block group">
      <Card className={`h-full transition-all ${featured ? 'border-primary/20 shadow-md' : 'border-transparent hover:border-primary/20 hover:shadow-md'}`}>
        <CardContent className="p-6">
          <div className="mb-4 flex justify-center">
            <div className={`rounded-full w-16 h-16 flex items-center justify-center ${featured ? 'bg-primary/10 text-primary' : 'bg-secondary text-primary'} group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
              {icon}
            </div>
          </div>
          <h3 className="font-semibold text-center mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground text-center">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const categories: CategoryCardProps[] = [
  {
    icon: <Car size={32} />,
    name: "Vehicles",
    description: "Cars, motorcycles, and other vehicles for rent",
    link: "/browse/vehicles",
    featured: true
  },
  {
    icon: <Cpu size={32} />,
    name: "Electronics",
    description: "Laptops, cameras, and other tech gadgets",
    link: "/browse/electronics",
    featured: true
  },
  {
    icon: <Home size={32} />,
    name: "Home Appliances",
    description: "Kitchen, cleaning, and household items",
    link: "/browse/home-appliances",
    featured: true
  },
  {
    icon: <Package2 size={32} />,
    name: "Party Supplies",
    description: "Everything you need for your next event",
    link: "/browse/party-supplies"
  },
  {
    icon: <Utensils size={32} />,
    name: "Kitchen Equipment",
    description: "Professional cooking tools and appliances",
    link: "/browse/kitchen"
  },
  {
    icon: <Shirt size={32} />,
    name: "Clothing",
    description: "Formal wear, costumes, and special occasion outfits",
    link: "/browse/clothing"
  },
  {
    icon: <Bike size={32} />,
    name: "Sports & Outdoors",
    description: "Equipment for sports and outdoor activities",
    link: "/browse/sports"
  },
  {
    icon: <Package size={32} />,
    name: "Tools & Equipment",
    description: "Professional tools for every DIY project",
    link: "/browse/tools"
  },
  {
    icon: <GraduationCap size={32} />,
    name: "Educational",
    description: "Books, instruments, and learning materials",
    link: "/browse/educational"
  },
  {
    icon: <Monitor size={32} />,
    name: "Office Equipment",
    description: "Printers, projectors, and office furniture",
    link: "/browse/office"
  },
  {
    icon: <Gamepad2 size={32} />,
    name: "Gaming",
    description: "Consoles, VR equipment, and gaming accessories",
    link: "/browse/gaming"
  },
  {
    icon: <BookMarked size={32} />,
    name: "Other Categories",
    description: "Browse all available items for rent",
    link: "/explore"
  }
];

export function CategoryList() {
  // Featured categories (first 3)
  const featuredCategories = categories.slice(0, 3);
  
  // Other categories
  const otherCategories = categories.slice(3);
  
  return (
    <div className="py-12 px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Browse Categories</h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Discover thousands of items available for rent across these popular categories
        </p>
      </div>
      
      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {featuredCategories.map((category, index) => (
          <CategoryCard
            key={index}
            icon={category.icon}
            name={category.name}
            description={category.description}
            link={category.link}
            featured={true}
          />
        ))}
      </div>
      
      {/* Other Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {otherCategories.map((category, index) => (
          <CategoryCard
            key={index}
            icon={category.icon}
            name={category.name}
            description={category.description}
            link={category.link}
          />
        ))}
      </div>
      
      {/* "View All" button */}
      <div className="mt-12 text-center">
        <Link to="/explore" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed h-10 py-2 px-4 bg-primary text-primary-foreground hover:bg-primary/90">
          View All Categories
        </Link>
      </div>
    </div>
  );
}

// Also add a default export for backward compatibility
export default CategoryList;
