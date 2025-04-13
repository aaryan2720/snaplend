
import { supabase, getStorageUrl } from "@/integrations/supabase/client";
import { ListingProps, Owner } from "@/components/ListingCard";
import { getDefaultAvatar } from "@/services/profileService";

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
  is_sold?: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    gender?: string;
  } | null;
}

// Convert database listing to frontend listing format
const mapDbListingToFrontend = (dbListing: any): ListingProps => {
  // Create owner object with default values
  const owner: Owner = {
    id: dbListing.profiles?.id,
    name: dbListing.profiles?.full_name || "Anonymous User",
    avatar: dbListing.profiles?.avatar_url || getDefaultAvatar(dbListing.profiles?.gender),
    rating: 0, // Default rating is always 0
    gender: dbListing.profiles?.gender
  };

  // Process image URLs - check if they're full URLs or storage paths
  let imageUrl = "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1000&h=800";
  
  if (dbListing.image_urls && dbListing.image_urls.length > 0) {
    const firstImage = dbListing.image_urls[0];
    if (firstImage.startsWith('http')) {
      imageUrl = firstImage;
    } else {
      // Use the storage URL helper function for non-absolute URLs
      imageUrl = getStorageUrl('listings', firstImage);
    }
  }

  // Process additional images if available
  const additionalImages = dbListing.image_urls && dbListing.image_urls.length > 1 
    ? dbListing.image_urls.slice(1).map(url => url.startsWith('http') ? url : getStorageUrl('listings', url))
    : [];

  return {
    id: dbListing.id,
    title: dbListing.title,
    description: dbListing.description,
    price: dbListing.price,
    priceUnit: "day" as "hour" | "day" | "week" | "month", // Ensure type is correct
    location: dbListing.location,
    distance: "Near you", // This would need to be calculated based on user's location
    rating: 0, // Default value for rating is always 0
    reviewCount: 0, // Default value, should be counted from reviews
    image: imageUrl,
    image_urls: dbListing.image_urls,
    additionalImages,
    owner,
    featured: false, // Default value, can be set based on some criteria later
    category: dbListing.category,
    isSold: dbListing.is_sold || false,
    owner_id: dbListing.owner_id
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
          avatar_url,
          gender
        )
      `)
      .eq('is_active', true);

    if (error) {
      console.error("Error fetching listings:", error);
      return [];
    }

    // Important fix: Cast to any and break the type chain before mapping
    return (data || []).map((item: any) => mapDbListingToFrontend(item)) as ListingProps[];
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
          avatar_url,
          gender
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching listing with ID ${id}:`, error);
      return null;
    }

    // Important fix: Use explicit any type to break the recursive type chain
    return mapDbListingToFrontend(data as any);
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
        is_active: true,
        is_sold: false
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
export const updateListing = async (id: string, updates: Partial<CreateListingPayload & { is_sold?: boolean }>): Promise<boolean> => {
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

// Delete a listing (actual deletion, not just marking inactive)
export const deleteListing = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('listings')
      .delete()
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

// Mark a listing as sold
export const markListingAsSold = async (id: string): Promise<boolean> => {
  return await updateListing(id, { is_sold: true });
};

// Fetch listings by owner ID
export const getUserListings = async (userId: string): Promise<ListingProps[]> => {
  try {
    if (!userId) return [];

    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        profiles:owner_id (
          id,
          full_name,
          avatar_url,
          gender
        )
      `)
      .eq('owner_id', userId);

    if (error) {
      console.error("Error fetching owner listings:", error);
      return [];
    }

    if (!data || data.length === 0) {
      // Return mock data for now if no real data exists
      const mockData = [
        {
          id: 'l1',
          title: 'Professional DSLR Camera Kit',
          description: 'Canon EOS 5D Mark IV with lenses and accessories',
          price: 1200,
          priceUnit: 'day',
          location: 'Indiranagar, Bangalore',
          image_urls: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000&h=800'],
          created_at: new Date().toISOString(),
          category: 'electronics',
          is_sold: false
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
          category: 'sports',
          is_sold: false
        }
      ];
      
      // Important fix: Cast mock data item to any and make sure TypeScript doesn't track type relationship chains
      return mockData.map(item => mapDbListingToFrontend(item as any));
    }

    // Important fix: Break the type chain by explicitly casting each item to any
    return data.map(item => mapDbListingToFrontend(item as any));
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
          avatar_url,
          gender
        )
      `)
      .eq('is_active', true)
      .eq('is_sold', false)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error("Error fetching featured listings:", error);
      return getDefaultListings();
    }

    if (!data || data.length === 0) {
      return getDefaultListings();
    }

    // Critical fix: Break the type chain with explicit any cast 
    // and handle each item individually to prevent excessive type instantiation
    const mappedListings: ListingProps[] = [];
    
    for (const item of data) {
      // Use any type to break the deep type instantiation chain
      const itemAny: any = item;
      const listing = mapDbListingToFrontend(itemAny);
      listing.featured = true;
      mappedListings.push(listing);
    }
    
    return mappedListings;
  } catch (err) {
    console.error("Exception fetching featured listings:", err);
    return getDefaultListings();
  }
};

