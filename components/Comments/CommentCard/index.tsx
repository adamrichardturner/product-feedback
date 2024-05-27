interface CommentCardProps {
  id: string
  feedback_id: string
  user_id: string
  inserted_at: string
  last_edited: string
  content: string
}

function CommentCard({
  id,
  feedback_id,
  user_id,
  inserted_at,
  last_edited,
  content,
}: CommentCardProps) {}

export default CommentCard
