import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Clock, Heart, Layers, ShieldCheck, Sofa, Sparkles, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const furnitureCategories = [
  {
    id: "sofas",
    name: "Sofas & Couches",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400&h=300",
    count: 87,
    trending: true,
    special: "Fast Delivery",
    description: "Perfect for temporary home setups or events",
    avgPrice: "$15/day",
    lenders: 42
  },
  {
    id: "tables",
    name: "Tables & Desks",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=400&h=300",
    count: 64,
    trending: false,
    special: null,
    description: "Versatile surfaces for work, dining or gatherings",
    avgPrice: "$12/day",
    lenders: 31
  },
  {
    id: "chairs",
    name: "Chairs & Seating",
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=400&h=300",
    count: 112,
    trending: true,
    special: "Weekend Discount",
    description: "Ideal for parties, conferences or home needs",
    avgPrice: "$8/day",
    lenders: 56
  },
  {
    id: "beds",
    name: "Beds & Mattresses",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400&h=300",
    count: 43,
    trending: false,
    special: null,
    description: "Quality sleep solutions for guests or temporary use",
    avgPrice: "$20/day",
    lenders: 27
  },
  {
    id: "storage",
    name: "Storage & Organization",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=400&h=300",
    count: 57,
    trending: false,
    special: "Long-term Discount",
    description: "Temporary storage options for moving or decluttering",
    avgPrice: "$10/day",
    lenders: 35
  },
  {
    id: "office",
    name: "Office Furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=400&h=300",
    count: 36,
    trending: true,
    special: null,
    description: "Equip your temporary workspace or home office",
    avgPrice: "$18/day",
    lenders: 21
  },
];

const CategoryCard = ({ category, isSaved, onSaveToggle, isHovered, onHover, onLeave }) => {
  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card 
        className={`overflow-hidden border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer h-full ${
          isHovered ? "ring-2 ring-primary/50" : ""
        }`}
        onClick={() => onHover && !isHovered && onHover()}
      >
        <div className="aspect-square relative overflow-hidden">
          {/* Main image with zoom effect */}
          <motion.img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Gradient overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>
          
          {/* Top badges */}
          <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start pointer-events-none">
            <AnimatePresence>
              {category.special && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="pointer-events-auto"
                >
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 px-2 py-1 flex items-center gap-1">
                    <Sparkles size={12} />
                    {category.special}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {category.trending && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="pointer-events-auto"
                >
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-2 py-1 flex items-center gap-1">
                    <TrendingUp size={12} />
                    Popular
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Bottom controls */}
          <div className="absolute inset-x-0 bottom-0 p-3 flex justify-between items-center">
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-snaplend-800">
              {category.count} available
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onSaveToggle(category.id);
              }}
              className={`p-2 rounded-full ${
                isSaved
                  ? "bg-primary shadow-lg shadow-primary/20" 
                  : "bg-white/90 text-snaplend-700 hover:bg-white"
              } backdrop-blur-sm transition-all duration-300`}
            >
              <Heart size={16} className={isSaved ? "fill-white text-white" : ""} />
            </motion.button>
          </div>
          
          {/* View details button that appears on hover */}
          <motion.div 
            className="absolute inset-x-0 bottom-0 p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              variant="default" 
              size="sm" 
              className="w-full bg-white/90 backdrop-blur-sm text-primary hover:bg-white hover:text-primary border-0 font-medium"
            >
              View Details
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </motion.div>
        </div>
        
        <CardContent className="p-4 bg-white">
          {/* Category title and description */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <Layers className="text-primary" size={14} />
              </div>
              <h3 className="font-bold text-snaplend-900 text-lg truncate">{category.name}</h3>
            </div>
            <p className="text-sm text-snaplend-600 line-clamp-2 min-h-[40px]">{category.description}</p>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg mb-3">
            <div className="flex flex-col">
              <span className="text-xs text-snaplend-500 mb-1">Average Price</span>
              <span className="text-lg font-bold text-primary">{category.avgPrice}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-snaplend-500 mb-1">Lenders</span>
              <span className="text-lg font-bold text-snaplend-900">{category.lenders}</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              <Clock size={12} className="mr-1" /> Flexible dates
            </span>
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              <ShieldCheck size={12} className="mr-1" /> Quality assured
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FurnitureSection = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSaveToggle = (categoryId) => {
    setSavedItems(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };
  
  const navigateToCategory = (categoryId) => {
    navigate(`/browse/furniture/${categoryId}`);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        {/* Animated Header */}
        <motion.div 
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <motion.div 
                className="flex items-center gap-3 mb-3"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sofa className="text-primary" size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Furniture
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-lg text-snaplend-600 max-w-2xl leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Find premium furniture for any occasion — from home setups to event spaces. 
                Rent quality pieces with no long-term commitment.
              </motion.p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Button 
                onClick={() => navigate('/browse/furniture')}
                size="lg"
                className="font-medium text-md gap-2 px-6 group relative overflow-hidden"
              >
                Browse All Furniture
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </motion.div>
          </div>
          
          {/* Stats bar */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">300+ Lenders</h3>
                <p className="text-sm text-snaplend-600">Verified and trusted local furniture providers</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg text-green-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Quality Guaranteed</h3>
                <p className="text-sm text-snaplend-600">All items inspected and maintained to high standards</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Flexible Rental Terms</h3>
                <p className="text-sm text-snaplend-600">Daily, weekly, or monthly options available</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Featured Categories Grid */}
        <div className="relative">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {furnitureCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants} onClick={() => navigateToCategory(category.id)}>
                <CategoryCard 
                  category={category}
                  isSaved={savedItems.includes(category.id)}
                  onSaveToggle={handleSaveToggle}
                  isHovered={hoveredCard === category.id}
                  onHover={() => setHoveredCard(category.id)}
                  onLeave={() => setHoveredCard(null)}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Decorative design element */}
          <div className="absolute top-1/4 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-1/4 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        </div>
        
        {/* CTA Banner */}
        <motion.div 
          className="mt-16 rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-8 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Become a Furniture Lender</h3>
              <p className="text-white/80 max-w-xl">
                Have quality furniture sitting unused? Start earning by renting it out to verified users in your community.
              </p>
            </div>
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 whitespace-nowrap"
              onClick={() => navigate('/become-lender')}
            >
              Start Lending
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FurnitureSection;