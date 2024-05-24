"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import IconNewFeedback from "@/assets/shared/icon-new-feedback.svg"
import { Textarea } from "../ui/textarea"
import { BasicSelect } from "../ui/BasicSelect"
import Image from "next/image"

const formSchema = z.object({
  title: z
    .string()
    .min(8, { message: "Feedback title must be at least 8 characters" })
    .max(255, { message: "Feedback title cannot be more than 255 characters" }),
  category: z.string(),
  detail: z
    .string()
    .min(8, { message: "Feedback Detail must be at least 8 characters" })
    .max(500, {
      message: "Feedback detail cannot be more than 500 characters",
    }),
})

export function FeedbackForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 relative w-[540px] px-[42px] py-[52px] rounded-btn shadow-sm bg-white'
      >
        <Image
          src={IconNewFeedback}
          width={56}
          height={56}
          alt='Plus Button in a Circle'
          className='absolute -top-7 left-10'
        />
        <span className='text-txt-primary font-[700] text-[24px] tracking-[-0.333px] mt-0 pt-0'>
          Create New Feedback
        </span>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-txt-primary font-[700] text-[14px] tracking-[-0.194px]'>
                Feedback Title
              </FormLabel>
              <FormDescription className='text-[#647196] text-[14px] font-[400]'>
                Add a short, descriptive headline
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-txt-primary font-[700] text-[14px] tracking-[-0.194px]'>
                Category
              </FormLabel>
              <FormDescription className='text-[#647196] text-[14px] font-[400]'>
                Choose a category for your feedback
              </FormDescription>
              <FormControl>
                <BasicSelect field={field} options={options} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='detail'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-txt-primary font-[700] text-[14px] tracking-[-0.194px]'>
                Feedback Detail
              </FormLabel>
              <FormDescription className='text-[#647196] text-[14px] font-[400]'>
                Include any specific comments on what should be improved, added,
                etc.
              </FormDescription>
              <FormControl>
                <Textarea {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end space-x-4'>
          <div className='flex items-center rounded-btn py-2.5 text-white bg-[#3A4374] hover:bg-[#656EA3] transition-colors cursor-pointer'>
            <span className='font-semibold text-sm px-4'>Cancel</span>
          </div>
          <Button type='submit' className='px-0'>
            <div className='flex items-center rounded-btn py-2.5 text-white bg-[#AD1FEA] hover:bg-[#C75AF6] transition-colors cursor-pointer'>
              <span className='font-semibold text-sm px-4'>Add Feedback</span>
            </div>
          </Button>
        </div>
      </form>
    </Form>
  )
}

const options = [
  {
    label: "Feature",
    value: "feature",
  },
  {
    label: "UI",
    value: "ui",
  },
  {
    label: "UX",
    value: "ux",
  },
  {
    label: "Enhancement",
    value: "enhancement",
  },
  {
    label: "Bug",
    value: "bug",
  },
]
