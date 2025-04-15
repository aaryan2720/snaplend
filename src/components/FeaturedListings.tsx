
import { ListingProps } from "@/components/ListingCard";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { fetchFeaturedListings } from "@/services/listingService";
import { motion } from "framer-motion";
import {
  Award,
  ChevronRight,
  Heart,
  Loader2,
  MapPin,
  Share2,
  Star,
  TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Enhanced listing card component with animations and improved design
const EnhancedListingCard = ({ listing, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Staggered animation for card elements
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Featured badge */}
      {listing.featured && (
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge className="px-3 py-1 bg-amber-500 text-white font-medium rounded-full flex items-center gap-1">
              <Award size={14} />
              <span>Featured</span>
            </Badge>
          </motion.div>
        </div>
      )}

      {/* Image container with overlay */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 z-10 opacity-50 group-hover:opacity-70 transition-opacity"
          whileHover={{ opacity: 0.7 }}
        />
        <motion.img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-700"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        />
        
        {/* Actions overlay */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <motion.button
            className={`p-2 rounded-full ${isSaved ? 'bg-primary text-white' : 'bg-white/90 text-gray-700'} shadow-md hover:bg-primary hover:text-white transition-colors`}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Heart size={18} className={isSaved ? "fill-white" : ""} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-white/90 text-gray-700 shadow-md hover:bg-primary hover:text-white transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={18} />
          </motion.button>
        </div>
        
        {/* Price tag */}
        <div className="absolute bottom-4 left-4 z-10">
          <motion.div 
            className="px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-bold text-primary text-lg">₹{listing.price}</span>
            <span className="text-gray-600 text-sm">/{listing.priceUnit}</span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div 
        className="p-5"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h3 className="font-display font-semibold text-xl text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-2">
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <MapPin size={16} className="text-primary" />
            <span className="text-gray-600 text-sm">{listing.location}</span>
          </div>
          <div className="text-gray-500 text-sm font-medium">
            {listing.distance}
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <img 
              src={listing.owner.avatar} 
              alt={listing.owner.name}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm" 
            />
            <span className="text-sm font-medium text-gray-700">{listing.owner.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="font-medium text-gray-800">{listing.rating}</span>
            <span className="text-xs text-gray-500">({listing.reviewCount})</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
};

// Enhanced FeaturedListings component
const FeaturedListings = () => {
  const [featuredListings, setFeaturedListings] = useState<ListingProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  
  useEffect(() => {
    const loadFeaturedListings = async () => {
      setLoading(true);
      try {
        const listings = await fetchFeaturedListings();
        setFeaturedListings(listings);
      } catch (error) {
        console.error("Error loading featured listings:", error);
        setFeaturedListings([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedListings();
  }, []);
  
  // Animation variants for section elements
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-snaplend-50/90 to-white">
        <Container>
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-600">Loading featured listings...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (featuredListings.length === 0) {
    return (
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-snaplend-50/90 to-white">
        <Container>
          <motion.div
            className="max-w-5xl mx-auto text-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="mb-16"
              variants={headerVariants}
            >
              <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-medium inline-flex items-center gap-1">
                <TrendingUp size={14} className="text-primary" />
                <span>Top Listings</span>
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                  Featured
                </span>{" "}
                rentals
              </h2>
              
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                No featured listings available yet. Be the first to create a listing!
              </p>
              
              <Link to="/create-listing">
                <motion.button
                  className="mt-8 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Listing
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-snaplend-50/90 to-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-purple-500/80 to-pink-500/80" />
      
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-20 -right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl" />
      
      <Container className="relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="text-center mb-16"
            variants={headerVariants}
          >
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-medium inline-flex items-center gap-1">
              <TrendingUp size={14} className="text-primary" />
              <span>Top Listings</span>
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                Featured
              </span>{" "}
              rentals
            </h2>
            
            <motion.p 
              className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover our most popular and highly-rated rental items from trusted owners
            </motion.p>
          </motion.div>
          
          {/* Category filters */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
            variants={headerVariants}
          >
            {["All", "Electronics", "Furniture", "Vehicles", "Events"].map((category) => (
              <motion.button
                key={category}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                  activeTab === category
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Listings grid with responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredListings.map((listing, index) => (
            <Link key={listing.id} to={`/item/${listing.id}`}>
              <EnhancedListingCard 
                listing={listing}
                index={index}
              />
            </Link>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/explore">
            <motion.button
              className="group px-8 py-3.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-medium flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View all listings</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <p className="mt-4 text-sm text-gray-500">
            Explore available high-quality items for rent
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturedListings;
