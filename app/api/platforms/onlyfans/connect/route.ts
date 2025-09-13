import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // Minimal local/dev connector: immediately redirect to callback as "connected"
  const url = new URL(req.url)
  const callback = new URL('/api/platforms/onlyfans/callback', url.origin)
  callback.searchParams.set('status', 'connected')
  return NextResponse.redirect(callback)
}

