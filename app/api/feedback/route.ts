import { proxyToBackend } from "@/lib/backend"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.toString()

  return proxyToBackend("/api/feedback", {
    search: search.length > 0 ? search : undefined,
  })
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
