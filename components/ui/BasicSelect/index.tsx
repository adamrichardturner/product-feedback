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
  disabled: boolean
}

export function BasicSelect({ field, options, disabled }: SelectFormProps) {
  if (options.length < 1) {
    return null
  }

  const [firstOption] = options
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(firstOption)

  return (
    <>
      <Select
        onValueChange={(value) => {
          const selected = options.find((option) => option.value === value)
          setSelectedOption(selected!)
          field.onChange(value)
        }}
        defaultValue={firstOption.value}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        disabled={disabled}
      >
        <FormControl>
          <SelectTrigger isOpen={isOpen}>
            <SelectValue>{selectedOption.label}</SelectValue>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option: SelectOption) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
