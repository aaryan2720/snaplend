import { Container } from "@/components/ui/container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShoppingBag, Zap, Search, Heart } from "lucide-react";

// Enhanced categories with icons and additional properties
const categories = [
  {
    id: "furniture",
    name: "Furniture",
    description: "Tables, chairs, sofas, and more",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400&h=300",
    popularTags: ["Modern", "Vintage", "Office"],
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: "🪑",
    count: 243,
    rating: 4.8,
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Cameras, drones, and gadgets",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&q=80&w=400&h=300",
    popularTags: ["Gadgets", "Audio", "Smart"],
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: "📱",
    count: 182,
    rating: 4.9,
  },
  {
    id: "vehicles",
    name: "Vehicles",
    description: "Cars, bikes, and scooters",
    image: "https://images.unsplash.com/photo-1552642762-f55d06580015?auto=format&fit=crop&q=80&w=400&h=300",
    popularTags: ["Cars", "Bikes", "Luxury"],
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    icon: "🚗",
    count: 97,
    rating: 4.7,
  },
  {
    id: "tools",
    name: "Tools",
    description: "Power tools and equipment",
    image: "https://images.unsplash.com/photo-1581147036324-c47a03b8f120?auto=format&fit=crop&q=80&w=400&h=300",
    popularTags: ["Power", "DIY", "Garden"],
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    icon: "🔧",
    count: 156,
    rating: 4.6,
  },
];

const CategoryList = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 300, 
        damping: 24 
      }
    }
  };
  
  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-peerly-100 text-peerly-700 text-sm font-medium tracking-wide mb-4 uppercase text-xs font-semibold">
            Explore Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-peerly-900 leading-tight tracking-tight mb-4">
            Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-peerly-700 to-peerly-500">category</span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-lg md:text-xl text-peerly-600 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Find exactly what you need from our curated selection of premium rental items
          </motion.p>
          
          <div className="flex flex-wrap items-center justify-center mt-8 gap-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="flex items-center gap-2 text-peerly-700 px-3 py-2 bg-white rounded-full shadow-sm"
            >
              <Zap size={16} className="text-peerly-500" />
              <span className="text-sm font-medium">Fast delivery</span>
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex items-center gap-2 text-peerly-700 px-3 py-2 bg-white rounded-full shadow-sm"
            >
              <ShoppingBag size={16} className="text-peerly-500" />
              <span className="text-sm font-medium">Quality products</span>
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="flex items-center gap-2 text-peerly-700 px-3 py-2 bg-white rounded-full shadow-sm"
            >
              <Search size={16} className="text-peerly-500" />
              <span className="text-sm font-medium">Easy search</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              variants={cardHoverVariants}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(`/browse/${category.id}`)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
            >
              {/* Favorite button */}
              <motion.button 
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={16} className="transition-transform group-hover:scale-110 duration-300" />
              </motion.button>
              
              <div className="relative h-56 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"
                  initial={{ opacity: 0.4 }}
                  animate={{ 
                    opacity: hoveredId === category.id ? 0.6 : 0.4 
                  }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                
                <motion.img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center"
                  animate={{
                    scale: hoveredId === category.id ? 1.08 : 1
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
                
                {/* Category icon badge */}
                <div className={`absolute top-4 left-4 z-10 ${category.iconBg} ${category.iconColor} w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md`}>
                  <span>{category.icon}</span>
                </div>
                
                {/* Name overlay on image */}
                <div className="absolute bottom-4 left-4 z-10">
                  <h3 className="text-white text-2xl font-display font-bold tracking-tight drop-shadow-md">
                    {category.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-white text-sm font-medium">{category.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-5">
                {/* Popular tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.popularTags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-peerly-600 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-medium text-peerly-700 bg-peerly-50 px-2.5 py-1 rounded-full">
                    {category.count} items
                  </span>
                  
                  <motion.div 
                    className="flex items-center text-peerly-700 text-sm font-semibold"
                    animate={{
                      x: hoveredId === category.id ? 5 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Browse now</span>
                    <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1 duration-300" />
                  </motion.div>
                </div>
              </div>
              
              {/* Animated bottom border */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${
                    category.id === "furniture" ? "#F59E0B" : 
                    category.id === "electronics" ? "#3B82F6" : 
                    category.id === "vehicles" ? "#EF4444" : 
                    "#10B981"
                  }, ${
                    category.id === "furniture" ? "#F97316" : 
                    category.id === "electronics" ? "#1D4ED8" : 
                    category.id === "vehicles" ? "#DC2626" : 
                    "#059669"
                  })` 
                }}
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: hoveredId === category.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => navigate('/browse')}
            className="group relative inline-flex items-center px-8 py-4 bg-peerly-900 text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-peerly-800 hover:pr-12 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-peerly-700 focus:ring-offset-2"
          >
            <span className="relative z-10 text-base font-medium tracking-wide">
              View all categories
            </span>
            <span className="absolute z-20 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-peerly-900 via-peerly-700 to-peerly-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
          
          <p className="mt-6 text-sm text-peerly-500 font-medium flex items-center justify-center gap-1">
            <span className="h-1 w-1 rounded-full bg-peerly-300"></span>
            Over 678 total items available for rent
            <span className="h-1 w-1 rounded-full bg-peerly-300"></span>
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default CategoryList;