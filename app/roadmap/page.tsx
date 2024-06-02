import RoadMapNavigation from "../../components/RoadMap/RoadMapNavigation/index"
import RoadMap from "@/components/RoadMap"
import RoadMapMobileNavigation from "@/components/RoadMap/RoadMapMobileNavigation"

export default async function Index() {
  return (
    <div className='w-full flex flex-col justify-start md:pt-[78px] pb-[100px] min-h-screen'>
      <header>
        <RoadMapNavigation />
      </header>
      <main className='flex-grow'>
        <RoadMap />
      </main>
    </div>
  )
}
