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

const formatChoice = (itemName: string | null) => {
  switch (itemName) {
    case "mostUpvotes":
      return "Most Upvotes"
    case "leastUpvotes":
      return "Least Upvotes"
    case "mostComments":
      return "Most Comments"
    case "leastComments":
      return "Least Comments"
  }
}

export function NavigationDropdownMenu() {
  const [checkedItem, setCheckedItem] = React.useState<string | null>(
    "mostUpvotes"
  )

  const [open, setOpen] = React.useState(false)

  const handleCheckedChange = (key: string) => {
    setCheckedItem(key)
  }

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className='text-[#F2F4FE] opacity-75 text-sm flex items-center space-x-2 cursor-pointer'>
          <span>Sort by : </span>
          <span className='font-semibold'>{formatChoice(checkedItem)}</span>
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
        <DropdownMenuCheckboxItem
          checked={checkedItem === "mostUpvotes"}
          onCheckedChange={() => handleCheckedChange("mostUpvotes")}
        >
          Most Upvotes
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={checkedItem === "leastUpvotes"}
          onCheckedChange={() => handleCheckedChange("leastUpvotes")}
        >
          Least Upvotes
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={checkedItem === "mostComments"}
          onCheckedChange={() => handleCheckedChange("mostComments")}
        >
          Most Comments
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={checkedItem === "leastComments"}
          onCheckedChange={() => handleCheckedChange("leastComments")}
        >
          Least Comments
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
