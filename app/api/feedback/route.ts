import { proxyToBackend } from "@/lib/backend"

export async function GET() {
  return proxyToBackend("/api/feedback")
}

export async function POST(request: Request) {
  const body = await request.json()
  return proxyToBackend("/api/feedback", {
    method: "POST",
    body,
  })
}

export async function PUT(request: Request) {
  const body = await request.json()
  return proxyToBackend("/api/feedback", {
    method: "PUT",
    body,
  })
}

export async function DELETE(request: Request) {
  const body = await request.json()
  return proxyToBackend("/api/feedback", {
    method: "DELETE",
    body,
  })
}
