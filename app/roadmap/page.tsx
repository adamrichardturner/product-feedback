import RoadMapNavigation from "../../components/RoadMap/RoadMapNavigation/index"
import RoadMap from "@/components/RoadMap"

export default async function Index() {
  return (
    <div className='w-full flex flex-col justify-start md:pt-[78px] min-h-screen'>
      <header className='hidden md:block'>
        <RoadMapNavigation />
      </header>
      <main>
        <RoadMap />
      </main>
    </div>
  )
}
