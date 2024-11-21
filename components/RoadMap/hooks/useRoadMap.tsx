import useSWR from "swr"
import { FeedbackCardProps, FeedbackType } from "../../../types/feedback"
import { useCallback } from "react"
import { arrayMove } from "@dnd-kit/sortable"
import { UniqueIdentifier } from "@dnd-kit/core"

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch")
  }
  return response.json()
}

const useRoadMap = () => {
  const {
    data: feedbackData,
    error,
    isLoading,
    mutate,
  } = useSWR<FeedbackType[]>("/api/feedback", fetcher)

  const planned =
    feedbackData?.filter((item: FeedbackType) => item.status === "planned") ||
    []
  const inProgress =
    feedbackData?.filter((item: FeedbackType) => item.status === "progress") ||
    []
  const live =
    feedbackData?.filter((item: FeedbackType) => item.status === "live") || []

  const handleStatusChange = useCallback(
    async (id: UniqueIdentifier, newStatus: string) => {
      const updatedFeedback = feedbackData?.find(
        (item: FeedbackType) => item.id === id
      )
      if (!updatedFeedback) return

      try {
        // Optimistically update the UI
        mutate(
          feedbackData?.map((item: FeedbackType) =>
            item.id === id ? { ...item, status: newStatus, order: null } : item
          ),
          false
        )

        await fetch(`/api/feedback`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            title: updatedFeedback.title,
            detail: updatedFeedback.detail,
            category: updatedFeedback.category,
            status: newStatus,
            order: null,
          }),
        })

        // Revalidate the data
        await mutate()
      } catch (error) {
        console.error(error)
        // Revert on error
        await mutate()
      }
    },
    [feedbackData, mutate]
  )

  const handleOrderChange = useCallback(
    async (
      status: string,
      activeId: UniqueIdentifier,
      overId: UniqueIdentifier
    ) => {
      const items =
        feedbackData?.filter((item: FeedbackType) => item.status === status) ||
        []
      const activeIndex = items.findIndex(
        (item: FeedbackType) => item.id === activeId
      )
      const overIndex = items.findIndex(
        (item: FeedbackType) => item.id === overId
      )

      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(items, activeIndex, overIndex)
        const updatedOrders = newItems.map(
          (item: FeedbackType, index: number) => ({
            id: item.id,
            order: index,
          })
        )

        try {
          // Optimistically update the UI
          mutate(
            feedbackData?.map((item: FeedbackType) => {
              const updatedOrder = updatedOrders.find((u) => u.id === item.id)
              return updatedOrder
                ? { ...item, order: updatedOrder.order }
                : item
            }),
            false
          )

          // Update all items in parallel
          await Promise.all(
            updatedOrders.map((item) => {
              const feedback = feedbackData?.find(
                (f: FeedbackType) => f.id === item.id
              )
              if (!feedback) return Promise.resolve()

              return fetch(`/api/feedback`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: item.id,
                  title: feedback.title,
                  detail: feedback.detail,
                  category: feedback.category,
                  status: feedback.status,
                  order: item.order,
                }),
              })
            })
          )

          // Revalidate the data
          await mutate()
        } catch (error) {
          console.error(error)
          // Revert on error
          await mutate()
        }
      }
    },
    [feedbackData, mutate]
  )

  return {
    planned,
    inProgress,
    live,
    isLoading,
    error,
    handleStatusChange,
    handleOrderChange,
  }
}

export default useRoadMap
