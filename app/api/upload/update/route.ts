import { createClient } from "@supabase/supabase-js"
import type { NextApiRequest, NextApiResponse } from "next"

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const { userId, photoUrl } = await req.json()

  if (!userId || !photoUrl) {
    return res.status(400).json({ error: "Missing user ID or photoURL" })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )

  try {
    const { error } = await supabase
      .from("users")
      .update({ profile_photo: photoUrl })
      .eq("id", userId)

    if (error) {
      throw error
    }

    return res
      .status(200)
      .json({ message: "Profile photo updated successfully" })
  } catch (error) {
    console.error(`Update error: ${error}`)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
