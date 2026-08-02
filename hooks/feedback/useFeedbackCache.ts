"use client"

import { useCallback } from "react"
import { useSWRConfig } from "swr"
import { isFeedbackCacheKey } from "@/lib/feedbackCache"

export interface FeedbackCacheSnapshot {
  key: string
  data: unknown
}

/**
 * Feedback caches must be addressed by explicit key rather than a key filter,
 * because SWR skips the `$inf$` keys that back `useSWRInfinite` whenever a
 * filter function is used. Those keys hold the data the list actually renders.
 */
export default function useFeedbackCache() {
  const { cache, mutate } = useSWRConfig()

  const getFeedbackKeys = useCallback((): string[] => {
    return Array.from(cache.keys()).filter(isFeedbackCacheKey)
  }, [cache])

  const snapshotFeedback = useCallback(
    (keys: string[]): FeedbackCacheSnapshot[] => {
      return keys.map((key) => ({ key, data: cache.get(key)?.data }))
    },
    [cache]
  )

  const restoreFeedback = useCallback(
    async (snapshots: FeedbackCacheSnapshot[]): Promise<void> => {
      const restorable = snapshots.filter(
        (snapshot) => snapshot.data !== undefined
      )

      await Promise.all(
        restorable.map((snapshot) =>
          mutate<unknown>(snapshot.key, snapshot.data, { revalidate: false })
        )
      )
    },
    [mutate]
  )

  const updateFeedback = useCallback(
    async (
      keys: string[],
      update: (current: unknown) => unknown
    ): Promise<void> => {
      await Promise.all(
        keys.map((key) => mutate<unknown>(key, update, { revalidate: false }))
      )
    },
    [mutate]
  )

  const revalidateFeedback = useCallback(async (): Promise<void> => {
    await Promise.all(getFeedbackKeys().map((key) => mutate(key)))
  }, [getFeedbackKeys, mutate])

  return {
    getFeedbackKeys,
    snapshotFeedback,
    restoreFeedback,
    updateFeedback,
    revalidateFeedback,
  }
}
