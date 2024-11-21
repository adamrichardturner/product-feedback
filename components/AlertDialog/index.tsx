import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AlertDialogProps {
  onDeleteFeedback: () => Promise<void>
}

export function AlertDelete({ onDeleteFeedback }: AlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='mt-4 flex cursor-pointer items-center justify-center rounded-btn bg-[#D73737] py-2.5 text-white transition-colors hover:bg-[#E98888] md:mt-0'>
          <span className='px-4 text-sm font-semibold'>Delete</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            feedback.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-[#3A4374] text-white hover:bg-[#656EA3] hover:text-white'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDeleteFeedback}
            className='rounded-btn bg-[#D73737] text-white hover:bg-[#E98888] hover:text-white'
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
