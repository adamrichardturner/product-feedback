import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  applySetCookies,
  clearAuthCookie,
  isAuthPath,
  isProtectedPath,
  redirectToApp,
  redirectToAuth,
  refreshAuthToken,
} from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl
  const onAuthPath = isAuthPath(pathname)
  const onProtectedPath = isProtectedPath(pathname)

  if (!token) {
    if (onProtectedPath) {
      return redirectToAuth(request)
    }

    return NextResponse.next()
  }

  const refreshResult = await refreshAuthToken(token)

  if (!refreshResult.ok) {
    if (onProtectedPath) {
      return redirectToAuth(request)
    }

    const response = NextResponse.next()
    clearAuthCookie(response)
    return response
  }

  if (onAuthPath) {
    const response = redirectToApp(request)
    applySetCookies(response, refreshResult.setCookies)
    return response
  }

  const response = NextResponse.next()
  applySetCookies(response, refreshResult.setCookies)
  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
}
