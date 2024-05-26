import { toggleUpvote } from "@/services/votingService"
import { useCallback } from "react"
import { useFeedbackStore } from "@/stores/FeedbackState/useFeedbackStore"

const useVoting = () => {
  const toggleUpvoteState = useFeedbackStore((state) => state.toggleUpvote)
  const toggleUserUpvote = useCallback(async (feedbackId: string) => {
    toggleUpvoteState(feedbackId)
  }, [])

  return {
    toggleUserUpvote,
  }
}

export default useVoting
