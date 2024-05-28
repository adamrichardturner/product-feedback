import { createClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  const userId = user?.id

  try {
    const { data: feedback, error } = await supabase.from("feedback").select(`
        *,
        votes (user_id)
      `)

    if (error) {
      console.error("Error fetching feedback data", error)
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const processedFeedback = feedback.map((item: any) => ({
      ...item,
      upvotedByUser: item.votes.some((vote: any) => vote.user_id === userId),
    }))

    return new Response(JSON.stringify(processedFeedback), {
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

export async function PUT(request: Request) {
  try {
    // Check if the request method is PUT
    if (request.method !== "PUT") {
      return new Response(
        JSON.stringify({ error: `Method ${request.method} Not Allowed` }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            Allow: "PUT",
          },
        }
      )
    }

    // Parse the request body
    const requestData = await request.json()
    const { id, title, detail, category, status } = requestData

    // Validate required fields
    if (!id || !title || !detail || !category || !status) {
      return new Response(
        JSON.stringify({
          error:
            "All fields (id, title, detail, category, status) are required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    const supabase = createClient()

    // Get the authenticated user
    const { error: userError } = await supabase.auth.getUser()

    if (userError) {
      throw new Error(userError.message)
    }

    // Update the feedback in the database
    const { data, error } = await supabase
      .from("feedback")
      .update({ title, detail, category_id: category, status })
      .eq("id", id)
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error updating data", error)
    return new Response(JSON.stringify({ error: "Error updating data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export async function DELETE(request: Request) {
  try {
    // Check if the request method is DELETE
    if (request.method !== "DELETE") {
      return new Response(
        JSON.stringify({ error: `Method ${request.method} Not Allowed` }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            Allow: "DELETE",
          },
        }
      )
    }

    // Parse the request body
    const requestData = await request.json()
    const { id } = requestData

    // Validate required fields
    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const supabase = createClient()

    // Get the authenticated user
    const { error: userError } = await supabase.auth.getUser()

    if (userError) {
      throw new Error(userError.message)
    }

    // Delete the feedback in the database
    const { data, error } = await supabase
      .from("feedback")
      .delete()
      .eq("id", id)
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error deleting data", error)
    return new Response(JSON.stringify({ error: "Error deleting data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
