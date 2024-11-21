"use client"

import { mutate } from "swr"
import { FeedbackType } from "@/types/feedback"

const toggleUpvote = async (
  feedbackId: string,
  currentUpvotes: number,
  currentUpvotedByUser: boolean
): Promise<void> => {
  try {
    // Calculate new upvote count
    const newUpvoteCount = currentUpvotedByUser
      ? currentUpvotes - 1
      : currentUpvotes + 1

    // Optimistic UI update for the list view
    mutate<FeedbackType[]>(
      "/api/feedback",
      (currentData) =>
        currentData?.map((feedback) =>
          feedback.id === feedbackId
            ? {
                ...feedback,
                upvotes: newUpvoteCount,
                upvotedByUser: !currentUpvotedByUser,
              }
            : feedback
        ) || [],
      false
    )

    // Optimistic UI update for the single feedback view
    mutate<FeedbackType>(
      `/api/feedback/single?feedback_id=${feedbackId}`,
      (currentData) => ({
        ...currentData!,
        upvotes: newUpvoteCount,
        upvotedByUser: !currentUpvotedByUser,
      }),
      false
    )

    // Perform the API call
    const response = await fetch("/api/feedback/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedbackId }),
    })

    if (!response.ok) {
      throw new Error("Failed to toggle upvote.")
    }

    // Revalidate SWR data after successful API call
    await Promise.all([
      mutate("/api/feedback"),
      mutate(`/api/feedback/single?feedback_id=${feedbackId}`),
    ])
  } catch (error) {
    console.error("Error toggling vote:", error)

    // Revert optimistic updates on error
    await Promise.all([
      mutate("/api/feedback"),
      mutate(`/api/feedback/single?feedback_id=${feedbackId}`),
    ])

    throw new Error("Failed to toggle upvote.")
  }
}

export default toggleUpvote
