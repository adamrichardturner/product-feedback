"use client"

import { FeedbackCardProps } from "@/types/feedback"
import useRoadMap from "./hooks/useRoadMap"

const RoadMap = () => {
  const { planned, inProgress, live } = useRoadMap()

  console.log(planned)

  if (!planned || !inProgress || !live) {
    return null
  }

  return <h3>Hello</h3>
}

export default RoadMap
