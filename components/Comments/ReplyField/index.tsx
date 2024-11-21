import { FC } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const replySchema = z.object({
  content: z
    .string()
    .min(4, { message: "Reply must be at least 4 characters long" })
    .max(250, { message: "Reply must be at most 250 characters long" }),
})

type ReplyFormInputs = z.infer<typeof replySchema>

interface ReplyFieldProps {
  replyToCommentId: string | null
  onSubmit: (data: ReplyFormInputs) => void
  level?: string
}

const ReplyField: FC<ReplyFieldProps> = ({
  replyToCommentId,
  onSubmit,
  level,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReplyFormInputs>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      content: "",
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-8'>
      <div
        className={`pl-${level} flex w-full flex-col items-end md:flex-row md:items-start`}
      >
        <Textarea
          {...register("content")}
          placeholder='Type your reply here'
          rows={2}
          maxLength={250}
          className='flex-grow rounded-[5px]'
        />
        {errors.content && (
          <p className='text-left text-sm text-red-500'>
            {errors.content.message}
          </p>
        )}
        <div className='mt-4 inline-block items-start justify-end pl-4 md:mt-0'>
          <div className='flex items-end'>
            <Button
              type='submit'
              className='bg-[#AD1FEA] text-white hover:bg-[#C75AF6]'
            >
              {replyToCommentId ? "Post Reply" : "Post Comment"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ReplyField
