
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
    
    return new Response(
      JSON.stringify({
        success: true,
        message: bucketCreated 
          ? 'Storage bucket for listings created successfully'
          : 'Storage bucket already exists',
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
