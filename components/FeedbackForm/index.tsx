"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

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
import { postFeedback } from "@/services/feedbackService"
import { toast } from "sonner"

const formSchema = z.object({
  title: z
    .string()
    .min(8, { message: "Feedback title must be at least 8 characters" })
    .max(30, { message: "Feedback title cannot be more than 30 characters" }),
  category: z.string(),
  detail: z
    .string()
    .min(8, { message: "Feedback Detail must be at least 8 characters" })
    .max(72, {
      message: "Feedback detail cannot be more than 70 characters",
    }),
})

interface FeedbackFormProps {
  isAuth: boolean
}

export function FeedbackForm({ isAuth }: FeedbackFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "feature",
    },
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isAuth) {
      setLoading(true)
      try {
        await postFeedback(values)
        router.push("/")
        toast("Feedback created.")
      } catch (error) {
        console.error("Error posting feedback:", error)
        setLoading(false)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 relative w-full pt-[44px] pb-6 md:w-[540px] px-6 md:px-[42px] md:py-[52px] rounded-btn shadow-sm bg-white'
      >
        <Image
          src={IconNewFeedback}
          width={56}
          height={56}
          alt='Plus Button in a Circle'
          className='absolute -top-5 md:-top-7 md:left-10 w-[40px] h-[40px] md:w-[56px] md:h-[56px]'
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
                <Input {...field} disabled={loading} />
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
                <BasicSelect
                  field={field}
                  options={options}
                  disabled={loading}
                />
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
                <Textarea {...field} disabled={loading} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col-reverse md:flex-row justify-end md:space-y-0 md:space-x-4'>
          <div className='flex items-center mt-4 md:mt-0 rounded-btn py-2.5 justify-center text-white bg-[#3A4374] hover:bg-[#656EA3] transition-colors cursor-pointer'>
            <span className='font-semibold text-sm px-4'>Cancel</span>
          </div>
          <Button type='submit' className='px-0' disabled={loading}>
            <div
              className={`flex items-center w-full md:w-[144px] justify-center rounded-btn py-2.5 text-white transition-colors cursor-pointer ${
                loading
                  ? "bg-[#C75AF6] hover:bg-[#C75AF6]"
                  : "bg-[#AD1FEA] hover:bg-[#C75AF6]"
              }`}
            >
              <span className='font-semibold text-sm px-4'>
                {loading ? "Posting" : "Add Feedback"}
              </span>
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
