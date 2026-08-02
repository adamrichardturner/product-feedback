import { NextResponse, type NextRequest } from "next/server"

const AUTH_PATH = "/"
const AUTHENTICATED_HOME = "/feedback"
const REFRESH_PATH = "/api/auth/refresh"
const TOKEN_COOKIE = "token"

interface TokenPayload {
  exp?: number
  iat?: number
}

function decodeBase64Url(segment: string): string {
  const normalised = segment.replace(/-/g, "+").replace(/_/g, "/")
  const padding = (4 - (normalised.length % 4)) % 4
  const binary = atob(normalised + "=".repeat(padding))
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}

/**
 * Reads the claims without verifying the signature. The middleware only needs
 * them to decide where to route, and every protected endpoint on the API still
 * verifies the token properly before trusting it.
 */
function decodeTokenPayload(token: string): TokenPayload | null {
  const segments = token.split(".")

  if (segments.length !== 3) {
    return null
  }

  try {
    const payload: unknown = JSON.parse(decodeBase64Url(segments[1]))

    if (typeof payload !== "object" || payload === null) {
      return null
    }

    const exp = "exp" in payload ? payload.exp : undefined
    const iat = "iat" in payload ? payload.iat : undefined

    return {
      exp: typeof exp === "number" ? exp : undefined,
      iat: typeof iat === "number" ? iat : undefined,
    }
  } catch {
    return null
  }
}

function isTokenValid(token: string): boolean {
  const payload = decodeTokenPayload(token)

  if (!payload || payload.exp === undefined) {
    return false
  }

  return payload.exp * 1000 > Date.now()
}

export function readValidToken(request: NextRequest): string | null {
  const token = request.cookies.get(TOKEN_COOKIE)?.value

  if (!token) {
    return null
  }

  return isTokenValid(token) ? token : null
}

export function hasTokenCookie(request: NextRequest): boolean {
  return request.cookies.has(TOKEN_COOKIE)
}

/** Extends the session once a token is past halfway through its lifetime. */
export function shouldRefreshToken(token: string): boolean {
  const payload = decodeTokenPayload(token)

  if (!payload || payload.exp === undefined || payload.iat === undefined) {
    return false
  }

  const issuedAt = payload.iat * 1000
  const expiresAt = payload.exp * 1000

  return Date.now() >= issuedAt + (expiresAt - issuedAt) / 2
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
  response.cookies.set(TOKEN_COOKIE, "", getClearTokenCookieOptions())
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

/**
 * Refreshes through the app's own route handler rather than calling the API
 * directly, so the backend URL is resolved on the Node runtime that already
 * proxies every other request.
 */
export async function refreshAuthToken(
  request: NextRequest,
  token: string
): Promise<TokenRefreshResult> {
  try {
    const refreshResponse = await fetch(new URL(REFRESH_PATH, request.url), {
      method: "POST",
      headers: { Cookie: `${TOKEN_COOKIE}=${token}` },
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
  return pathname === AUTH_PATH
}