// Provide default listings when needed
export const getDefaultListings = (): ListingProps[] => {
  return [
    {
      id: 'default-1',
      title: 'Professional DSLR Camera Kit',
      description: 'Canon EOS 5D Mark IV with lenses and accessories',
      price: 1200,
      priceUnit: "day",
      location: 'Indiranagar, Bangalore',
      distance: '2.5 km',
      rating: 0,
      reviewCount: 0,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000&h=800',
      owner: {
        name: 'Rahul M.',
        avatar: 'https://i.pravatar.cc/150?img=68',
        rating: 0
      },
      featured: true
    },
    {
      id: 'default-2',
      title: 'Mountain Bike - Trek X-Caliber 8',
      description: 'Perfect for trails and off-road adventures',
      price: 450,
      priceUnit: "day",
      location: 'Koramangala, Bangalore',
      distance: '3.8 km',
      rating: 0,
      reviewCount: 0,
      image: 'https://images.unsplash.com/photo-1545714968-62a0bf2c033d?auto=format&fit=crop&q=80&w=1000&h=800',
      owner: {
        name: 'Priya S.',
        avatar: 'https://i.pravatar.cc/150?img=47',
        rating: 0
      },
      featured: true
    },
    {
      id: 'default-3',
      title: 'Drone - DJI Mini 2',
      description: 'Lightweight drone perfect for aerial photography',
      price: 650,
      priceUnit: "day",
      location: 'HSR Layout, Bangalore',
      distance: '5.2 km',
      rating: 0,
      reviewCount: 0,
      image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1000&h=800',
      owner: {
        name: 'Vikram S.',
        avatar: 'https://i.pravatar.cc/150?img=67',
        rating: 0
      },
      featured: true
    },
    {
      id: 'default-4',
      title: 'Projector - Epson Home Cinema',
      description: 'Full HD projector for home theater setup',
      price: 500,
      priceUnit: "day",
      location: 'Whitefield, Bangalore',
      distance: '7.5 km',
      rating: 0,
      reviewCount: 0,
      image: 'https://images.unsplash.com/photo-1588416499018-d8c952dc4554?auto=format&fit=crop&q=80&w=1000&h=800',
      owner: {
        name: 'Arjun P.',
        avatar: 'https://i.pravatar.cc/150?img=59',
        rating: 0
      },
      featured: true
    }
  ];
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
        rating: 0,
        reviewCount: 0,
        owner: {
          name: 'Vikram S.',
          avatar: 'https://i.pravatar.cc/150?img=67',
          rating: 0
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
        rating: 0,
        reviewCount: 0,
        owner: {
          name: 'Arjun P.',
          avatar: 'https://i.pravatar.cc/150?img=59',
          rating: 0
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
