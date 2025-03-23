
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const createStorageBucket = async () => {
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const { data: existingBuckets } = await supabaseAdmin.storage.listBuckets();
  const listingsBucketExists = existingBuckets?.some(bucket => bucket.name === 'listings');

  if (!listingsBucketExists) {
    const { data, error } = await supabaseAdmin.storage.createBucket('listings', {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
    });

    if (error) {
      console.error('Error creating bucket:', error);
      return false;
    }

    // Create policy to allow authenticated users to upload files
    await supabaseAdmin.storage.from('listings').createPolicy(
      'authenticated can upload',
      {
        name: 'authenticated can upload',
        definition: {
          role_id: 'authenticated',
          resource: 'objects',
          action: 'INSERT',
        },
      }
    );

    // Create policy to allow anyone to download/view files
    await supabaseAdmin.storage.from('listings').createPolicy(
      'anyone can download',
      {
        name: 'anyone can download',
        definition: {
          role_id: '*',
          resource: 'objects',
          action: 'SELECT',
        },
      }
    );

    return true;
  }

  return false;
};
