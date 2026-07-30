import BackButton from "@/components/BackButton"
import { FeedbackForm } from "@/components/FeedbackForm"
import { cookies } from "next/headers"

export default async function Page() {
  const cookieStore = await cookies()
  const isAuth = Boolean(cookieStore.get("token")?.value)

  return (
    <section className='flex min-h-screen flex-col justify-center px-6'>
      <div className='pb-8 md:pb-12'>
        <BackButton isDark={true} />
      </div>
      <FeedbackForm isAuth={isAuth} />
    </section>
  )
}
