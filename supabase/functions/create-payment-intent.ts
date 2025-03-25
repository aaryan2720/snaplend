import { serve } from 'https://deno.land/std@0.192.0/http/server.ts'
import { verifyJWT } from '../_shared/auth.ts'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseJWTSecret = Deno.env.get('SUPABASE_JWT_SECRET')!

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify JWT from Authorization header
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const payload = await verifyJWT(token, supabaseJWTSecret)
    
    // Parse request body
    const { bookingId, amount } = await req.json()
    
    // Here you would typically create a Stripe Payment Intent
    // For now return mock data matching the frontend expectations
    const mockPaymentIntent = {
      id: 'pi_mock_' + crypto.randomUUID(),
      booking_id: bookingId,
      amount: amount,
      currency: 'inr',
      status: 'succeeded',
      client_secret: 'mock_secret_' + crypto.randomUUID()
    }

    return new Response(JSON.stringify(mockPaymentIntent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error processing payment intent:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})