
import { supabase } from "@/integrations/supabase/client";

export interface BookingPayload {
  listing_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  deposit_paid?: number;
}

export interface Booking {
  id: string;
  listing_id: string;
  renter_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  deposit_paid?: number;
  deposit_returned?: boolean;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  listing: {
    title: string;
    image_urls: string[];
    price: number;
    owner_id: string;
  };
  owner: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

// Create a booking
export const createBooking = async (bookingData: BookingPayload): Promise<string> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw new Error("User must be authenticated to create a booking");
  }

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      ...bookingData,
      renter_id: user.data.user.id,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating booking:", error);
    throw error;
  }

  return data.id;
};

// Fetch user's bookings (as a renter)
export const fetchUserBookings = async (): Promise<Booking[]> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return [];
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      listing:listing_id (
        title,
        image_urls,
        price,
        owner_id
      ),
      owner:listing_id(owner_id(
        profiles:owner_id (
          full_name,
          avatar_url
        )
      ))
    `)
    .eq('renter_id', user.data.user.id);

  if (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }

  return data as unknown as Booking[];
};

// Fetch bookings for user's listings (as an owner)
export const fetchListingBookings = async (): Promise<Booking[]> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return [];
  }

  // First get the user's listings
  const { data: listings, error: listingsError } = await supabase
    .from('listings')
    .select('id')
    .eq('owner_id', user.data.user.id);

  if (listingsError) {
    console.error("Error fetching user listings:", listingsError);
    throw listingsError;
  }

  if (!listings || listings.length === 0) {
    return [];
  }

  // Then get all bookings for those listings
  const listingIds = listings.map(listing => listing.id);
  
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      listing:listing_id (
        title,
        image_urls,
        price,
        owner_id
      )
    `)
    .in('listing_id', listingIds);

  if (error) {
    console.error("Error fetching listing bookings:", error);
    throw error;
  }

  return data as unknown as Booking[];
};

// Update booking status
export const updateBookingStatus = async (bookingId: string, status: Booking['status']): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId);

  if (error) {
    console.error(`Error updating booking status for ID ${bookingId}:`, error);
    throw error;
  }
};

// Return security deposit
export const returnSecurityDeposit = async (bookingId: string): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .update({ deposit_returned: true })
    .eq('id', bookingId);

  if (error) {
    console.error(`Error returning deposit for booking ID ${bookingId}:`, error);
    throw error;
  }
};
