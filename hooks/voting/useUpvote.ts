"use client"

import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"
import useFeedbackCache from "@/hooks/feedback/useFeedbackCache"
import { applyVoteToCachedValue, FeedbackVote } from "@/lib/feedbackCache"

interface ToggleUpvoteInput {
  feedbackId: string
  upvotes: number
  upvotedByUser: boolean
}

export default function useUpvote() {
  const { getFeedbackKeys, snapshotFeedback, restoreFeedback, updateFeedback } =
    useFeedbackCache()
  const [isPending, setIsPending] = useState(false)
  const inFlightRef = useRef(false)

  const toggleUpvote = useCallback(
    async ({ feedbackId, upvotes, upvotedByUser }: ToggleUpvoteInput) => {
      if (inFlightRef.current) {
        return
      }

      const vote: FeedbackVote = {
        feedbackId,
        upvotes: upvotedByUser ? upvotes - 1 : upvotes + 1,
        upvotedByUser: !upvotedByUser,
      }

      const keys = getFeedbackKeys()
      const snapshots = snapshotFeedback(keys)

      inFlightRef.current = true
      setIsPending(true)

      await updateFeedback(keys, (current) =>
        applyVoteToCachedValue(current, vote)
      )

      try {
        const response = await fetch("/api/feedback/upvote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedbackId }),
        })

        if (!response.ok) {
          throw new Error("Failed to toggle upvote.")
        }
      } catch (error) {
        console.error("Error toggling vote:", error)

        await restoreFeedback(snapshots)
        toast.error("Could not save your vote. Please try again.")
      } finally {
        inFlightRef.current = false
        setIsPending(false)
      }
    },
    [getFeedbackKeys, restoreFeedback, snapshotFeedback, updateFeedback]
  )

  return { toggleUpvote, isPending }
}
