export interface UserType {
  username: string
  full_name: string
  avatar_url: string | null
}

export interface CommentType {
  id: string
  feedback_id: string
  user_id: string
  parent_comment_id: string | null
  content: string
  inserted_at: string
  profiles?: UserType | null
  replies: CommentType[]
}

export interface CommentProfile {
  username: string
  full_name: string
  avatar_url: string | null
}

export interface RawComment {
  id: string
  feedback_id: string
  user_id: string
  parent_comment_id: string | null
  content: string
  inserted_at: string
  profiles: CommentProfile
}
