
import { Container } from "@/components/ui/container";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "furniture",
    name: "Furniture",
    description: "Tables, chairs, sofas, and more",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400&h=300",
    iconBg: "bg-amber-100",
    count: 243,
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Cameras, drones, and gadgets",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=400&h=300",
    iconBg: "bg-blue-100",
    count: 182,
  },
  {
    id: "vehicles",
    name: "Vehicles",
    description: "Cars, bikes, and scooters",
    image: "https://images.unsplash.com/photo-1552642762-f55d06580015?auto=format&fit=crop&q=80&w=400&h=300",
    iconBg: "bg-red-100",
    count: 97,
  },
  {
    id: "tools",
    name: "Tools",
    description: "Power tools and equipment",
    image: "https://images.unsplash.com/photo-1581147036324-c47a03b8f120?auto=format&fit=crop&q=80&w=400&h=300",
    iconBg: "bg-green-100",
    count: 156,
  },
];

const CategoryList = () => {
  const navigate = useNavigate();
  
  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-peerly-900">
            Browse by category
          </h2>
          <p className="mt-4 text-lg text-peerly-600 max-w-2xl mx-auto">
            Find exactly what you need from our wide selection of rental items
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="glass-card rounded-xl overflow-hidden hover-scale cursor-pointer animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => navigate(`/browse/${category.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              <div className="px-6 py-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-medium text-peerly-900">
                    {category.name}
                  </h3>
                  <span className="text-sm font-medium text-peerly-500">
                    {category.count} items
                  </span>
                </div>
                <p className="mt-2 text-peerly-600">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-3 text-peerly-900 border border-peerly-200 rounded-lg hover:bg-peerly-50 transition-colors font-medium focus-ring"
          >
            View all categories
          </button>
        </div>
      </Container>
    </section>
  );
};

export default CategoryList;
