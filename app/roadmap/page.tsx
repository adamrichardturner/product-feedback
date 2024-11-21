import RoadMapNavigation from "../../components/RoadMap/RoadMapNavigation/index"
import RoadMap from "@/components/RoadMap"
import RoadMapMobileNavigation from "@/components/RoadMap/RoadMapMobileNavigation"

export default async function Index() {
  return (
    <div className='flex min-h-screen w-full flex-col justify-start pb-[100px] md:pt-[78px]'>
      <header>
        <RoadMapNavigation />
      </header>
      <main className='flex-grow'>
        <RoadMap />
      </main>
    </div>
  )
}
