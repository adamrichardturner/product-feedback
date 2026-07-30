import { proxyToBackend } from "@/lib/backend"

export async function GET(request: Request) {
  const url = new URL(request.url)
  return proxyToBackend("/api/feedback/comments", {
    search: url.search,
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  return proxyToBackend("/api/feedback/comments", {
    method: "POST",
    body,
  })
}
