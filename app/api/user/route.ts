import { createClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error("User is not signed in")
    return new Response(JSON.stringify({ error: "User is not signed in" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)

    if (error) {
      console.error("Error fetching user data:", error)
      return new Response(JSON.stringify({ error: error }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Unexpected error fetching user data:", error)
    new Response(
      JSON.stringify({ error: "Unexpected error fetching user data:" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
