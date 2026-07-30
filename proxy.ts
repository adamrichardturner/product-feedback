import { createClient } from "@/utils/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const { supabase, response } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/feedback", request.url))
  }

  if (!user && request.nextUrl.pathname.startsWith("/feedback")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
