import { Jost } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Product Feedback App | Adam Richard Turner",
  description: "A full stack product feedback app with a Kanban board roadmap",
}

const jost = Jost({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={jost.className} suppressHydrationWarning>
      <body className='bg-background text-foreground overflow-y-scroll'>
        <main className='min-h-screen flex flex-col items-center md:container'>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
