
import { supabase } from "@/integrations/supabase/client";

export const initializeSupabase = async () => {
  try {
    // Create storage bucket if it doesn't exist
    const { data: buckets } = await supabase.storage.listBuckets();
    const listingsBucketExists = buckets?.some(bucket => bucket.name === 'listings');
    
    if (!listingsBucketExists) {
      const { data, error } = await supabase.storage.createBucket('listings', {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024 // 5MB
      });
      
      if (error) {
        console.error('Error creating listings bucket:', error);
        return false;
      }
      
      console.log('Created listings bucket:', data);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return false;
  }
};
