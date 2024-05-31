import BackButton from "@/components/BackButton"
import { FeedbackForm } from "@/components/FeedbackForm"
import { createClient } from "@/utils/supabase/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuth = !!user

  return (
    <section className='min-h-screen px-6 flex flex-col justify-center'>
      <div className='pb-8 md:pb-12'>
        <BackButton isDark={true} />
      </div>
      <FeedbackForm isAuth={isAuth} />
    </section>
  )
}
