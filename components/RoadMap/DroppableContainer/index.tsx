import { ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"

interface DroppableContainerProps {
  id: string
  children: ReactNode
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({
  id,
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: id,
    },
  })

  const style = {
    border: isOver ? "2px solid #AD1FEA" : "0px solid transparent",
    padding: "0px",
    borderRadius: "8px",
    backgroundColor: isOver ? "rgba(173, 31, 234, 0.2)" : "transparent",
    transition: "background-color 0.3s ease",
    width: "100%",
    height: "100%",
    minHeight: "600px",
  }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}

export default DroppableContainer
