"use client"

import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useState } from "react"
import useRoadMap from "./hooks/useRoadMap"
import RoadMapCard from "./RoadMapCard"
import SortableItem from "./SortableItem"
import DroppableContainer from "./DroppableContainer"
import { FeedbackCardProps } from "@/types/feedback"
import { DragEndEvent } from "@dnd-kit/core"

const RoadMap = () => {
  const {
    planned,
    inProgress,
    live,
    isAuth,
    handleStatusChange,
    handleOrderChange,
  } = useRoadMap()
  const [activeId, setActiveId] = useState<UniqueIdentifier>("")
  const [activeCard, setActiveCard] = useState<FeedbackCardProps | null>(null)

  if (!planned || !inProgress || !live) {
    return null
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)
    const card = planned
      .concat(inProgress, live)
      .find((card) => card.id === active.id)
    if (card) {
      setActiveCard(card)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId("")
    setActiveCard(null)

    if (!over) return

    const activeCard = planned
      .concat(inProgress, live)
      .find((card) => card.id === active.id)

    if (activeCard) {
      // If dropped in a different section
      if (over.data.current && over.data.current.type !== activeCard.status) {
        await handleStatusChange(active.id, over.data.current.type)
      } else if (active.id !== over.id) {
        // Handle reordering within the same section
        await handleOrderChange(activeCard.status, active.id, over.id)
      }
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className='flex gap-[30px] pt-[48px] w-full h-full flex-grow'>
        <DroppableContainer id='planned'>
          <section className='w-full flex-1'>
            <div className='w-full'>
              <h3 className='text-txt-primary text-[18px] font-bold tracking-[-0.25px]'>
                Planned ({planned.length})
              </h3>
              <span className='text-txt-secondary text-[16px]'>
                Ideas prioritized for research
              </span>
            </div>
            <SortableContext
              items={planned.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className='flex flex-wrap flex-col gap-6 mt-8'>
                {planned.map((card) => (
                  <SortableItem
                    key={card.id}
                    id={card.id}
                    data={{ type: "planned" }}
                  >
                    <RoadMapCard
                      feedback_id={card.id}
                      status={card.status}
                      title={card.title}
                      detail={card.detail}
                      category={card.category}
                      commentCount={card.comments}
                      upvotes={card.upvotes}
                      upvotedByUser={card.upvotedByUser}
                      isAuth={isAuth}
                    />
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </section>
        </DroppableContainer>

        <DroppableContainer id='progress'>
          <section className='w-full max-w-[350px] flex-1'>
            <div>
              <h3 className='text-txt-primary text-[18px] font-bold tracking-[-0.25px]'>
                In-Progress ({inProgress.length})
              </h3>
              <span className='text-txt-secondary text-[16px]'>
                Currently being developed
              </span>
            </div>
            <SortableContext
              items={inProgress.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className='flex flex-wrap flex-col gap-6 mt-8'>
                {inProgress.map((card) => (
                  <SortableItem
                    key={card.id}
                    id={card.id}
                    data={{ type: "progress" }}
                  >
                    <RoadMapCard
                      feedback_id={card.id}
                      status={card.status}
                      title={card.title}
                      detail={card.detail}
                      category={card.category}
                      commentCount={card.comments}
                      upvotes={card.upvotes}
                      upvotedByUser={card.upvotedByUser}
                      isAuth={isAuth}
                    />
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </section>
        </DroppableContainer>

        <DroppableContainer id='live'>
          <section className='w-full max-w-[350px] flex-1'>
            <div>
              <h3 className='text-txt-primary text-[18px] font-bold tracking-[-0.25px]'>
                Live ({live.length})
              </h3>
              <span className='text-txt-secondary text-[16px]'>
                Released features
              </span>
            </div>
            <SortableContext
              items={live.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className='flex flex-wrap flex-col gap-6 mt-8'>
                {live.map((card) => (
                  <SortableItem
                    key={card.id}
                    id={card.id}
                    data={{ type: "live" }}
                  >
                    <RoadMapCard
                      feedback_id={card.id}
                      status={card.status}
                      title={card.title}
                      detail={card.detail}
                      category={card.category}
                      commentCount={card.comments}
                      upvotes={card.upvotes}
                      upvotedByUser={card.upvotedByUser}
                      isAuth={isAuth}
                    />
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </section>
        </DroppableContainer>
      </div>

      <DragOverlay>
        {activeCard ? (
          <RoadMapCard
            feedback_id={activeCard.id}
            status={activeCard.status}
            title={activeCard.title}
            detail={activeCard.detail}
            category={activeCard.category}
            commentCount={activeCard.comments}
            upvotes={activeCard.upvotes}
            upvotedByUser={activeCard.upvotedByUser}
            isAuth={isAuth}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default RoadMap
