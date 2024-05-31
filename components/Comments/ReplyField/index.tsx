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

  const content = watch("content")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-8'>
      <div className={`pl-${level} flex w-full`}>
        <Textarea
          {...register("content")}
          placeholder='Type your reply here'
          rows={2}
          maxLength={250}
          className='flex-grow rounded-[5px]'
        />
        {errors.content && (
          <p className='text-red-500 text-left text-sm'>
            {errors.content.message}
          </p>
        )}
        <div className='pl-4 inline-block items-start justify-end'>
          <div className='flex items-end'>
            <Button
              type='submit'
              className='bg-[#AD1FEA] hover:bg-[#C75AF6] text-white'
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
