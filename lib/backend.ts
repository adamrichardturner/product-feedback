import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_BACKEND_URL ?? "http://localhost:3002"

interface ProxyOptions {
  method?: string
  body?: unknown
  search?: string
}

function buildCookieHeader(
  cookieList: Array<{ name: string; value: string }>
): string {
  return cookieList.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ")
}

export async function proxyToBackend(
  path: string,
  options: ProxyOptions = {}
): Promise<NextResponse> {
  const cookieStore = await cookies()
  const cookieHeader = buildCookieHeader(cookieStore.getAll())

  const url = new URL(path, BACKEND_URL)
  if (options.search) {
    url.search = options.search.startsWith("?")
      ? options.search
      : `?${options.search}`
  }

  const headers: Record<string, string> = {}

  if (cookieHeader.length > 0) {
    headers.Cookie = cookieHeader
  }

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json"
  }

  const backendResponse = await fetch(url, {
    method: options.method ?? "GET",
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  })

  const contentType = backendResponse.headers.get("content-type") ?? ""
  const isJson = contentType.includes("application/json")
  const payload = isJson
    ? await backendResponse.json()
    : await backendResponse.text()

  const response = isJson
    ? NextResponse.json(payload, { status: backendResponse.status })
    : new NextResponse(payload, {
        status: backendResponse.status,
        headers: { "Content-Type": contentType || "text/plain" },
      })

  const setCookies =
    typeof backendResponse.headers.getSetCookie === "function"
      ? backendResponse.headers.getSetCookie()
      : []

  for (const setCookie of setCookies) {
    response.headers.append("Set-Cookie", setCookie)
  }

  return response
}
