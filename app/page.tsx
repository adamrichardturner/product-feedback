import TitleWidget from "@/components/widgets/TitleWidget"
import AuthButton from "../components/AuthButton"
import Navigation from "@/components/Navigation"
// import { createClient } from "@/utils/supabase/server"

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
      <div className='w-[255px]'>
        <TitleWidget />
      </div>
      <div className='flex-grow'>
        <Navigation />
      </div>
    </div>
  )
}
