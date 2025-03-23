
import { Container } from "@/components/ui/container";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-peerly-100">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link to="/" className="text-2xl font-display font-semibold text-peerly-900">
                peerly
              </Link>
              <p className="mt-4 text-peerly-600 max-w-md">
                Connecting people who need things with those who have them. Rent with confidence in your community.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-peerly-400 hover:text-peerly-900 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-peerly-400 hover:text-peerly-900 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-peerly-400 hover:text-peerly-900 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-peerly-400 hover:text-peerly-900 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            {/* Links columns */}
            <div>
              <h3 className="text-peerly-900 font-medium mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><Link to="/browse" className="text-peerly-600 hover:text-peerly-900 transition-colors">Browse Items</Link></li>
                <li><Link to="/create-listing" className="text-peerly-600 hover:text-peerly-900 transition-colors">List an Item</Link></li>
                <li><Link to="/how-it-works" className="text-peerly-600 hover:text-peerly-900 transition-colors">How It Works</Link></li>
                <li><Link to="/pricing" className="text-peerly-600 hover:text-peerly-900 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-peerly-900 font-medium mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link to="/help" className="text-peerly-600 hover:text-peerly-900 transition-colors">Help Center</Link></li>
                <li><Link to="/safety" className="text-peerly-600 hover:text-peerly-900 transition-colors">Safety Center</Link></li>
                <li><Link to="/faq" className="text-peerly-600 hover:text-peerly-900 transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="text-peerly-600 hover:text-peerly-900 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-peerly-900 font-medium mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-peerly-600 hover:text-peerly-900 transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-peerly-600 hover:text-peerly-900 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-peerly-600 hover:text-peerly-900 transition-colors">Cookie Policy</Link></li>
                <li><Link to="/trust" className="text-peerly-600 hover:text-peerly-900 transition-colors">Trust & Safety</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-peerly-100 flex flex-col md:flex-row justify-between items-center">
            <div className="text-peerly-500 text-sm">
              © {new Date().getFullYear()} Peerly. All rights reserved.
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <a href="mailto:contact@peerly.com" className="text-peerly-500 hover:text-peerly-900 flex items-center transition-colors text-sm">
                <Mail size={16} className="mr-2" />
                contact@peerly.com
              </a>
              <a href="tel:+918045678900" className="text-peerly-500 hover:text-peerly-900 flex items-center transition-colors text-sm">
                <Phone size={16} className="mr-2" />
                +91 8045678900
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
