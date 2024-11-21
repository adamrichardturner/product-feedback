import IconPlus from "@/assets/shared/icon-plus.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"

const FeedbackButton = () => {
  const router = useRouter()
  return (
    <div
      className='flex h-[44px] cursor-pointer items-center space-x-1 rounded-btn bg-[#AD1FEA] px-4 py-3 text-white transition-colors hover:bg-[#C75AF6]'
      onClick={() => router.push("/feedback/create")}
    >
      <Image src={IconPlus} width={10} height={10} alt='Plus' />
      <span className='text-xs font-semibold md:text-sm'>Add Feedback</span>
    </div>
  )
}

export default FeedbackButton
