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
import IconEditFeedback from "@/assets/shared/icon-edit-feedback.svg"
import { Textarea } from "../ui/textarea"
import { BasicSelect } from "../ui/BasicSelect"
import Image from "next/image"
import { deleteFeedback, editFeedback } from "@/services/feedbackService"
import { toast } from "sonner"
import { FeedbackCardProps } from "@/types/feedback"
import { AlertDelete } from "../AlertDialog"
import { createClient } from "@/utils/supabase/client"

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(8, { message: "Feedback title must be at least 8 characters" })
    .max(30, {
      message: "Feedback title cannot be more than 30 characters",
    }),
  category: z.string(),
  status: z.string(),
  detail: z
    .string()
    .min(8, { message: "Feedback Detail must be at least 8 characters" })
    .max(72, {
      message: "Feedback detail cannot be more than 72 characters",
    }),
  order: z.null(),
})

interface FeedbackFormProps {
  feedback: FeedbackCardProps | null
}

export function FeedbackFormEditable({ feedback }: FeedbackFormProps) {
  const supabase = createClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: feedback?.id || "",
      title: feedback?.title || "",
      category: feedback?.category || "",
      status: feedback?.status || "",
      detail: feedback?.detail || "",
      order: null,
    },
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user?.id === feedback?.user_id) {
      setLoading(true)
      try {
        await editFeedback(values)
        router.push("/")
        toast("Feedback edited.")
      } catch (error) {
        console.error("Error posting feedback:", error)
        setLoading(false)
      }
    }
  }

  async function onDeleteFeedback() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user?.id === feedback?.user_id) {
      setLoading(true)
    }
    try {
      if (!feedback?.id) {
        throw new Error("Feedback ID is null")
      }
      await deleteFeedback(feedback?.id)
      router.push("/")
      toast("Feedback deleted!")
    } catch (error) {
      console.error("Error deleting feedback: ", error)
      setLoading(false)
    }
  }

  function goBack() {
    router.back()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='relative w-full space-y-8 rounded-btn bg-white px-6 pb-6 pt-[44px] shadow-sm md:w-[540px] md:px-[42px] md:py-[52px]'
      >
        <Image
          src={IconEditFeedback}
          width={56}
          height={56}
          alt='Plus Button in a Circle'
          className='absolute -top-5 h-[40px] w-[40px] md:-top-7 md:left-10 md:h-[56px] md:w-[56px]'
        />
        <span className='mt-0 pt-0 text-[24px] font-[700] tracking-[-0.333px] text-txt-primary'>
          Editing '{feedback?.title}'
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
                  options={categoryOptions}
                  disabled={loading}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-[14px] font-[700] tracking-[-0.194px] text-txt-primary'>
                Update Status
              </FormLabel>
              <FormDescription className='text-[14px] font-[400] text-[#647196]'>
                Change feature state
              </FormDescription>
              <FormControl>
                <BasicSelect
                  field={field}
                  options={statusOptions}
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
        <div className='flex flex-col-reverse justify-between md:flex-row md:space-x-4 md:space-y-0'>
          <AlertDelete onDeleteFeedback={onDeleteFeedback} />
          <div className='flex flex-col-reverse space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
            <div
              className='mt-4 flex cursor-pointer items-center justify-center rounded-btn bg-[#3A4374] py-2.5 text-white transition-colors hover:bg-[#656EA3] md:mt-0'
              onClick={goBack}
            >
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
                  {loading ? "Saving" : "Save Changes"}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

const categoryOptions = [
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

const statusOptions = [
  {
    label: "Suggestion",
    value: "suggestion",
  },
  {
    label: "Planned",
    value: "planned",
  },
  {
    label: "In-Progress",
    value: "progress",
  },
  {
    label: "Live",
    value: "live",
  },
]
