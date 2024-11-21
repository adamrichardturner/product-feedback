"use client"

import * as React from "react"
import Image from "next/image"
import ArrowUp from "@/assets/shared/icon-arrow-up-white.svg"
import ArrowDown from "@/assets/shared/icon-arrow-down.svg"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import useFeedback from "@/hooks/feedback/useFeedback"
import { SelectedFilterType } from "@/stores/FeedbackState/slices/feedbackSlice"

interface SelectOption {
  value: any
  label: string
}

interface SelectDropdownMenuProps {
  options: SelectOption[]
}

const formatChoice = (value: string | null, options: SelectOption[]) => {
  const selectedOption = options.find((option) => option.value === value)
  return selectedOption ? selectedOption.label : ""
}

export function SelectDropdownMenu({ options }: SelectDropdownMenuProps) {
  const { selectedFilter, setFeedbackFilter } = useFeedback()
  const [checkedItem, setCheckedItem] = React.useState<string | null>(
    selectedFilter || options[0]?.value || null
  )
  const [open, setOpen] = React.useState(false)

  const handleCheckedChange = async (key: SelectedFilterType) => {
    setCheckedItem(key)
    await setFeedbackFilter(key)
  }

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className='flex cursor-pointer items-center space-x-2 text-xs text-[#F2F4FE] opacity-75 md:text-sm'>
          <span>Sort by : </span>
          <span className='font-semibold'>
            {formatChoice(checkedItem, options)}
          </span>
          <span>
            <Image
              src={open ? ArrowUp : ArrowDown}
              alt='Arrow'
              className='text-white'
              width={8}
              height={4}
            />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {options.map((option, index) => (
          <React.Fragment key={option.value}>
            <DropdownMenuCheckboxItem
              checked={checkedItem === option.value}
              onCheckedChange={() => handleCheckedChange(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
            {index < options.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
