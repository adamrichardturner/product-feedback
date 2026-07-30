import { proxyToBackend } from "@/lib/backend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const backendResponse = await proxyToBackend("/api/auth/signout", {
    method: "POST",
  })

  const response = NextResponse.redirect(new URL("/", request.url), {
    status: 302,
  })

  const setCookies = backendResponse.headers.getSetCookie()
  for (const setCookie of setCookies) {
    response.headers.append("Set-Cookie", setCookie)
  }

  response.cookies.set("token", "", {
    path: "/",
    maxAge: 0,
  })

  return response
}
