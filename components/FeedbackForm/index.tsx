"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSWRConfig } from "swr"

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
import { Textarea } from "@/components/ui/textarea"
import { BasicSelect } from "@/components/ui/BasicSelect"
import Image from "next/image"
import { toast } from "sonner"

const formSchema = z.object({
  title: z
    .string()
    .min(8, { message: "Feedback title must be at least 8 characters" })
    .max(30, {
      message: "Feedback title cannot be more than 30 characters",
    }),
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
  const { mutate } = useSWRConfig() // Access mutate from SWR
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "feature",
    },
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function postFeedback(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      throw new Error("Failed to post feedback")
    }

    return response.json()
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isAuth) {
      setLoading(true)
      try {
        const feedback = await postFeedback(values)

        // Optimistic UI update or revalidate the feedback list
        mutate("/api/feedback", (currentData: any) => {
          return [...(currentData || []), feedback]
        })

        router.push("/")
        toast("Feedback created.")
      } catch (error) {
        console.error("Error posting feedback:", error)
        toast.error("Failed to post feedback.")
        setLoading(false)
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='relative w-full space-y-8 rounded-btn bg-white px-6 pb-6 pt-[44px] shadow-sm md:w-[540px] md:px-[42px] md:py-[52px]'
      >
        <Image
          src={IconNewFeedback}
          width={56}
          height={56}
          alt='Plus Button in a Circle'
          className='absolute -top-5 h-[40px] w-[40px] md:-top-7 md:left-10 md:h-[56px] md:w-[56px]'
        />
        <span className='mt-0 pt-0 text-[24px] font-[700] tracking-[-0.333px] text-txt-primary'>
          Create New Feedback
        </span>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-[14px] font-[700] tracking-[-0.194px] text-txt-primary'>
                Feedback Title
              </FormLabel>
              <FormDescription className='text-[14px] font-[400] text-[#647196]'>
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
              <FormLabel className='text-[14px] font-[700] tracking-[-0.194px] text-txt-primary'>
                Category
              </FormLabel>
              <FormDescription className='text-[14px] font-[400] text-[#647196]'>
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
              <FormLabel className='text-[14px] font-[700] tracking-[-0.194px] text-txt-primary'>
                Feedback Detail
              </FormLabel>
              <FormDescription className='text-[14px] font-[400] text-[#647196]'>
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
        <div className='flex flex-col-reverse justify-end md:flex-row md:space-x-4 md:space-y-0'>
          <div className='mt-4 flex cursor-pointer items-center justify-center rounded-btn bg-[#3A4374] py-2.5 text-white transition-colors hover:bg-[#656EA3] md:mt-0'>
            <span className='px-4 text-sm font-semibold'>Cancel</span>
          </div>
          <Button type='submit' className='px-0' disabled={loading}>
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-btn py-2.5 text-white transition-colors md:w-[144px] ${
                loading
                  ? "bg-[#C75AF6] hover:bg-[#C75AF6]"
                  : "bg-[#AD1FEA] hover:bg-[#C75AF6]"
              }`}
            >
              <span className='px-4 text-sm font-semibold'>
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
