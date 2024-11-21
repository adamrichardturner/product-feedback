import { createClient } from "@/utils/supabase/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is authenticated and trying to access the login page,
  // redirect them to the feedback page
  if (user && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/feedback", request.url))
  }

  // If user is not authenticated and trying to access protected routes,
  // redirect them to the login page
  if (!user && request.nextUrl.pathname.startsWith("/feedback")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
