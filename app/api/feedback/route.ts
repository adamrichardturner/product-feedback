import { FeedbackType } from "@/types/feedback"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  const userId = user?.id

  try {
    const { data: feedback, error: feedbackError } = await supabase.from(
      "feedback"
    ).select(`
        *,
        votes (user_id)
      `)

    if (feedbackError) {
      console.error("Error fetching feedback data", feedbackError)
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const { data: comments, error: commentError } = await supabase
      .from("comments")
      .select("*")

    if (commentError) {
      console.error("Error fetching feedback data", commentError)
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const processedFeedback = feedback.map((item: FeedbackType) => ({
      ...item,
      upvotedByUser: item?.votes?.some((vote) => vote.user_id === userId),
      comments: comments.filter((comment) => comment.feedback_id === item.id)
        .length,
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
      category,
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

    const requestData = await request.json()
    const { id, title, detail, category, status, order } = requestData

    // Validate required fields
    if (!id || !title || !detail || !category || !status) {
      return new Response(
        JSON.stringify({
          error:
            "All fields (id, title, detail, category, status, order) are required",
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

    const { error: userError } = await supabase.auth.getUser()

    if (userError) {
      throw new Error(userError.message)
    }

    const { data, error } = await supabase
      .from("feedback")
      .update({ title, detail, category, status, order })
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

    const { error: userError } = await supabase.auth.getUser()

    if (userError) {
      throw new Error(userError.message)
    }

    const { error: deleteVotesError } = await supabase
      .from("votes")
      .delete()
      .eq("feedback_id", id)

    if (deleteVotesError) {
      throw new Error(deleteVotesError.message)
    }

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
