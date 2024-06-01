import TitleWidget from "@/components/widgets/TitleWidget"
import Navigation from "@/components/Navigation"
import CategoryWidget from "@/components/widgets/CategoryWidget"
import RoadmapWidget from "@/components/widgets/RoadmapWidget"
import FeedbackGrid from "@/components/FeedbackGrid"
import AuthWidget from "@/components/widgets/AuthWidget"

export default async function Index() {
  return (
    <div className='w-full flex flex-col items-end justify-center md:pt-6 min-h-screen'>
      <header className='hidden md:block'>
        <div>
          <AuthWidget />
        </div>
      </header>
      <div className='min-h-screen flex md:gap-[30px] flex-col lg:flex-row w-full flex-1 max-w-full md:pt-6 pb-[55px] md:pb-[130px]'>
        <div className='lg:w-[255px] flex lg:flex-col gap-6'>
          <TitleWidget />
          <div className='hidden md:flex flex-1 lg:flex-none'>
            <CategoryWidget />
          </div>
          <div className='hidden md:block flex-1 lg:flex-none'>
            <RoadmapWidget />
          </div>
        </div>
        <div className='flex-grow'>
          <Navigation />
          <main className='px-4 md:px-0 pt-8 flex-grow'>
            <FeedbackGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
