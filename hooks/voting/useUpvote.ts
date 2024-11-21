import { useState } from "react"
import { toggleUpvote } from "@/services/votingService"
import { mutate } from "swr"

export const useUpvote = () => {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpvote = async (
    feedbackId: string,
    currentUpvotes: number,
    currentUpvotedByUser: boolean
  ) => {
    if (isUpdating) return

    setIsUpdating(true)

    // Optimistically update the UI for both the list and single view
    mutate(
      "/api/feedback",
      (currentData: any) =>
        currentData?.map((feedback: any) =>
          feedback.id === feedbackId
            ? {
                ...feedback,
                upvotes: currentUpvotedByUser
                  ? currentUpvotes - 1
                  : currentUpvotes + 1,
                upvotedByUser: !currentUpvotedByUser,
              }
            : feedback
        ),
      false
    )

    // Update single feedback view
    mutate(
      `/api/feedback/single?feedback_id=${feedbackId}`,
      (currentData: any) => ({
        ...currentData,
        upvotes: currentUpvotedByUser ? currentUpvotes - 1 : currentUpvotes + 1,
        upvotedByUser: !currentUpvotedByUser,
      }),
      false
    )

    try {
      await toggleUpvote(feedbackId)
      // Revalidate both endpoints after successful update
      await Promise.all([
        mutate("/api/feedback"),
        mutate(`/api/feedback/single?feedback_id=${feedbackId}`),
      ])
    } catch (error) {
      // Revert optimistic updates on error
      await Promise.all([
        mutate("/api/feedback"),
        mutate(`/api/feedback/single?feedback_id=${feedbackId}`),
      ])
      console.error("Failed to update vote:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return { handleUpvote, isUpdating }
}
