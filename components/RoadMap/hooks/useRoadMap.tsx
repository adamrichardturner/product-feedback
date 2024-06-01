import useFeedback from "@/hooks/feedback/useFeedback"
import { FeedbackCardProps, FeedbackType } from "../../../types/feedback"
import { useEffect, useState, useCallback } from "react"
import useUser from "@/hooks/user/useUser"
import { arrayMove } from "@dnd-kit/sortable"
import { UniqueIdentifier } from "@dnd-kit/core"

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
  }, [feedbackData, isAuth, filterFeedbackByStatus, updateUserAuth])

  const handleStatusChange = useCallback(
    async (id: UniqueIdentifier, newStatus: string) => {
      const updatedFeedback = feedbackData.find((item) => item.id === id)
      if (updatedFeedback) {
        const updatedFeedbackData = {
          ...updatedFeedback,
          status: newStatus,
          order: null,
        }

        try {
          await updateFeedbackData(updatedFeedbackData)
          const refreshedFeedbackData =
            (await getAllFeedbackData()) as unknown as FeedbackType[]

          if (!refreshedFeedbackData) return

          setPlanned(filterFeedbackByStatus(refreshedFeedbackData, "planned"))
          setInProgress(
            filterFeedbackByStatus(refreshedFeedbackData, "progress")
          )
          setLive(filterFeedbackByStatus(refreshedFeedbackData, "live"))
        } catch (error) {
          console.error(error)
        }
      }
    },
    [
      feedbackData,
      updateFeedbackData,
      getAllFeedbackData,
      filterFeedbackByStatus,
    ]
  )

  const handleOrderChange = useCallback(
    async (
      status: string,
      activeId: UniqueIdentifier,
      overId: UniqueIdentifier
    ) => {
      const items = feedbackData.filter((item) => item.status === status)
      const activeIndex = items.findIndex((item) => item.id === activeId)
      const overIndex = items.findIndex((item) => item.id === overId)

      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(items, activeIndex, overIndex)
        for (let i = 0; i < newItems.length; i++) {
          newItems[i].order = i
          await updateFeedbackData({
            id: newItems[i].id,
            title: newItems[i].title,
            detail: newItems[i].detail,
            category: newItems[i].category,
            status: newItems[i].status,
            order: newItems[i].order,
          })
        }
        const refreshedFeedbackData =
          (await getAllFeedbackData()) as unknown as FeedbackType[]
        if (!refreshedFeedbackData) return
        setPlanned(filterFeedbackByStatus(refreshedFeedbackData, "planned"))
        setInProgress(filterFeedbackByStatus(refreshedFeedbackData, "progress"))
        setLive(filterFeedbackByStatus(refreshedFeedbackData, "live"))
      }
    },
    [
      feedbackData,
      updateFeedbackData,
      getAllFeedbackData,
      filterFeedbackByStatus,
    ]
  )

  return {
    planned,
    inProgress,
    live,
    loading,
    isAuth,
    handleStatusChange,
    handleOrderChange,
  }
}

export default useRoadMap
