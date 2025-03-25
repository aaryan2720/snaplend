
import { supabase } from "@/integrations/supabase/client";

export const initializeSupabase = async () => {
  try {
    // Check if we can access Supabase at all - if not, just return false
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.log("User not authenticated or Supabase connection issue:", userError.message);
      return false;
    }
    
    // Attempting to list buckets may fail due to permissions, so we'll handle that gracefully
    try {
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.log("Cannot list buckets, may need specific permissions:", error.message);
        // Just continue, don't try to create bucket
      } else {
        // Only try to create bucket if we can successfully list them
        const listingsBucketExists = buckets?.some(bucket => bucket.name === 'listings');
        
        if (!listingsBucketExists) {
          console.log("Listings bucket doesn't exist, attempting to create...");
          try {
            const { data, error: createError } = await supabase.storage.createBucket('listings', {
              public: true,
              fileSizeLimit: 5 * 1024 * 1024 // 5MB
            });
            
            if (createError) {
              console.log("Couldn't create listings bucket:", createError.message);
            } else {
              console.log("Created listings bucket successfully:", data);
            }
          } catch (createBucketError) {
            console.log("Exception creating bucket:", createBucketError);
          }
        }
      }
    } catch (bucketsError) {
      console.log("Exception accessing buckets:", bucketsError);
    }
    
    return true;
  } catch (error) {
    console.log("Failed to initialize Supabase:", error);
    return false;
  }
};
