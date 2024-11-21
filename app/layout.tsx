import { Jost } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { SWRProvider } from "@/components/providers/SWRProvider"

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
      <body className='overflow-y-scroll bg-background text-foreground'>
        <main className='flex min-h-screen flex-col items-center md:container'>
          <SWRProvider>{children}</SWRProvider>
        </main>
        <Toaster />
      </body>
    </html>
  )
}
