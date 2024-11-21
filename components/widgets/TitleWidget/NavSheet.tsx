import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import BurgerOpen from "@/assets/shared/mobile/icon-hamburger.svg"
import BurgerClose from "@/assets/shared/mobile/icon-close.svg"
import CategoryWidget from "../CategoryWidget"
import RoadmapWidget from "../RoadmapWidget"
import { useState } from "react"
import Image from "next/image"
import { FeedbackType } from "@/types/feedback"

interface NavSheetProps {
  feedbackData: FeedbackType[]
}

export function NavSheet({ feedbackData }: NavSheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='default' className='p-0'>
          <Image
            src={isOpen ? BurgerClose : BurgerOpen}
            alt='Menu Button'
            className='cursor-pointer'
          />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className='space-y-6'>
          <CategoryWidget isOpen={isOpen} setIsOpen={setIsOpen} />
          <RoadmapWidget feedbackData={feedbackData} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
