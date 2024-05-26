import { createClient } from "@/utils/supabase/server"

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: `Method ${request.method} Not Allowed` }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          Allow: "POST",
        },
      }
    )
  }

  const { feedbackId } = await request.json()

  const supabase = createClient()

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "You need to be logged in to post feedback" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    const userId = user?.id

    // Stored procedure to toggle the vote
    const { error, data } = await supabase.rpc("toggle_vote", {
      feedback_id: feedbackId,
      user_id: userId,
    })

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ message: "Vote toggled successfully", details: data }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    console.error(`Toggle error: ${error}`)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
