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
    <nav className='flex w-full flex-grow text-center text-[13px] font-[700] text-[#3A4374] md:hidden'>
      <div
        className={`${
          activeTab === "planned"
            ? "border-b-4 border-b-[#F49F85]"
            : "border-b border-b-[#8C92B3] opacity-40"
        } flex-1 cursor-pointer py-5`}
        onClick={() => setActiveTab("planned")}
      >
        Planned ({plannedCount})
      </div>
      <div
        className={`${
          activeTab === "progress"
            ? "border-b-4 border-b-[#AD1FEA]"
            : "border-b border-b-[#8C92B3] opacity-40"
        } flex-1 cursor-pointer py-5`}
        onClick={() => setActiveTab("progress")}
      >
        In-Progress ({progressCount})
      </div>
      <div
        className={`${
          activeTab === "live"
            ? "border-b-4 border-b-[#62BCFA]"
            : "border-b border-b-[#8C92B3] opacity-40"
        } flex-1 cursor-pointer py-5`}
        onClick={() => setActiveTab("live")}
      >
        Live ({liveCount})
      </div>
    </nav>
  )
}

export default RoadMapMobileNavigation
