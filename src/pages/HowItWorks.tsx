
import React from "react";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Truck, CreditCard, UserCheck, Search, HeartHandshake, Shield, MessageSquare } from "lucide-react";

const HowItWorks = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const steps = [
    {
      icon: Search,
      title: "Find What You Need",
      description: "Browse thousands of items available for rent near you. Filter by category, price, and location."
    },
    {
      icon: HeartHandshake,
      title: "Reserve & Connect",
      description: "Book your desired item for your specified dates and connect with the owner to arrange details."
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Make a secure payment through our platform. We hold the payment until you confirm everything is good."
    },
    {
      icon: Package,
      title: "Pick Up or Delivery",
      description: "Get your rented item through pickup or delivery based on what you've arranged with the owner."
    },
    {
      icon: Truck,
      title: "Enjoy & Return",
      description: "Use the item during your rental period and return it in the same condition when you're done."
    },
    {
      icon: UserCheck,
      title: "Share Your Experience",
      description: "Rate your experience and leave feedback for the owner to help build our community."
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Our platform ensures all payments and rentals are protected and secure."
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Chat directly with item owners to clarify any questions before booking."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment Options",
      description: "Pay securely using multiple payment methods that work for you."
    }
  ];

  return (
    <Container className="py-16 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl font-bold text-snaplend-900 mb-4">How SnapLend Works</h1>
        <p className="text-lg text-snaplend-600 mb-8">
          SnapLend makes it easy to rent items you need without the commitment of buying, 
          and helps you earn money from things you own but don't use every day.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/explore">Start Browsing</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/create-listing">List Your Items</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        {steps.map((step, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-snaplend-600">{step.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-snaplend-50 rounded-xl p-8 mb-16"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-snaplend-900 mb-4">Why Choose SnapLend?</h2>
          <p className="text-snaplend-600 max-w-2xl mx-auto">
            Our platform is designed to make renting and lending safe, simple, and beneficial for everyone involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
                  <benefit.icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-snaplend-600">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-snaplend-900 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-snaplend-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already saving money and earning extra income through SnapLend.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/signup">Create an Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/explore">Explore Available Items</Link>
          </Button>
        </div>
      </motion.div>
    </Container>
  );
};

export default HowItWorks;
