
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
  } | null;
}

// Convert database listing to frontend listing format
const mapDbListingToFrontend = (dbListing: any): ListingProps => {
  // Create owner object with default values
  const owner: Owner = {
    id: dbListing.profiles?.id,
    name: dbListing.profiles?.full_name || "Anonymous User",
    avatar: dbListing.profiles?.avatar_url || getDefaultAvatar(),
    rating: 0, // Default rating is always 0
  };

  // Process image URLs with more robust handling
  let imageUrl = "/placeholder.svg";
  
  if (dbListing.image_urls && dbListing.image_urls.length > 0) {
    const firstImage = dbListing.image_urls[0];
    // If it's a full URL or starts with a Supabase storage path
    if (firstImage.startsWith('http') || firstImage.startsWith('listings/')) {
      imageUrl = getStorageUrl('listings', firstImage);
    }
  }

  // Process additional images with similar logic
  const additionalImages = dbListing.image_urls && dbListing.image_urls.length > 1 
    ? dbListing.image_urls.slice(1).map(url => 
        url.startsWith('http') || url.startsWith('listings/') 
          ? getStorageUrl('listings', url) 
          : url
      )
    : [];

  return {
    id: dbListing.id,
    title: dbListing.title,
    description: dbListing.description,
    price: dbListing.price,
    priceUnit: dbListing.priceUnit || "day", // Default to "day" if not specified
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
          avatar_url
        )
      `)
      .eq('is_active', true);

    if (error) {
      console.error("Error fetching listings:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Important fix: Cast to any and break the type chain before mapping
    return data.map((item: any) => mapDbListingToFrontend(item));
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

    if (!data) {
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
          avatar_url
        )
      `)
      .eq('owner_id', userId);

    if (error) {
      console.error("Error fetching owner listings:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
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
    // Make direct SQL query to avoid TypeScript tracking relationships between tables
    const { data, error } = await supabase.rpc('get_featured_listings');
    
    if (error || !data || data.length === 0) {
      console.error("Error or empty result fetching featured listings:", error);
      return [];
    }
    
    // Process results as simple objects without type relationships
    return data.map((rawItem: any) => {
      const listing = mapDbListingToFrontend({
        ...rawItem,
        // Extract profile data if it exists
        profiles: rawItem.profile_id ? {
          id: rawItem.profile_id,
          full_name: rawItem.profile_name,
          avatar_url: rawItem.profile_avatar
        } : null
      });
      
      listing.featured = true;
      return listing;
    });
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
  
  // For MVP, return an empty array
  // In a real app, you would query a favorites table
  return [];
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
