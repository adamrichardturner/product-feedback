import { CommentType } from "@/services/commentService"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const feedback_id = url.searchParams.get("feedback_id")

    if (!feedback_id) {
      return new Response(
        JSON.stringify({ error: "Feedback ID is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    const supabase = createClient()

    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        feedback_id,
        user_id,
        parent_comment_id,
        content,
        inserted_at,
        profiles:profiles!comments_user_id_fkey (username, full_name, avatar_url)
      `
      )
      .eq("feedback_id", feedback_id)
      .order("inserted_at", { ascending: true })

    if (error) {
      console.error("Error fetching comments:", error)
      throw error
    }

    // Transform data to nest replies and map profiles to user
    const commentMap: { [key: string]: CommentType } = {}
    const topLevelComments: CommentType[] = []

    data.forEach((comment: any) => {
      const transformedComment: CommentType = {
        id: comment.id,
        feedback_id: comment.feedback_id,
        user_id: comment.user_id,
        parent_comment_id: comment.parent_comment_id,
        content: comment.content,
        inserted_at: comment.inserted_at,
        user: comment.profiles[0],
        replies: [],
      }
      commentMap[transformedComment.id] = transformedComment

      if (transformedComment.parent_comment_id) {
        commentMap[transformedComment.parent_comment_id]?.replies.push(
          transformedComment
        )
      } else {
        topLevelComments.push(transformedComment)
      }
    })

    return new Response(JSON.stringify(topLevelComments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(`Error fetching comments: ${JSON.stringify(error)}`)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { feedback_id, content, parent_comment_id } = body

    if (!feedback_id || !content) {
      return new Response(
        JSON.stringify({ error: "Feedback ID and content are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    // Get the authenticated user
    const supabase = createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const user_id = user.id

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          feedback_id,
          content,
          parent_comment_id: parent_comment_id || null,
          user_id,
        },
      ])
      .single()

    if (error) {
      console.error("Error inserting comment:", error)
      throw error
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(`Error posting comment: ${JSON.stringify(error)}`)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
