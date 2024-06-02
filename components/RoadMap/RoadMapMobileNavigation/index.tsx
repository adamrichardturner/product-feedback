import { Dispatch, SetStateAction } from "react"

interface RoadMapMobileNavigationProps {
  activeTab: string
  setActiveTab: Dispatch<SetStateAction<string>>
  plannedCount: number
  progressCount: number
  liveCount: number
}

const RoadMapMobileNavigation = ({
  activeTab,
  setActiveTab,
  plannedCount,
  progressCount,
  liveCount,
}: RoadMapMobileNavigationProps) => {
  return (
    <nav className='w-full flex md:hidden text-[#3A4374] text-center flex-grow font-[700]'>
      <div
        className={`${
          activeTab === "planned"
            ? " border-b-4 border-b-[#F49F85]"
            : "border-b border-b-[#8C92B3] opacity-40"
        } flex-1 py-5 cursor-pointer`}
        onClick={() => setActiveTab("planned")}
      >
        Planned ({plannedCount})
      </div>
      <div
        className={`${
          activeTab === "progress"
            ? " border-b-4 border-b-[#AD1FEA]"
            : "border-b border-b-[#8C92B3] opacity-40"
        } flex-1 py-5 cursor-pointer`}
        onClick={() => setActiveTab("progress")}
      >
        In-Progress ({progressCount})
      </div>
      <div
        className={`${
          activeTab === "live"
            ? " border-b-4 border-b-[#62BCFA]"
            : "border-b border-b-[#8C92B3] opacity-40"
        } flex-1 py-5 cursor-pointer`}
        onClick={() => setActiveTab("live")}
      >
        Live ({liveCount})
      </div>
    </nav>
  )
}

export default RoadMapMobileNavigation
