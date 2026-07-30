import { proxyToBackend } from "@/lib/backend"

export async function POST() {
  return proxyToBackend("/api/auth/demo", {
    method: "POST",
  })
}
