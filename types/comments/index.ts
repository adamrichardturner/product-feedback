export interface UserType {
  username: string
  full_name: string
  avatar_url: string
}

export interface CommentType {
  profiles: any
  id: string
  feedback_id: string
  user_id: string
  parent_comment_id: string | null
  content: string
  inserted_at: string
  replies: CommentType[]
}
