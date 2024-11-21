import { Jost } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { SWRProvider } from "@/components/providers/SWRProvider"

const jost = Jost({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  title: "Product Feedback App | Adam Richard Turner",
  description: "A full stack product feedback app with a Kanban board roadmap",
  openGraph: {
    title: "Product Feedback App | Adam Richard Turner",
    description:
      "A full stack product feedback app with a Kanban board roadmap",
    url: "/",
    siteName: "Product Feedback App",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Product Feedback App by Adam Richard Turner",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Feedback App | Adam Richard Turner",
    description:
      "A full stack product feedback app with a Kanban board roadmap",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Product Feedback App by Adam Richard Turner",
      },
    ],
    creator: "@devadam88",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
