"use client"

import { FormControl } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { ControllerRenderProps } from "react-hook-form"

interface SelectOption {
  value: string
  label: string
}

interface SelectFormProps {
  field: ControllerRenderProps<any, any>
  options: SelectOption[]
}

export function BasicSelect({ field, options }: SelectFormProps) {
  if (options.length < 1) {
    return null
  }

  const [firstOption, ...restOptions] = options
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Select
        onValueChange={field.onChange}
        defaultValue={firstOption.value}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <FormControl>
          <SelectTrigger isOpen={isOpen}>
            <SelectValue>{firstOption.label}</SelectValue>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem key={firstOption.value} value={firstOption.value}>
            {firstOption.label}
          </SelectItem>
          {restOptions.map((option: SelectOption) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
