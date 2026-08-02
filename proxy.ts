import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  applySetCookies,
  clearAuthCookie,
  hasTokenCookie,
  isAuthPath,
  isProtectedPath,
  readValidToken,
  redirectToApp,
  redirectToAuth,
  refreshAuthToken,
  shouldRefreshToken,
} from "@/lib/auth"

function handleSignedOut(request: NextRequest, pathname: string): NextResponse {
  if (isProtectedPath(pathname)) {
    return redirectToAuth(request)
  }

  if (!hasTokenCookie(request)) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  clearAuthCookie(response)
  return response
}

/** A failed refresh must not end the session, the token is still valid. */
async function continueWithRefreshedSession(
  request: NextRequest,
  token: string
): Promise<NextResponse> {
  const response = NextResponse.next()
  const refresh = await refreshAuthToken(request, token)

  if (refresh.ok) {
    applySetCookies(response, refresh.setCookies)
  }

  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = readValidToken(request)

  if (token === null) {
    return handleSignedOut(request, pathname)
  }

  if (isAuthPath(pathname)) {
    return redirectToApp(request)
  }

  if (!shouldRefreshToken(token)) {
    return NextResponse.next()
  }

  return continueWithRefreshedSession(request, token)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
}
