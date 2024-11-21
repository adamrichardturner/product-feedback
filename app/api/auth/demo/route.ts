import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: "demo@demo.com",
    password: "demo",
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  // Set auth cookie
  const cookieStore = cookies()
  const session = data.session
  if (session) {
    cookieStore.set("session", session.access_token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  }

  return NextResponse.json({
    message: "Logged in successfully",
    user: data.user,
  })
}
