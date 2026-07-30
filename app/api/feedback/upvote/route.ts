import { proxyToBackend } from "@/lib/backend"

export async function POST(request: Request) {
  const body = await request.json()
  return proxyToBackend("/api/feedback/upvote", {
    method: "POST",
    body,
  })
}
