
import React, { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/contexts/AuthContext";
import { getUserBookings } from "@/services/bookingService";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Calendar, MapPin, Clock, DollarSign, BadgeCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const UserBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user) return;
        
        setLoading(true);
        const userBookings = await getUserBookings();
        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        toast({
          title: "Error",
          description: "Failed to load your bookings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, toast]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded">
            <BadgeCheck className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">Confirmed</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center text-orange-600 bg-orange-100 px-2 py-1 rounded">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">Pending</span>
          </div>
        );
      case "cancelled":
        return (
          <div className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">Cancelled</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">{status}</span>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <Container className="min-h-screen flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-snaplend-600" />
          <p className="mt-4 text-snaplend-600">Loading your bookings...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-snaplend-900 mb-6">My Bookings</h1>
        <Separator className="mb-8" />

        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-snaplend-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
            <p className="text-snaplend-600 mb-6">
              Browse our listings and book items that interest you.
            </p>
            <Button asChild>
              <Link to="/explore">Explore Listings</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-40 md:h-auto">
                      <img 
                        src={booking.listing?.image || "/placeholder.svg"} 
                        alt={booking.listing?.title || "Booked item"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-6 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{booking.listing?.title || "Unnamed item"}</h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm text-snaplend-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            {booking.start_date && booking.end_date ? (
                              <>
                                {format(new Date(booking.start_date), "MMM d, yyyy")} - 
                                {format(new Date(booking.end_date), "MMM d, yyyy")}
                              </>
                            ) : (
                              "Dates not specified"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{booking.listing?.location || "Location not specified"}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span>₹{booking.total_price} total</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-4">
                        {booking.status === "confirmed" && (
                          <Button asChild variant="outline" size="sm">
                            <Link to={`/agreement/${booking.id}`}>View Agreement</Link>
                          </Button>
                        )}
                        <Button asChild size="sm">
                          <Link to={`/item/${booking.listing_id}`}>View Item</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default UserBookings;
