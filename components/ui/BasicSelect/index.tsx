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
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

export interface SelectOption<T> {
  value: T
  label: string
}

interface SelectFormProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>
  options: SelectOption<T[K]>[]
  disabled: boolean
}

export function BasicSelect<T extends FieldValues, K extends Path<T>>({
  field,
  options,
  disabled,
}: SelectFormProps<T, K>) {
  if (options.length < 1) {
    return null
  }

  const [firstOption] = options
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(firstOption)

  return (
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
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
