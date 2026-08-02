import useSWRInfinite from "swr/infinite"
import { useCallback, useMemo, useRef } from "react"
import useFeedback from "@/hooks/feedback/useFeedback"
import { useCategoriesStore } from "@/stores/CategoriesState/useCategoriesStore"
import {
  FeedbackStatusCounts,
  FeedbackType,
  PaginatedFeedbackResponse,
} from "@/types/feedback"

export const FEEDBACK_PAGE_SIZE = 8

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

interface FeedbackCounts {
  total: number
  statusCounts: FeedbackStatusCounts
}

const EMPTY_COUNTS: FeedbackCounts = {
  total: 0,
  statusCounts: { suggestion: 0, planned: 0, progress: 0, live: 0 },
}

export default function useInfiniteFeedback() {
  const { selectedFilter } = useFeedback()
  const selectedCategory = useCategoriesStore((state) => state.selectedCategory)
  /**
   * Changing filters clears the pages while the new ones load. Retaining the
   * last known counts keeps the surrounding widgets steady instead of briefly
   * dropping them all to zero.
   */
  const lastCountsRef = useRef<FeedbackCounts>(EMPTY_COUNTS)

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

  const firstPage = data?.[0]

  if (firstPage) {
    lastCountsRef.current = {
      total: firstPage.total,
      statusCounts: firstPage.statusCounts,
    }
  }

  const { total, statusCounts } = lastCountsRef.current
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
