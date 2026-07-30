import useSWRInfinite from "swr/infinite"
import { useCallback, useMemo } from "react"
import useFeedback from "@/hooks/feedback/useFeedback"
import { useCategoriesStore } from "@/stores/CategoriesState/useCategoriesStore"
import {
  FeedbackStatusCounts,
  FeedbackType,
  PaginatedFeedbackResponse,
} from "@/types/feedback"

export const FEEDBACK_PAGE_SIZE = 8

export function isFeedbackListKey(key: unknown): key is string {
  if (typeof key !== "string") {
    return false
  }

  if (!key.startsWith("/api/feedback")) {
    return false
  }

  if (key.includes("/single")) {
    return false
  }

  if (key.includes("/comments")) {
    return false
  }

  if (key.includes("/upvote")) {
    return false
  }

  return true
}

export function isPaginatedFeedbackListKey(key: unknown): key is string {
  return isFeedbackListKey(key) && key.includes("limit=")
}

function buildFeedbackListKey({
  pageIndex,
  previousPageData,
  sort,
  category,
}: {
  pageIndex: number
  previousPageData: PaginatedFeedbackResponse | null
  sort: string
  category: string
}): string | null {
  if (previousPageData && !previousPageData.hasMore) {
    return null
  }

  const params = new URLSearchParams({
    limit: String(FEEDBACK_PAGE_SIZE),
    sort,
    category,
  })

  if (pageIndex > 0) {
    if (!previousPageData?.nextCursor) {
      return null
    }

    params.set("cursor", previousPageData.nextCursor)
  }

  return `/api/feedback?${params.toString()}`
}

export default function useInfiniteFeedback() {
  const { selectedFilter } = useFeedback()
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory)

  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite<PaginatedFeedbackResponse>(
      (pageIndex, previousPageData) =>
        buildFeedbackListKey({
          pageIndex,
          previousPageData,
          sort: selectedFilter,
          category: selectedCategory,
        }),
      {
        revalidateFirstPage: true,
        persistSize: false,
      }
    )

  const feedbackItems = useMemo(() => {
    if (!data) {
      return [] as FeedbackType[]
    }

    const items: FeedbackType[] = []

    for (const page of data) {
      for (const item of page.data) {
        if (!item?.id) {
          continue
        }

        items.push(item)
      }
    }

    return items
  }, [data])

  const total = data?.[0]?.total ?? 0
  const statusCounts: FeedbackStatusCounts = data?.[0]?.statusCounts ?? {
    suggestion: 0,
    planned: 0,
    progress: 0,
    live: 0,
  }
  const hasMore = data?.[data.length - 1]?.hasMore ?? false
  const isLoadingMore =
    isValidating && size > 0 && typeof data?.[size - 1] === "undefined"
  const isRefreshing = isValidating && data !== undefined && !isLoadingMore

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore || isValidating) {
      return
    }

    void setSize(size + 1)
  }, [hasMore, isLoadingMore, isValidating, setSize, size])

  return {
    feedbackItems,
    total,
    statusCounts,
    hasMore,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    loadMore,
    mutate,
    size,
    setSize,
  }
}
