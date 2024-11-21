"use client"

import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useState, useEffect } from "react"
import useRoadMap from "./hooks/useRoadMap"
import RoadMapCard from "./RoadMapCard"
import SortableItem from "./SortableItem"
import DroppableContainer from "./DroppableContainer"
import { FeedbackCardProps } from "@/types/feedback"
import { DragEndEvent } from "@dnd-kit/core"
import RoadMapMobileNavigation from "./RoadMapMobileNavigation"
import { useMediaQuery } from "usehooks-ts"

const RoadMap = () => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const { planned, inProgress, live, handleStatusChange, handleOrderChange } =
    useRoadMap()
  const [activeCard, setActiveCard] = useState<FeedbackCardProps | null>(null)
  const [activeTab, setActiveTab] = useState<string>("planned")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!planned || !inProgress || !live) {
    return null
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const card = planned
      .concat(inProgress, live)
      .find((card) => card.id === active.id)
    if (card) {
      setActiveCard(card)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
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

  const renderSection = (
    title: string,
    items: FeedbackCardProps[],
    sectionId: string,
    extraClasses: string = ""
  ) => (
    <DroppableContainer id={sectionId}>
      <section className={`w-full flex-1 ${extraClasses}`}>
        <div className='w-full'>
          <h3 className='text-[18px] font-bold tracking-[-0.25px] text-txt-primary'>
            {title} ({items.length})
          </h3>
          <span className='text-[16px] text-txt-secondary'>
            {sectionId === "planned" && "Ideas prioritized for research"}
            {sectionId === "progress" && "Currently being developed"}
            {sectionId === "live" && "Released features"}
          </span>
        </div>
        <SortableContext
          items={items.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className='mt-8 flex flex-col flex-wrap gap-4 md:gap-6'>
            {items.map((card) => (
              <SortableItem
                key={card.id}
                id={card.id}
                data={{ type: sectionId }}
                isLargeScreen={isLargeScreen}
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
                />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </section>
    </DroppableContainer>
  )

  return (
    <div>
      <RoadMapMobileNavigation
        plannedCount={planned.length}
        progressCount={inProgress.length}
        liveCount={live.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {isLargeScreen ? (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <div className='flex h-full w-full flex-grow space-x-4 pt-[48px]'>
            {renderSection("Planned", planned, "planned")}

            {renderSection("In-Progress", inProgress, "progress")}

            {renderSection("Live", live, "live")}
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
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className='flex h-full w-full flex-grow px-6 pt-[48px] md:hidden'>
          {activeTab === "planned" &&
            renderSection("Planned", planned, "planned")}
          {activeTab === "progress" &&
            renderSection("In-Progress", inProgress, "progress")}
          {activeTab === "live" && renderSection("Live", live, "live")}
        </div>
      )}
    </div>
  )
}

export default RoadMap
