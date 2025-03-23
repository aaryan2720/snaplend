
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryList from "@/components/CategoryList";
import FeaturedListings from "@/components/FeaturedListings";
import Footer from "@/components/Footer";
import { Check, Shield, Star, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Find what you need",
      description: "Browse thousands of items available for rent in your area."
    },
    {
      number: 2,
      title: "Book & pay securely",
      description: "Choose your rental dates and pay through our secure platform."
    },
    {
      number: 3,
      title: "Pickup or delivery",
      description: "Coordinate with the owner to get your rental item."
    },
    {
      number: 4,
      title: "Return & review",
      description: "Return the item and share your experience to help others."
    }
  ];
  
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-peerly-900">
            How it works
          </h2>
          <p className="mt-4 text-lg text-peerly-600 max-w-2xl mx-auto">
            Renting has never been easier or more secure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative animate-fade-up" style={{ animationDelay: `${0.1 * index}s` }}>
              <div className="glass-card p-6 rounded-xl h-full flex flex-col">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-semibold">{step.number}</span>
                </div>
                <h3 className="text-xl font-medium text-peerly-900 mb-3">{step.title}</h3>
                <p className="text-peerly-600 flex-grow">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-peerly-300">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Transactions",
      description: "Our escrow system ensures your money is protected until you're satisfied with your rental."
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      title: "Verified Users",
      description: "All users are verified to ensure a trustworthy rental experience."
    },
    {
      icon: <Check className="w-6 h-6 text-primary" />,
      title: "Quality Assurance",
      description: "Items are reviewed and held to high standards before being listed."
    }
  ];
  
  return (
    <section className="section-padding">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-xl flex flex-col items-center text-center animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="mb-5 p-3 bg-primary/10 rounded-full">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-medium text-peerly-900 mb-3">{benefit.title}</h3>
              <p className="text-peerly-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="section-padding bg-primary/5">
      <Container>
        <div className="bg-white rounded-2xl p-8 md:p-12 glass-card shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-peerly-900">
                Have something to rent?
              </h2>
              <p className="mt-4 text-lg text-peerly-600">
                Turn your idle items into income. Listing on Peerly is free and takes just a few minutes. Join thousands of owners already earning with their items.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <p className="ml-3 text-peerly-700">List your items for free in minutes</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <p className="ml-3 text-peerly-700">Set your own rental prices and availability</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <p className="ml-3 text-peerly-700">Secure payments directly to your account</p>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium focus-ring shadow-sm">
                  Start listing your items
                </button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600"
                alt="Person listing items for rent"
                className="w-full h-auto rounded-xl shadow-sm"
              />
              <div className="absolute -bottom-6 -right-6 p-4 bg-white rounded-lg shadow-md glass-card hidden md:block">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/150?img=45" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-peerly-900">1,200+ owners</p>
                    <p className="text-xs text-peerly-500">already earning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CategoryList />
        <HowItWorks />
        <FeaturedListings />
        <Benefits />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
