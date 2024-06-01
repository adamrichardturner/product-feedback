import RoadMapNavigation from "../../components/RoadMap/RoadMapNavigation/index"
import RoadMap from "@/components/RoadMap"

export default async function Index() {
  return (
    <div className='w-full flex flex-col justify-start md:pt-[78px] pb-[100px] min-h-screen'>
      <header className='hidden md:block'>
        <RoadMapNavigation />
      </header>
      <main className='flex-grow'>
        <RoadMap />
      </main>
    </div>
  )
}
