import { CategoriesType } from "../categories"

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
  category_id: CategoriesType
  comments: string[]
  status: string
  upvotes: number
  detail: string
  upvotedByUser: boolean
}

export interface FeedbackCardProps {
  id: string
  user_id: string
  title: string
  detail: string
  category_id: CategoriesType
  comments: string[]
  status: string
  upvotes: number
  authUserId?: string
  upvotedByUser: boolean
}
