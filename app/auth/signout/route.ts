import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (!error) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  })
}
