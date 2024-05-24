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
    <section className='min-h-screen flex flex-col justify-center'>
      <div className='relative bottom-12'>
        <BackButton />
      </div>
      <FeedbackForm isAuth={isAuth} />
    </section>
  )
}
