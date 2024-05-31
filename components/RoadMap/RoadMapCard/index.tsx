interface RoadMapCardProps {
  feedback_id: string
  status: string
  title: string
  detail: string
  category_id: string
  commentCount: number
}

const RoadMapCard = ({
  feedback_id,
  status,
  title,
  detail,
  category_id,
  commentCount,
}: RoadMapCardProps) => {
  return (
    <article className='bg-red-400 w-[120px] h-[120px]'>Title: {title}</article>
  )
}

export default RoadMapCard
