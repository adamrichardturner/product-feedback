import { CategoriesType } from "../categories"
import { CommentType } from "../comments"

export interface NewFeedbackType {
  title: string
  category: string
  detail: string
}

export interface UpdatedFeedbackType {
  title: string
  category: string
  status: string
  detail: string
}

export interface FeedbackType {
  id: string
  user_id: string
  inserted_at: string
  updated_at: string
  title: string
  category_id: CategoriesType
  comments: number
  status: string
  upvotes: number
  votes?: { user_id: string }[]
  detail: string
  upvotedByUser: boolean
}

export interface FeedbackCardProps {
  id: string
  user_id: string
  title: string
  detail: string
  category_id: CategoriesType
  comments: number
  status: string
  upvotes: number
  authUserId?: string
  upvotedByUser: boolean
}

export interface SingleFeedbackCardProps {
  id: string
  user_id: string
  title: string
  detail: string
  category_id: CategoriesType
  comments: CommentType[]
  status: string
  upvotes: number
  authUserId?: string
  upvotedByUser: boolean
}
