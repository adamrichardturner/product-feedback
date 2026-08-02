import { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"

interface DroppableContainerProps {
  id: string
  isActive: boolean
  children: ReactNode
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({
  id,
  isActive,
  children,
}) => {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: id,
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[400px] w-full flex-1 flex-col rounded-btn border-2 p-2 transition-colors duration-200 ${
        isActive
          ? "border-[#AD1FEA] bg-[#AD1FEA]/10"
          : "border-transparent bg-transparent"
      }`}
    >
      {children}
    </div>
  )
}

export default DroppableContainer
