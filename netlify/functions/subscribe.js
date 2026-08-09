const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 204, headers: CORS_HEADERS })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  let email
  try {
    const body = await req.json()
    email = body.email
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return new Response(JSON.stringify({ error: 'A valid email is required' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  const { VITE_MAILCHIMP_U, VITE_MAILCHIMP_AUDIENCE_ID, VITE_MAILCHIMP_SERVER_PREFIX } = process.env

  if (!VITE_MAILCHIMP_U || !VITE_MAILCHIMP_AUDIENCE_ID || !VITE_MAILCHIMP_SERVER_PREFIX) {
    return new Response(JSON.stringify({ error: 'Server is not configured' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }

  const params = new URLSearchParams({
    u: VITE_MAILCHIMP_U,
    id: VITE_MAILCHIMP_AUDIENCE_ID,
    EMAIL: email,
  })

  try {
    const mcResponse = await fetch(
      `https://${VITE_MAILCHIMP_SERVER_PREFIX}.list-manage.com/subscribe/post?${params.toString()}`,
      { method: 'POST' }
    )

    if (!mcResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
        status: 502,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
      status: 502,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
}
