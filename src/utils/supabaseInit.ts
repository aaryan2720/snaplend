
import { supabase } from "@/integrations/supabase/client";

export const initializeSupabase = async () => {
  try {
    // Check if we can access Supabase at all - if not, just return false
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.log("User not authenticated or Supabase connection issue:", userError.message);
      return false;
    }
    
    // Check if 'listings' bucket exists and create if needed
    try {
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.log("Cannot list buckets, may need specific permissions:", error.message);
      } else {
        const listingsBucketExists = buckets?.some(bucket => bucket.name === 'listings');
        
        if (!listingsBucketExists) {
          console.log("Listings bucket doesn't exist, attempting to create...");
          try {
            const { data, error: createError } = await supabase.storage.createBucket('listings', {
              public: true,
              fileSizeLimit: 10 * 1024 * 1024 // 10MB
            });
            
            if (createError) {
              console.log("Couldn't create listings bucket:", createError.message);
            } else {
              console.log("Created listings bucket successfully");
              
              // Set CORS policy for the bucket to allow public access
              const { error: corsError } = await supabase.storage.from('listings').setCorsRules([
                {
                  allowedOrigins: ['*'],
                  allowedMethods: ['GET'],
                  maxAgeSeconds: 3600
                }
              ]);
              
              if (corsError) {
                console.log("Error setting CORS rules:", corsError.message);
              }
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
