import { Container } from "@/components/ui/container";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, ArrowRight, Clock, MapPin, Gift, Heart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  
  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('animated-footer');
      if (footer) {
        const position = footer.getBoundingClientRect();
        if (position.top < window.innerHeight) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Hover animation for social icons
  const socialIconClasses = "text-peerly-400 hover:text-peerly-900 transform hover:scale-125 transition-all duration-300 ease-in-out";
  
  // Animation classes for staggered entrance
  const getAnimationClass = (index) => {
    return isVisible ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-${index * 100}` : "opacity-0 translate-y-8";
  };
  
  return (
    <footer id="animated-footer" className="bg-gradient-to-b from-white to-peerly-50 border-t border-peerly-100 overflow-hidden">
      <div className="absolute right-0 left-0 h-1 bg-gradient-to-r from-peerly-300 via-peerly-500 to-peerly-300"></div>
      
      <Container>
        <div className="py-16 md:py-20">
          {/* Wave pattern SVG */}
          <div className="absolute left-0 right-0 opacity-10 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" className="text-peerly-400"></path>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {/* Brand column with animation */}
            <div className={`lg:col-span-2 ${getAnimationClass(0)}`}>
              <Link to="/" className="group text-2xl font-display font-semibold text-peerly-900 inline-flex items-center">
                <span className="relative overflow-hidden">
                  <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full">peerly</span>
                  <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 text-peerly-600">peerly</span>
                </span>
              </Link>
              <p className="mt-4 text-peerly-600 max-w-md hover:text-peerly-800 transition-colors duration-300">
                Connecting people who need things with those who have them. Rent with confidence in your community.
              </p>
              
              <div className="flex space-x-5 mt-8">
                <a href="#" className={socialIconClasses}>
                  <div className="bg-peerly-50 hover:bg-peerly-100 p-3 rounded-full">
                    <Facebook size={20} />
                  </div>
                </a>
                <a href="#" className={socialIconClasses}>
                  <div className="bg-peerly-50 hover:bg-peerly-100 p-3 rounded-full">
                    <Instagram size={20} />
                  </div>
                </a>
                <a href="#" className={socialIconClasses}>
                  <div className="bg-peerly-50 hover:bg-peerly-100 p-3 rounded-full">
                    <Twitter size={20} />
                  </div>
                </a>
                <a href="#" className={socialIconClasses}>
                  <div className="bg-peerly-50 hover:bg-peerly-100 p-3 rounded-full">
                    <Linkedin size={20} />
                  </div>
                </a>
              </div>
              
              {/* Newsletter signup animation */}
              <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border border-peerly-100 transition-all duration-300 hover:shadow-md">
                <h4 className="text-peerly-900 font-medium mb-2">Subscribe to our newsletter</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-grow px-4 py-2 border border-peerly-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-peerly-500"
                  />
                  <button className="bg-peerly-600 hover:bg-peerly-700 text-white px-4 rounded-r-lg transition-colors duration-300 flex items-center">
                    <span>Subscribe</span>
                    <ArrowRight size={16} className="ml-2 animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Links columns with animations */}
            <div className={getAnimationClass(1)}>
              <h3 className="text-peerly-900 font-medium mb-4 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-peerly-300 after:left-0 after:bottom-0">Platform</h3>
              <ul className="space-y-3">
                {["Browse Items", "List an Item", "How It Works", "Pricing"].map((item, index) => (
                  <li key={index} className="transform hover:-translate-x-1 transition-transform duration-300">
                    <Link 
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-peerly-600 hover:text-peerly-900 transition-colors flex items-center group"
                    >
                      <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={getAnimationClass(2)}>
              <h3 className="text-peerly-900 font-medium mb-4 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-peerly-300 after:left-0 after:bottom-0">Support</h3>
              <ul className="space-y-3">
                {[
                  { name: "Help Center", icon: <Gift size={14} className="mr-2" /> },
                  { name: "Safety Center", icon: <Shield size={14} className="mr-2" /> },
                  { name: "FAQ", icon: <Clock size={14} className="mr-2" /> },
                  { name: "Contact Us", icon: <Users size={14} className="mr-2" /> }
                ].map((item, index) => (
                  <li key={index} className="transform hover:-translate-x-1 transition-transform duration-300">
                    <Link 
                      to={`/${item.name.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-peerly-600 hover:text-peerly-900 transition-colors flex items-center"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={getAnimationClass(3)}>
              <h3 className="text-peerly-900 font-medium mb-4 relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-0.5 after:bg-peerly-300 after:left-0 after:bottom-0">Legal</h3>
              <ul className="space-y-3">
                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Trust & Safety"].map((item, index) => (
                  <li key={index} className="transform hover:-translate-x-1 transition-transform duration-300">
                    <Link 
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="text-peerly-600 hover:text-peerly-900 transition-colors flex items-center group"
                    >
                      <span className="relative overflow-hidden inline-block w-full">
                        <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-2">{item}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Stats counter section - animated */}
          <div className={`mt-16 mb-10 grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-6 bg-white rounded-2xl shadow-sm border border-peerly-100 ${getAnimationClass(4)}`}>
            {[
              { label: "Active Users", value: "50,000+", icon: <Users className="text-peerly-500 mb-3" size={28} /> },
              { label: "Items Shared", value: "120,000+", icon: <Gift className="text-peerly-500 mb-3" size={28} /> },
              { label: "Communities", value: "1,200+", icon: <MapPin className="text-peerly-500 mb-3" size={28} /> }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 hover:bg-peerly-50 rounded-xl transition-colors duration-300">
                {stat.icon}
                <div className="text-2xl font-bold text-peerly-900">{stat.value}</div>
                <div className="text-peerly-600">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Bottom section with animation */}
          <div className={`mt-12 pt-8 border-t border-peerly-100 flex flex-col md:flex-row justify-between items-center ${getAnimationClass(5)}`}>
            <div className="text-peerly-500 text-sm group">
              © {currentYear} Peerly. All rights reserved. 
              <span className="inline-block ml-2 relative">
                <Heart size={14} className="inline text-peerly-400 group-hover:text-red-500 group-hover:animate-ping transition-colors duration-300" />
              </span>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
              <a href="mailto:contact@peerly.com" className="text-peerly-500 hover:text-peerly-900 flex items-center transition-all duration-300 text-sm group hover:-translate-y-1">
                <div className="bg-peerly-50 p-2 rounded-full mr-2 group-hover:bg-peerly-100 transition-colors duration-300">
                  <Mail size={16} />
                </div>
                contact@peerly.com
              </a>
              <a href="tel:+918045678900" className="text-peerly-500 hover:text-peerly-900 flex items-center transition-all duration-300 text-sm group hover:-translate-y-1">
                <div className="bg-peerly-50 p-2 rounded-full mr-2 group-hover:bg-peerly-100 transition-colors duration-300">
                  <Phone size={16} />
                </div>
                +91 8045678900
              </a>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Floating back to top button with animation */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-peerly-600 text-white p-3 rounded-full shadow-lg hover:bg-peerly-700 transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100 z-50"
      >
        <ArrowRight size={20} className="transform rotate-270" />
      </button>
    </footer>
  );
};

export default Footer;