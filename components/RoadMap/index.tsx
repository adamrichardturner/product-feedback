"use client"

import { FeedbackCardProps } from "@/types/feedback"
import useRoadMap from "./hooks/useRoadMap"
import RoadMapCard from "./RoadMapCard"

const RoadMap = () => {
  const { planned, inProgress, live, isAuth } = useRoadMap()

  console.log(planned)

  if (!planned || !inProgress || !live) {
    return null
  }

  return (
    <div className='flex gap-[30px] pt-[48px]'>
      <section className='w-full max-w-[350px]'>
        <div>
          <h3 className='text-txt-primary text-[18px] font-bold tracking-[-0.25px]'>
            Planned ({planned.length})
          </h3>
          <span className='text-txt-secondary text-[16px]'>
            Ideas prioritized for research
          </span>
        </div>
        <div className='flex flex-wrap flex-col gap-6 mt-8'>
          {planned.map((card) => (
            <RoadMapCard
              feedback_id={card.id}
              status={card.status}
              title={card.title}
              detail={card.detail}
              category_id={card.category_id}
              commentCount={card.comments}
              upvotes={card.upvotes}
              upvotedByUser={card.upvotedByUser}
              isAuth={isAuth}
            />
          ))}
        </div>
      </section>
      <section className='w-full max-w-[350px]'>
        <div>
          <h3 className='text-txt-primary text-[18px] font-bold tracking-[-0.25px]'>
            In-Progress ({inProgress.length})
          </h3>
          <span className='text-txt-secondary text-[16px]'>
            Currently being developed
          </span>
        </div>
        <div className='flex flex-wrap flex-col gap-6 mt-8'>
          {inProgress.map((card) => (
            <RoadMapCard
              feedback_id={card.id}
              status={card.status}
              title={card.title}
              detail={card.detail}
              category_id={card.category_id}
              commentCount={card.comments}
              upvotes={card.upvotes}
              upvotedByUser={card.upvotedByUser}
              isAuth={isAuth}
            />
          ))}
        </div>
      </section>
      <section className='w-full max-w-[350px]'>
        <div>
          <h3 className='text-txt-primary text-[18px] font-bold tracking-[-0.25px]'>
            Live ({live.length})
          </h3>
          <span className='text-txt-secondary text-[16px]'>
            Released features
          </span>
        </div>
        <div className='flex flex-wrap flex-col gap-6 mt-8'>
          {live.map((card) => (
            <RoadMapCard
              feedback_id={card.id}
              status={card.status}
              title={card.title}
              detail={card.detail}
              category_id={card.category_id}
              commentCount={card.comments}
              upvotes={card.upvotes}
              upvotedByUser={card.upvotedByUser}
              isAuth={isAuth}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default RoadMap
