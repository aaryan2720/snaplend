
import { supabase } from "@/integrations/supabase/client";
import { ListingProps, Owner } from "@/components/ListingCard";

// Type for creating a new listing
export interface CreateListingPayload {
  title: string;
  description: string;
  price: number;
  priceUnit: "hour" | "day" | "week" | "month";
  location: string;
  category: string;
  image_urls: string[];
  deposit?: number;
  availability_start?: string;
  availability_end?: string;
}

// Type for listing from database with owner relationship
interface DbListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_urls: string[];
  category: string;
  owner_id: string;
  deposit?: number;
  availability_start?: string;
  availability_end?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

// Convert database listing to frontend listing format
const mapDbListingToFrontend = (dbListing: DbListing): ListingProps => {
  const owner: Owner = {
    name: dbListing.profiles?.full_name || "Anonymous User",
    avatar: dbListing.profiles?.avatar_url || "https://i.pravatar.cc/150?img=32", // Default avatar
    rating: 4.5 // Default rating for now, can be calculated from reviews later
  };

  return {
    id: dbListing.id,
    title: dbListing.title,
    description: dbListing.description,
    price: dbListing.price,
    priceUnit: "day", // Default value, should be stored in DB
    location: dbListing.location,
    distance: "Near you", // This would need to be calculated based on user's location
    rating: 4.5, // Default value, should be calculated from reviews
    reviewCount: 0, // Default value, should be counted from reviews
    image: dbListing.image_urls?.[0] || "/placeholder.svg",
    owner,
    featured: false // Default value, can be set based on some criteria later
  };
};

// Fetch all active listings
export const fetchListings = async (): Promise<ListingProps[]> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        profiles:owner_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('is_active', true);

    if (error) {
      console.error("Error fetching listings:", error);
      return [];
    }

    return (data as DbListing[]).map(mapDbListingToFrontend);
  } catch (err) {
    console.error("Exception fetching listings:", err);
    return [];
  }
};

// Fetch a single listing by ID
export const fetchListingById = async (id: string): Promise<ListingProps | null> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        profiles:owner_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching listing with ID ${id}:`, error);
      return null;
    }

    return mapDbListingToFrontend(data as DbListing);
  } catch (err) {
    console.error(`Exception fetching listing with ID ${id}:`, err);
    return null;
  }
};

// Create a new listing
export const createListing = async (listing: CreateListingPayload): Promise<string | null> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData || !userData.user) {
      throw new Error("User must be authenticated to create a listing");
    }

    const { data, error } = await supabase
      .from('listings')
      .insert({
        ...listing,
        owner_id: userData.user.id,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating listing:", error);
      return null;
    }

    return data.id;
  } catch (err) {
    console.error("Exception creating listing:", err);
    return null;
  }
};

// Update a listing
export const updateListing = async (id: string, updates: Partial<CreateListingPayload>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error(`Error updating listing with ID ${id}:`, error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error(`Exception updating listing with ID ${id}:`, err);
    return false;
  }
};

// Delete a listing (or mark as inactive)
export const deleteListing = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('listings')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error(`Error deleting listing with ID ${id}:`, error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error(`Exception deleting listing with ID ${id}:`, err);
    return false;
  }
};

// Fetch listings by owner ID
export const getUserListings = async (userId: string): Promise<any[]> => {
  try {
    if (!userId) return [];

    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        profiles:owner_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('owner_id', userId);

    if (error) {
      console.error("Error fetching owner listings:", error);
      return [];
    }

    if (!data || data.length === 0) {
      // Return mock data for now if no real data exists
      return [
        {
          id: 'l1',
          title: 'Professional DSLR Camera Kit',
          description: 'Canon EOS 5D Mark IV with lenses and accessories',
          price: 1200,
          priceUnit: 'day',
          location: 'Indiranagar, Bangalore',
          image_urls: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000&h=800'],
          created_at: new Date().toISOString(),
          category: 'electronics'
        },
        {
          id: 'l2',
          title: 'Mountain Bike - Trek X-Caliber 8',
          description: 'Perfect for trails and off-road adventures',
          price: 450,
          priceUnit: 'day',
          location: 'Koramangala, Bangalore',
          image_urls: ['https://images.unsplash.com/photo-1545714968-62a0bf2c033d?auto=format&fit=crop&q=80&w=1000&h=800'],
          created_at: new Date().toISOString(),
          category: 'sports'
        }
      ];
    }

    return data;
  } catch (err) {
    console.error("Exception fetching user listings:", err);
    return [];
  }
};

// Fetch featured listings
export const fetchFeaturedListings = async (): Promise<ListingProps[]> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        profiles:owner_id (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error("Error fetching featured listings:", error);
      return [];
    }

    return (data as DbListing[]).map(listing => ({
      ...mapDbListingToFrontend(listing),
      featured: true
    }));
  } catch (err) {
    console.error("Exception fetching featured listings:", err);
    return [];
  }
};

// Get user's favorites
export const getFavorites = async (): Promise<any[]> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData || !userData.user) {
    return [];
  }
  
  // For MVP, we'll use mock data
  const mockFavorites = [
    {
      id: 'f1',
      user_id: userData.user.id,
      listing: {
        id: 'l3',
        title: 'Drone - DJI Mini 2',
        description: 'Lightweight drone perfect for aerial photography',
        price: 650,
        priceUnit: 'day',
        location: 'HSR Layout, Bangalore',
        image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1000&h=800',
        rating: 4.8,
        reviewCount: 12,
        owner: {
          name: 'Vikram S.',
          avatar: 'https://i.pravatar.cc/150?img=67',
          rating: 4.9
        }
      }
    },
    {
      id: 'f2',
      user_id: userData.user.id,
      listing: {
        id: 'l4',
        title: 'Projector - Epson Home Cinema',
        description: 'Full HD projector for home theater setup',
        price: 500,
        priceUnit: 'day',
        location: 'Whitefield, Bangalore',
        image: 'https://images.unsplash.com/photo-1588416499018-d8c952dc4554?auto=format&fit=crop&q=80&w=1000&h=800',
        rating: 4.6,
        reviewCount: 8,
        owner: {
          name: 'Arjun P.',
          avatar: 'https://i.pravatar.cc/150?img=59',
          rating: 4.7
        }
      }
    }
  ];
  
  return mockFavorites;
};

// Toggle favorite status for a listing
export const toggleFavorite = async (listingId: string): Promise<boolean> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData || !userData.user) {
    return false;
  }
  
  // For MVP, just return success
  return true;
};
