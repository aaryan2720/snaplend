
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  Mail,
  Phone,
  MapPin,
  Star,
  Calendar,
  PlusCircle,
  Heart,
  ShoppingBag,
  MessageSquare,
  CreditCard,
  Shield,
  Upload,
  Edit
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListingCard, { ListingProps } from "@/components/ListingCard";

// Sample user listings
const userListings: ListingProps[] = [
  {
    id: "ul1",
    title: "Professional DSLR Camera Kit",
    description: "Canon EOS 5D Mark IV with multiple lenses, perfect for photography enthusiasts or events.",
    price: 1200,
    priceUnit: "day",
    location: "Indiranagar, Bangalore",
    distance: "2.5 km",
    rating: 4.9,
    reviewCount: 47,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Priya S.",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 4.9,
    },
  },
  {
    id: "ul2",
    title: "Electric Scooter",
    description: "Eco-friendly urban mobility solution, perfect for commuting around the city.",
    price: 300,
    priceUnit: "day",
    location: "HSR Layout, Bangalore",
    distance: "5.2 km",
    rating: 4.6,
    reviewCount: 19,
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Arjun K.",
      avatar: "https://i.pravatar.cc/150?img=59",
      rating: 4.7,
    },
  },
];

// Sample bookings
const userBookings = [
  {
    id: "b1",
    listing: {
      id: "l1",
      title: "Minimalist Wooden Desk",
      image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=600&h=400",
      price: 500,
      priceUnit: "week",
    },
    owner: {
      name: "Rahul M.",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    startDate: "2023-11-10",
    endDate: "2023-11-17",
    status: "active",
    totalPrice: 3500,
  },
  {
    id: "b2",
    listing: {
      id: "l2",
      title: "DJI Mavic Air 2 Drone",
      image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=600&h=400",
      price: 950,
      priceUnit: "day",
    },
    owner: {
      name: "Varun K.",
      avatar: "https://i.pravatar.cc/150?img=53",
    },
    startDate: "2023-12-05",
    endDate: "2023-12-07",
    status: "upcoming",
    totalPrice: 2850,
  },
  {
    id: "b3",
    listing: {
      id: "l3",
      title: "Party & Event Sound System",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600&h=400",
      price: 1500,
      priceUnit: "day",
    },
    owner: {
      name: "Neha T.",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    startDate: "2023-10-15",
    endDate: "2023-10-16",
    status: "completed",
    totalPrice: 3000,
  },
];

// Sample saved items
const savedItems: ListingProps[] = [
  {
    id: "si1",
    title: "Mountain Bike - Premium Trek Model",
    description: "High-quality mountain bike perfect for weekend adventures, well-maintained with front suspension.",
    price: 600,
    priceUnit: "week",
    location: "Jayanagar, Bangalore",
    distance: "3.7 km",
    rating: 4.8,
    reviewCount: 32,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Vikram S.",
      avatar: "https://i.pravatar.cc/150?img=33",
      rating: 4.9,
    },
  },
  {
    id: "si2",
    title: "MacBook Pro 16-inch",
    description: "Latest model MacBook Pro with M1 Pro chip, perfect for remote work or video editing.",
    price: 800,
    priceUnit: "day",
    location: "Koramangala, Bangalore",
    distance: "3.7 km",
    rating: 4.9,
    reviewCount: 29,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600&h=400",
    owner: {
      name: "Rishi M.",
      avatar: "https://i.pravatar.cc/150?img=42",
      rating: 4.8,
    },
  },
];

const UserProfile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("listings");
  
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24">
          <Container>
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium text-peerly-900 mb-4">Please sign in to view your profile</h2>
              <Button onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Profile card */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-peerly-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                          {profile.avatar_url ? (
                            <img 
                              src={profile.avatar_url} 
                              alt={profile.full_name || user.email || "User"} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={36} className="text-peerly-400" />
                          )}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-peerly-200 hover:bg-peerly-50 transition-colors">
                          <Edit size={14} className="text-peerly-600" />
                        </button>
                      </div>
                      
                      <h2 className="text-xl font-semibold text-peerly-900 mt-4">{profile.full_name || "User"}</h2>
                      <p className="text-peerly-500 text-sm">{user.email}</p>
                      
                      <div className="flex items-center mt-2 space-x-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star 
                            key={index} 
                            size={16} 
                            className={index < 4 ? "text-yellow-400 fill-yellow-400" : "text-peerly-300"}
                          />
                        ))}
                        <span className="ml-1 text-sm font-medium text-peerly-700">4.0</span>
                      </div>
                      
                      <div className="flex items-center mt-2 text-sm text-peerly-500">
                        <Calendar size={14} className="mr-1" />
                        Member since June 2023
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="mt-4 w-full"
                        onClick={() => navigate('/settings')}
                      >
                        <Settings size={16} className="mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Contact info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center">
                      <Mail size={16} className="text-peerly-500 mr-2" />
                      <span className="text-sm text-peerly-700">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-peerly-500 mr-2" />
                      <span className="text-sm text-peerly-700">+91 98765 43210</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin size={16} className="text-peerly-500 mr-2 mt-0.5" />
                      <span className="text-sm text-peerly-700">Indiranagar, Bangalore, Karnataka, India</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Verification */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Verification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail size={16} className="text-green-500 mr-2" />
                        <span className="text-sm text-peerly-700">Email</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Phone size={16} className="text-green-500 mr-2" />
                        <span className="text-sm text-peerly-700">Phone</span>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield size={16} className="text-peerly-500 mr-2" />
                        <span className="text-sm text-peerly-700">ID Verification</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
                        Verify
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard size={16} className="text-peerly-500 mr-2" />
                        <span className="text-sm text-peerly-700">Payment Method</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1 h-auto">
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Right content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="listings" className="flex items-center">
                    <ShoppingBag size={16} className="mr-2" />
                    My Listings
                  </TabsTrigger>
                  <TabsTrigger value="bookings" className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    My Bookings
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center">
                    <Heart size={16} className="mr-2" />
                    Saved Items
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex items-center">
                    <MessageSquare size={16} className="mr-2" />
                    Messages
                  </TabsTrigger>
                </TabsList>
                
                {/* My Listings */}
                <TabsContent value="listings" className="mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-peerly-900">My Listings</h2>
                    <Button onClick={() => navigate('/create-listing')}>
                      <PlusCircle size={16} className="mr-2" />
                      List an Item
                    </Button>
                  </div>
                  
                  {userListings.length === 0 ? (
                    <div className="text-center py-12 bg-peerly-50 rounded-xl">
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-peerly-100 rounded-full">
                        <ShoppingBag size={24} className="text-peerly-400" />
                      </div>
                      <h3 className="text-lg font-medium text-peerly-900 mb-2">No listings yet</h3>
                      <p className="text-peerly-600 mb-6 max-w-md mx-auto">
                        You haven't listed any items for rent yet. Start earning by renting out items you don't use every day.
                      </p>
                      <Button onClick={() => navigate('/create-listing')}>
                        List an Item
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                {/* My Bookings */}
                <TabsContent value="bookings" className="mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-peerly-900">My Bookings</h2>
                    <Button variant="outline" onClick={() => navigate('/explore')}>
                      Find Items to Rent
                    </Button>
                  </div>
                  
                  {userBookings.length === 0 ? (
                    <div className="text-center py-12 bg-peerly-50 rounded-xl">
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-peerly-100 rounded-full">
                        <Calendar size={24} className="text-peerly-400" />
                      </div>
                      <h3 className="text-lg font-medium text-peerly-900 mb-2">No bookings yet</h3>
                      <p className="text-peerly-600 mb-6 max-w-md mx-auto">
                        You haven't rented any items yet. Browse our marketplace to find items to rent.
                      </p>
                      <Button onClick={() => navigate('/explore')}>
                        Explore Rentals
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userBookings.map(booking => (
                        <Card key={booking.id} className={cn(
                          "overflow-hidden",
                          booking.status === "active" && "border-green-200 bg-green-50/50",
                          booking.status === "upcoming" && "border-blue-200 bg-blue-50/50",
                        )}>
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-48 h-40 md:h-auto">
                              <img 
                                src={booking.listing.image} 
                                alt={booking.listing.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-peerly-900">{booking.listing.title}</h3>
                                <div className={cn(
                                  "text-xs px-2 py-0.5 rounded-full capitalize font-medium",
                                  booking.status === "active" && "bg-green-100 text-green-800",
                                  booking.status === "upcoming" && "bg-blue-100 text-blue-800",
                                  booking.status === "completed" && "bg-peerly-100 text-peerly-800",
                                )}>
                                  {booking.status}
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-2 text-sm text-peerly-600">
                                <Calendar size={14} className="mr-1" />
                                {booking.startDate} to {booking.endDate}
                              </div>
                              
                              <div className="flex items-center mt-1 text-sm text-peerly-600">
                                <User size={14} className="mr-1" />
                                From: {booking.owner.name}
                              </div>
                              
                              <div className="mt-3 flex items-center justify-between">
                                <div>
                                  <span className="text-lg font-semibold text-peerly-900">
                                    ₹{booking.totalPrice}
                                  </span>
                                  <span className="text-peerly-500 text-sm ml-1">
                                    total
                                  </span>
                                </div>
                                
                                <div className="space-x-2">
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                  {booking.status === "active" && (
                                    <Button size="sm">
                                      Return Item
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                {/* Saved Items */}
                <TabsContent value="saved" className="mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-peerly-900">Saved Items</h2>
                  </div>
                  
                  {savedItems.length === 0 ? (
                    <div className="text-center py-12 bg-peerly-50 rounded-xl">
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-peerly-100 rounded-full">
                        <Heart size={24} className="text-peerly-400" />
                      </div>
                      <h3 className="text-lg font-medium text-peerly-900 mb-2">No saved items yet</h3>
                      <p className="text-peerly-600 mb-6 max-w-md mx-auto">
                        You haven't saved any items yet. Click the heart icon on items you like to save them for later.
                      </p>
                      <Button onClick={() => navigate('/explore')}>
                        Explore Rentals
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedItems.map(item => (
                        <ListingCard key={item.id} listing={item} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                {/* Messages */}
                <TabsContent value="messages" className="mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-peerly-900">Messages</h2>
                  </div>
                  
                  <div className="text-center py-12 bg-peerly-50 rounded-xl">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-peerly-100 rounded-full">
                      <MessageSquare size={24} className="text-peerly-400" />
                    </div>
                    <h3 className="text-lg font-medium text-peerly-900 mb-2">No messages yet</h3>
                    <p className="text-peerly-600 mb-6 max-w-md mx-auto">
                      You don't have any messages yet. When you book an item or receive a booking request, you'll be able to chat with the other party here.
                    </p>
                    <Button onClick={() => navigate('/explore')}>
                      Explore Rentals
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper function for className conditionals
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default UserProfile;
