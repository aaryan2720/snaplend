
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createStorageBucket } from '../_shared/storage.ts';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create listings storage bucket
    const bucketCreated = await createStorageBucket();
    
    // Create policies for the bucket
    const { data, error } = await fetch(`${Deno.env.get('SUPABASE_URL')}/storage/v1/bucket/listings/policy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'apikey': Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
      },
      body: JSON.stringify({
        name: 'allow-authenticated-uploads',
        definition: {
          roleName: 'authenticated',
          action: 'INSERT'
        }
      })
    }).then(res => res.json());
    
    if (error) {
      console.error('Error creating policy:', error);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: bucketCreated 
          ? 'Storage bucket for listings created successfully'
          : 'Storage bucket already exists',
        policy: data || null
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in init function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
