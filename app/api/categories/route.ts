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
    console.error(`GET all categories error: ${error}`)
  }

  try {
    const { data: categories } = await supabase.from("categories").select()

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching category data", error)
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
