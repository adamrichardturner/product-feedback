import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  const supabase = createClient()

  try {
    if (request.method !== "GET") {
      return new Response(
        JSON.stringify({ error: `Method ${request.method} Not Allowed` }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            Allow: "GET",
          },
        }
      )
    }
  } catch (error) {
    console.error(`GET all feedback error: ${error}`)
  }

  try {
    const { data: feedback } = await supabase.from("feedback").select()

    return new Response(JSON.stringify(feedback), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching feedback data", error)
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
