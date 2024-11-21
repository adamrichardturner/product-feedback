import { FeedbackType, Vote } from "@/types/feedback"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userId = user?.id

  try {
    const url = new URL(request.url)
    const feedback_id = url.searchParams.get("feedback_id")

    if (!feedback_id) {
      console.error("Error fetching feedback data")
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const { data: singleFeedback, error: singleFeedbackError } = await supabase
      .from("feedback")
      .select(
        `
        *,
        votes (user_id)
      `
      )
      .eq("id", feedback_id)
      .single()

    if (singleFeedbackError) {
      console.error("Error fetching feedback data", singleFeedbackError)
      return new Response(JSON.stringify({ error: "Error fetching data" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const processedFeedback: FeedbackType = {
      ...singleFeedback,
      upvotedByUser: singleFeedback?.votes?.some(
        (vote: Vote) => vote.user_id === userId
      ),
      current_user_id: userId,
    }

    return new Response(JSON.stringify(processedFeedback), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(`GET single feedback error: ${error}`)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
