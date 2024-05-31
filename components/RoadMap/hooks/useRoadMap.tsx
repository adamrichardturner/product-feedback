import useFeedback from "@/hooks/feedback/useFeedback"
import { FeedbackCardProps } from "../../../types/feedback/index"
import { useEffect, useState } from "react"

const useRoadMap = () => {
  const [planned, setPlanned] = useState<FeedbackCardProps[] | null>(null)
  const [inProgress, setInProgress] = useState<FeedbackCardProps[] | null>(null)
  const [live, setLive] = useState<FeedbackCardProps[] | null>(null)

  const {
    feedbackData,
    updateFeedbackData,
    filterFeedbackByStatus,
    getAllFeedbackData,
  } = useFeedback()

  useEffect(() => {
    const fetchPlanned = filterFeedbackByStatus(feedbackData, "planned")
    const fetchInProgress = filterFeedbackByStatus(feedbackData, "progress")
    const fetchLive = filterFeedbackByStatus(feedbackData, "live")
    setPlanned(fetchPlanned)
    setInProgress(fetchInProgress)
    setLive(fetchLive)
  }, [feedbackData])

  return {
    planned,
    inProgress,
    live,
  }
}

export default useRoadMap
