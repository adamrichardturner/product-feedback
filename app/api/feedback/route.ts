import { createClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = createClient()

  try {
    const { data: feedback, error } = await supabase.from("feedback").select()

    if (error) {
      console.error("Error fetching feedback data", error)
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    return new Response(JSON.stringify(feedback), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(`GET all feedback error: ${error}`)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

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

    const { title, category, detail } = await request.json()

    if (!title || title.length < 3) {
      return new Response(JSON.stringify({ error: "Invalid Title" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    if (!detail || detail.length < 3) {
      return new Response(JSON.stringify({ error: "Invalid Detail" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const { error, data } = await supabase.from("feedback").insert({
      user_id: user.id,
      title,
      category_id: category,
      detail,
    })

    if (error) {
      return new Response(
        JSON.stringify({ error: `Server Error: ${error.message}` }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    return new Response(JSON.stringify({ data: `Feedback Created: ${data}` }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(`POST feedback error: ${error}`)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
