"use client"

import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core"
import type { CollisionDetection, Over } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useState, useSyncExternalStore } from "react"
import useRoadMap from "./hooks/useRoadMap"
import RoadMapCard from "./RoadMapCard"
import SortableItem from "./SortableItem"
import DroppableContainer from "./DroppableContainer"
import { FeedbackCardProps } from "@/types/feedback"
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core"
import RoadMapMobileNavigation from "./RoadMapMobileNavigation"
import { useMediaQuery } from "usehooks-ts"

/**
 * Prefer whatever sits under the pointer so a column stays highlighted across
 * its whole drop area. Centre based detection handed the drop to a neighbouring
 * column as soon as the cursor moved away from the top of the current one.
 */
const collisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args)

  if (pointerCollisions.length > 0) {
    return pointerCollisions
  }

  return rectIntersection(args)
}

/** Both columns and the cards inside them carry their column id as `type`. */
function resolveContainerId(over: Over | null): string | null {
  if (!over) {
    return null
  }

  const data: unknown = over.data.current

  if (typeof data !== "object" || data === null) {
    return null
  }

  if (!("type" in data)) {
    return null
  }

  return typeof data.type === "string" ? data.type : null
}

const RoadMap = () => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const { planned, inProgress, live, handleStatusChange, handleOrderChange } =
    useRoadMap()
  const [activeCard, setActiveCard] = useState<FeedbackCardProps | null>(null)
  const [overContainerId, setOverContainerId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("planned")
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

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

  const handleDragOver = (event: DragOverEvent) => {
    setOverContainerId(resolveContainerId(event.over))
  }

  const handleDragCancel = () => {
    setActiveCard(null)
    setOverContainerId(null)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)
    setOverContainerId(null)

    if (!over) {
      return
    }

    const draggedCard = planned
      .concat(inProgress, live)
      .find((card) => card.id === active.id)

    if (!draggedCard) {
      return
    }

    const targetContainerId = resolveContainerId(over)

    if (targetContainerId && targetContainerId !== draggedCard.status) {
      await handleStatusChange(active.id, targetContainerId)
      return
    }

    if (active.id === over.id) {
      return
    }

    await handleOrderChange(draggedCard.status, active.id, over.id)
  }

  const renderSection = (
    title: string,
    items: FeedbackCardProps[],
    sectionId: string
  ) => (
    <section className='flex w-full flex-1 flex-col'>
      <div className='mb-6 w-full'>
        <h3 className='text-[18px] font-bold tracking-[-0.25px] text-txt-primary'>
          {title} ({items.length})
        </h3>
        <span className='text-[16px] text-txt-secondary'>
          {sectionId === "planned" && "Ideas prioritized for research"}
          {sectionId === "progress" && "Currently being developed"}
          {sectionId === "live" && "Released features"}
        </span>
      </div>
      <DroppableContainer
        id={sectionId}
        isActive={overContainerId === sectionId}
      >
        <SortableContext
          items={items.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className='flex flex-col flex-wrap gap-4 md:gap-6'>
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
      </DroppableContainer>
    </section>
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
          collisionDetection={collisionDetection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragCancel={handleDragCancel}
          onDragEnd={handleDragEnd}
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
