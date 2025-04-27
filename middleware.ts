import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Your existing middleware is good! It only checks cookies (no API calls)
export async function middleware(request: NextRequest) {
  // Only check protected routes
  const protectedRoutes = ['/library', '/collections']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Simple check for auth cookie existence - no API calls
  const hasAuthCookie = request.cookies.getAll().some(cookie => 
    cookie.name === 'sb-access-token' || cookie.name === 'sb-refresh-token'
  )

  if (hasAuthCookie) {
    return NextResponse.next()
  }

  // Redirect to login with return URL
  const accountUrl = process.env.NEXT_PUBLIC_ACCOUNT_URL || 'https://id.scholarly.world'
  const returnUrl = encodeURIComponent(request.nextUrl.toString())
  const redirectUrl = `${accountUrl}/auth?redirectTo=${returnUrl}`
  
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  // Only include essential routes in the matcher
  matcher: ['/library/:path*', '/collections/:path*']
}