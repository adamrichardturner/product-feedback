import TitleWidget from "@/components/widgets/TitleWidget"
import Navigation from "@/components/Navigation"
import CategoryWidget from "@/components/widgets/CategoryWidget"
import RoadmapWidget from "@/components/widgets/RoadmapWidget"
import FeedbackGrid from "@/components/FeedbackGrid"
import AuthWidget from "@/components/widgets/AuthWidget"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Index() {
  const supabase = createServerComponentClient<any>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <div className='min-h-screen flex gap-[30px] flex-row w-full flex-1 max-w-full pt-[94px] pb-[130px]'>
      <div className='w-[255px] flex flex-col gap-6'>
        <TitleWidget />
        <CategoryWidget />
        <RoadmapWidget />
        <AuthWidget session={session} />
      </div>
      <div className='flex-grow'>
        <Navigation />
        <main className='pt-8'>
          <FeedbackGrid />
        </main>
      </div>
    </div>
  )
}
