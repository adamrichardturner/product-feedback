import { FeedbackType, PaginatedFeedbackResponse } from "@/types/feedback"

/**
 * SWR Infinite stores the combined pages under a prefixed key. Its cache entry
 * holds an array of pages, while each page is also cached under its own
 * unprefixed request key.
 */
const INFINITE_PREFIX = "$inf$"

export interface FeedbackVote {
  feedbackId: string
  upvotes: number
  upvotedByUser: boolean
}

function stripInfinitePrefix(key: string): string {
  if (!key.startsWith(INFINITE_PREFIX)) {
    return key
  }

  return key.slice(INFINITE_PREFIX.length)
}

export function isFeedbackListKey(key: unknown): key is string {
  if (typeof key !== "string") {
    return false
  }

  const path = stripInfinitePrefix(key)

  if (!path.startsWith("/api/feedback")) {
    return false
  }

  if (path.includes("/single")) {
    return false
  }

  if (path.includes("/comments")) {
    return false
  }

  return !path.includes("/upvote")
}

export function isSingleFeedbackKey(key: unknown): key is string {
  if (typeof key !== "string") {
    return false
  }

  return key.startsWith("/api/feedback/single")
}

export function isFeedbackCacheKey(key: unknown): key is string {
  return isFeedbackListKey(key) || isSingleFeedbackKey(key)
}

function isFeedbackItem(value: unknown): value is FeedbackType {
  if (typeof value !== "object" || value === null) {
    return false
  }

  if (!("id" in value) || !("upvotes" in value)) {
    return false
  }

  return typeof value.id === "string" && typeof value.upvotes === "number"
}

function isPaginatedFeedbackResponse(
  value: unknown
): value is PaginatedFeedbackResponse {
  if (typeof value !== "object" || value === null) {
    return false
  }

  if (!("data" in value)) {
    return false
  }

  return Array.isArray(value.data)
}

function applyVoteToFeedback(
  feedback: FeedbackType,
  vote: FeedbackVote
): FeedbackType {
  if (feedback.id !== vote.feedbackId) {
    return feedback
  }

  return {
    ...feedback,
    upvotes: vote.upvotes,
    upvotedByUser: vote.upvotedByUser,
  }
}

/**
 * Applies a vote to any cached feedback shape: an array of infinite pages, a
 * single page, a flat feedback list, or a single feedback item.
 */
export function applyVoteToCachedValue(
  value: unknown,
  vote: FeedbackVote
): unknown {
  if (Array.isArray(value)) {
    return value.map((entry: unknown) => applyVoteToCachedValue(entry, vote))
  }

  if (isPaginatedFeedbackResponse(value)) {
    return {
      ...value,
      data: value.data.map((feedback) => applyVoteToFeedback(feedback, vote)),
    }
  }

  if (isFeedbackItem(value)) {
    return applyVoteToFeedback(value, vote)
  }

  return value
}
