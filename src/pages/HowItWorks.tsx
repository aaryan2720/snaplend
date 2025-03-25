
import React from "react";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clipboard, ArrowDown, MapPin, Calendar, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StepCard = ({ number, title, description, icon }) => (
  <Card className="relative">
    <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-snaplend-600 text-white flex items-center justify-center font-semibold">
      {number}
    </div>
    <CardContent className="pt-8 pb-6 px-6">
      <div className="flex items-start">
        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-snaplend-600">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex">
    <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-snaplend-600">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How SnapLend Works</h1>
          <p className="text-xl text-snaplend-600 max-w-2xl mx-auto">
            SnapLend makes it easy to rent items from people in your community.
            Here's how it works:
          </p>
        </div>

        <div className="space-y-12 mb-16">
          <div className="relative space-y-8">
            <StepCard
              number={1}
              title="Find the perfect item"
              description="Browse thousands of items available for rent in your area. Filter by category, price, and location to find exactly what you need."
              icon={<MapPin className="h-6 w-6 text-primary" />}
            />
            
            <div className="flex justify-center">
              <ArrowDown className="h-8 w-8 text-snaplend-300" />
            </div>
            
            <StepCard
              number={2}
              title="Book your rental dates"
              description="Select the dates you need the item for. You can see availability in real-time and request to book directly through the platform."
              icon={<Calendar className="h-6 w-6 text-primary" />}
            />
            
            <div className="flex justify-center">
              <ArrowDown className="h-8 w-8 text-snaplend-300" />
            </div>
            
            <StepCard
              number={3}
              title="Pay securely"
              description="Make a secure payment through our platform. Your payment is held safely until you confirm that you've received the item."
              icon={<CreditCard className="h-6 w-6 text-primary" />}
            />
            
            <div className="flex justify-center">
              <ArrowDown className="h-8 w-8 text-snaplend-300" />
            </div>
            
            <StepCard
              number={4}
              title="Pick up & enjoy"
              description="Meet the owner to pick up the item or arrange for delivery. Now you can enjoy using it for your rental period!"
              icon={<CheckCircle className="h-6 w-6 text-primary" />}
            />
            
            <div className="flex justify-center">
              <ArrowDown className="h-8 w-8 text-snaplend-300" />
            </div>
            
            <StepCard
              number={5}
              title="Return & review"
              description="Return the item in good condition at the end of your rental period. Leave a review about your experience to help the community."
              icon={<Clipboard className="h-6 w-6 text-primary" />}
            />
          </div>
        </div>

        <Separator className="my-16" />

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose SnapLend?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureItem
              icon={<ShieldCheck className="h-6 w-6 text-primary" />}
              title="Trust & Safety"
              description="Our verification process ensures all users are trustworthy. Rentals are protected by our Trust Agreement and insurance options."
            />
            
            <FeatureItem
              icon={<CreditCard className="h-6 w-6 text-primary" />}
              title="Secure Payments"
              description="All transactions happen through our secure platform. Payment is only released to the owner after you've received the item."
            />
            
            <FeatureItem
              icon={<Calendar className="h-6 w-6 text-primary" />}
              title="Flexible Rentals"
              description="Rent items for as little as a few hours or as long as several months. You decide what works for your needs."
            />
            
            <FeatureItem
              icon={<MapPin className="h-6 w-6 text-primary" />}
              title="Local Community"
              description="Connect with people in your neighborhood. Support the local economy and reduce environmental impact by sharing resources."
            />
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to start renting?</h2>
          <p className="text-snaplend-600 mb-6 max-w-lg mx-auto">
            Join thousands of people who are already saving money and resources by renting instead of buying.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/explore">
                Browse Items <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/create-listing">
                List Your Items
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;
