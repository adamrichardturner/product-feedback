import useFeedback from "@/hooks/feedback/useFeedback"
import { FeedbackCardProps } from "../../../types/feedback/index"
import { useEffect, useState } from "react"
import useUser from "@/hooks/user/useUser"

const useRoadMap = () => {
  const [planned, setPlanned] = useState<FeedbackCardProps[] | null>(null)
  const [inProgress, setInProgress] = useState<FeedbackCardProps[] | null>(null)
  const [live, setLive] = useState<FeedbackCardProps[] | null>(null)

  const {
    feedbackData,
    updateFeedbackData,
    filterFeedbackByStatus,
    getAllFeedbackData,
    loading,
  } = useFeedback()

  const { isAuth, updateUserAuth } = useUser()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await updateUserAuth()
      } catch (error) {
        console.error("Error")
      }
    }
    const fetchPlanned = filterFeedbackByStatus(feedbackData, "planned")
    const fetchInProgress = filterFeedbackByStatus(feedbackData, "progress")
    const fetchLive = filterFeedbackByStatus(feedbackData, "live")
    setPlanned(fetchPlanned)
    setInProgress(fetchInProgress)
    setLive(fetchLive)
    fetchUser()
  }, [feedbackData, isAuth])

  return {
    planned,
    inProgress,
    live,
    loading,
    isAuth,
  }
}

export default useRoadMap
