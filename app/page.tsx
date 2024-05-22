import TitleWidget from "@/components/widgets/TitleWidget"
import AuthButton from "../components/AuthButton"
import Navigation from "@/components/Navigation"
// import { createClient } from "@/utils/supabase/server"
import CategoryWidget from "@/components/widgets/CategoryWidget"
import RoadmapWidget from "@/components/widgets/RoadmapWidget"
import FeedbackCard from "@/components/FeedbackCard"

export default async function Index() {
  // const canInitSupabaseClient = () => {
  //   try {
  //     createClient()
  //     return true
  //   } catch (e) {
  //     return false
  //   }
  // }

  // const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className='min-h-screen flex gap-[30px] flex-row w-full flex-1 max-w-full pt-[94px]'>
      <div className='w-[255px] flex flex-col gap-6'>
        <TitleWidget />
        <CategoryWidget active='all' />
        <RoadmapWidget />
      </div>
      <div className='flex-grow'>
        <Navigation />
        <main className='pt-8'>
          <FeedbackCard />
        </main>
      </div>
    </div>
  )
}
