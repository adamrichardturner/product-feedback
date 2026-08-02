import { NextResponse, type NextRequest } from "next/server"

const AUTH_PATH = "/"
const AUTHENTICATED_HOME = "/feedback"

function getBackendUrl(): string {
  return process.env.NEXT_BACKEND_URL ?? "http://localhost:3002"
}

function getClearTokenCookieOptions(): {
  httpOnly: boolean
  path: string
  maxAge: number
  secure: boolean
  sameSite: "lax" | "none"
  domain?: string
} {
  const isProduction = process.env.NODE_ENV === "production"

  return {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    ...(isProduction ? { domain: ".adamrichardturner.dev" } : {}),
  }
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set("token", "", getClearTokenCookieOptions())
}

export function applySetCookies(
  response: NextResponse,
  setCookies: string[]
): void {
  for (const setCookie of setCookies) {
    response.headers.append("Set-Cookie", setCookie)
  }
}

export function redirectToAuth(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL(AUTH_PATH, request.url))
  clearAuthCookie(response)
  return response
}

export function redirectToApp(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(AUTHENTICATED_HOME, request.url))
}

export type TokenRefreshResult =
  { ok: true; setCookies: string[] } | { ok: false }

export async function refreshAuthToken(
  token: string
): Promise<TokenRefreshResult> {
  const backendUrl = getBackendUrl().replace(/\/$/, "")

  try {
    const refreshResponse = await fetch(`${backendUrl}/api/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    })

    if (!refreshResponse.ok) {
      return { ok: false }
    }

    const setCookies =
      typeof refreshResponse.headers.getSetCookie === "function"
        ? refreshResponse.headers.getSetCookie()
        : []

    return { ok: true, setCookies }
  } catch {
    return { ok: false }
  }
}

export function isProtectedPath(pathname: string): boolean {
  return pathname.startsWith("/feedback") || pathname.startsWith("/roadmap")
}

export function isAuthPath(pathname: string): boolean {
  return pathname === "/"
}
