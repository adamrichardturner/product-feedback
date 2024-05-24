import BackButton from "@/components/BackButton"
import { FeedbackForm } from "@/components/FeedbackForm"

export default function Page() {
  return (
    <section className='min-h-screen flex flex-col justify-center'>
      <div className='relative bottom-12'>
        <BackButton />
      </div>
      <FeedbackForm />
    </section>
  )
}
