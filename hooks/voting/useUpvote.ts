"use client"

import { mutate } from "swr"
import { FeedbackType, PaginatedFeedbackResponse } from "@/types/feedback"
import {
  isFeedbackListKey,
  isPaginatedFeedbackListKey,
} from "@/hooks/feedback/useInfiniteFeedback"

function updateFeedbackVote(
  feedback: FeedbackType,
  feedbackId: string,
  newUpvoteCount: number,
  newUpvotedByUser: boolean
): FeedbackType {
  if (feedback.id !== feedbackId) {
    return feedback
  }

  return {
    ...feedback,
    upvotes: newUpvoteCount,
    upvotedByUser: newUpvotedByUser,
  }
}

const toggleUpvote = async (
  feedbackId: string,
  currentUpvotes: number,
  currentUpvotedByUser: boolean
): Promise<void> => {
  try {
    const newUpvoteCount = currentUpvotedByUser
      ? currentUpvotes - 1
      : currentUpvotes + 1
    const newUpvotedByUser = !currentUpvotedByUser

    mutate(
      isPaginatedFeedbackListKey,
      (currentData: PaginatedFeedbackResponse[] | undefined) => {
        if (!currentData) {
          return currentData
        }

        return currentData.map((page) => ({
          ...page,
          data: page.data.map((feedback) =>
            updateFeedbackVote(
              feedback,
              feedbackId,
              newUpvoteCount,
              newUpvotedByUser
            )
          ),
        }))
      },
      false
    )

    mutate(
      (key) => isFeedbackListKey(key) && key === "/api/feedback",
      (currentData: FeedbackType[] | undefined) => {
        if (!currentData) {
          return currentData
        }

        return currentData.map((feedback) =>
          updateFeedbackVote(
            feedback,
            feedbackId,
            newUpvoteCount,
            newUpvotedByUser
          )
        )
      },
      false
    )

    mutate(
      `/api/feedback/single?feedback_id=${feedbackId}`,
      (currentData: FeedbackType | undefined) => {
        if (!currentData) {
          return currentData
        }

        return {
          ...currentData,
          upvotes: newUpvoteCount,
          upvotedByUser: newUpvotedByUser,
        }
      },
      false
    )

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

    await Promise.all([
      mutate(isFeedbackListKey),
      mutate(`/api/feedback/single?feedback_id=${feedbackId}`),
    ])
  } catch (error) {
    console.error("Error toggling vote:", error)

    await Promise.all([
      mutate(isFeedbackListKey),
      mutate(`/api/feedback/single?feedback_id=${feedbackId}`),
    ])

    throw new Error("Failed to toggle upvote.")
  }
}

export default toggleUpvote
