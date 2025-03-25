
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
  profiles: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

// Convert database listing to frontend listing format
const mapDbListingToFrontend = (dbListing: DbListing): ListingProps => {
  const owner: Owner = {
    name: dbListing.profiles.full_name || "Anonymous User",
    avatar: dbListing.profiles.avatar_url || "https://i.pravatar.cc/150?img=32", // Default avatar
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
    throw error;
  }

  return (data as DbListing[]).map(mapDbListingToFrontend);
};

// Fetch a single listing by ID
export const fetchListingById = async (id: string): Promise<ListingProps | null> => {
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
};

// Create a new listing
export const createListing = async (listing: CreateListingPayload): Promise<string> => {
  const user = supabase.auth.getUser();
  if (!user) {
    throw new Error("User must be authenticated to create a listing");
  }

  const { data, error } = await supabase
    .from('listings')
    .insert({
      ...listing,
      owner_id: (await user).data.user?.id,
      is_active: true
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating listing:", error);
    throw error;
  }

  return data.id;
};

// Update a listing
export const updateListing = async (id: string, updates: Partial<CreateListingPayload>): Promise<void> => {
  const { error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error(`Error updating listing with ID ${id}:`, error);
    throw error;
  }
};

// Delete a listing (or mark as inactive)
export const deleteListing = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('listings')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    console.error(`Error deleting listing with ID ${id}:`, error);
    throw error;
  }
};

// Fetch listings by owner ID
export const fetchListingsByOwner = async (): Promise<ListingProps[]> => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return [];
  }

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
    .eq('owner_id', user.data.user.id);

  if (error) {
    console.error("Error fetching owner listings:", error);
    throw error;
  }

  return (data as DbListing[]).map(mapDbListingToFrontend);
};

// Fetch featured listings
export const fetchFeaturedListings = async (): Promise<ListingProps[]> => {
  // In a real application, this would query for listings marked as featured
  // For now, we'll just fetch the most recent listings and mark them as featured
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
    throw error;
  }

  return (data as DbListing[]).map(listing => ({
    ...mapDbListingToFrontend(listing),
    featured: true
  }));
};

// Get user's listings
export const getUserListings = async (userId: string): Promise<any[]> => {
  // For MVP, we'll use mock data until the database is set up
  const mockListings = [
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
  
  // In a production app, this would be a real database query
  return mockListings;
};

// Add function to get user's favorite listings
export const getFavorites = async (): Promise<any[]> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData || !userData.user) {
    throw new Error("User not authenticated");
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

// Add function to toggle favorite status for a listing
export const toggleFavorite = async (listingId: string): Promise<boolean> => {
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData || !userData.user) {
    throw new Error("User not authenticated");
  }
  
  // For MVP, just return success
  // In a production app, this would add or remove the favorite
  return true;
};
