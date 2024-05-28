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
        <div className='flex items-center mt-4 md:mt-0 rounded-btn py-2.5 justify-center text-white bg-[#D73737] hover:bg-[#E98888] transition-colors cursor-pointer'>
          <span className='font-semibold text-sm px-4'>Delete</span>
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
          <AlertDialogCancel className='text-white hover:text-white bg-[#3A4374] hover:bg-[#656EA3]'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDeleteFeedback}
            className='bg-[#D73737] hover:bg-[#E98888] hover:text-white text-white rounded-btn'
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
