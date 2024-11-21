import BackButton from "@/components/BackButton"
import { FeedbackForm } from "@/components/FeedbackForm"
import { createClient } from "@/utils/supabase/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuth = user?.aud === "authenticated"

  return (
    <section className='flex min-h-screen flex-col justify-center px-6'>
      <div className='pb-8 md:pb-12'>
        <BackButton isDark={true} />
      </div>
      <FeedbackForm isAuth={isAuth} />
    </section>
  )
}
