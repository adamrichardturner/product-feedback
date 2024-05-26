import TitleWidget from "@/components/widgets/TitleWidget"
import Navigation from "@/components/Navigation"
import CategoryWidget from "@/components/widgets/CategoryWidget"
import RoadmapWidget from "@/components/widgets/RoadmapWidget"
import FeedbackGrid from "@/components/FeedbackGrid"
import { createClient } from "@/utils/supabase/server"

export default async function Index() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("USER: ", user)
  return (
    <div className='min-h-screen flex gap-[30px] flex-row w-full flex-1 max-w-full pt-[94px] pb-[130px]'>
      <div className='w-[255px] flex flex-col gap-6'>
        <TitleWidget />
        <CategoryWidget />
        <RoadmapWidget />
      </div>
      <div className='flex-grow'>
        <Navigation />
        <main className='pt-8'>
          <FeedbackGrid userId={user?.aud} />
        </main>
      </div>
    </div>
  )
}
