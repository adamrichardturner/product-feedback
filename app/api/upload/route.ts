import { createClient } from "@supabase/supabase-js"
import formidable from "formidable"
import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: false,
  },
}

const parseForm = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = new formidable.IncomingForm()
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

export async function POST(req: Request, res: Response) {
  try {
    const { fields, files } = await parseForm(req)
    const { userId } = fields
    const file = files.file as unknown as formidable.File

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
    const fileName = `${userId}/${file.originalFilename}`

    const { error } = await supabase.storage
      .from("profile-photos")
      .upload(fileName, file.filepath)

    const { publicURL } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(fileName)

    console.log(publicURL)

    return res.status(201).json({ publicURL })
  } catch (error) {
    console.error(`Upload error: ${error}`)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
