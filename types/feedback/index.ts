export interface NewFeedbackType {
  title: string
  category: string
  detail: string
}

export interface FeedbackType {
  id: string
  user_id: string
  inserted_at: string
  updated_at: string
  title: string
  category_id: string
  comments: string[]
  status: string
  upvotes: number
  detail: string
}
