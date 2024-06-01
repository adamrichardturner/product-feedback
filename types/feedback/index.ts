import { CategoriesType } from "../categories"
import { CommentType } from "../comments"

export interface NewFeedbackType {
  title: string
  category: string
  detail: string
  order?: number
}

export interface UpdatedFeedbackType {
  id?: string
  title: string
  category: string
  status: string
  detail: string
  order: number | null
}

export interface FeedbackType {
  id: string
  user_id: string
  inserted_at: string
  updated_at: string
  title: string
  category: CategoriesType
  comments: number
  status: string
  upvotes: number
  votes?: { user_id: string }[]
  detail: string
  upvotedByUser: boolean
  order: number | null
}

export interface FeedbackCardProps {
  id: string
  user_id: string
  title: string
  detail: string
  category: CategoriesType
  comments: number
  status: string
  upvotes: number
  authUserId?: string
  upvotedByUser: boolean
  isAuth?: boolean
}

export interface SingleFeedbackCardProps {
  id: string
  user_id: string
  title: string
  detail: string
  category: CategoriesType
  comments: CommentType[]
  status: string
  upvotes: number
  isAuth: boolean
  upvotedByUser: boolean
}
