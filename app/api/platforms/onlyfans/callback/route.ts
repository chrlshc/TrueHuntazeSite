import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const status = url.searchParams.get('status')

  // Persist a simple cookie flag to reflect connection status in SSR/client
  const res = NextResponse.redirect(new URL('/onboarding/setup?connected=onlyfans', url.origin))
  if (status === 'connected') {
    res.cookies.set('ops_platforms_onlyfans', 'true', {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }
  return res
}

