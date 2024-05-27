import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const supabase = createClient()

  // Check if we have a session

  const { error } = await supabase.auth.signOut()

  if (!error) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  })
}
