import IconPlus from "@/assets/shared/icon-plus.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"

const FeedbackButtonAuth = () => {
  const router = useRouter()
  return (
    <div
      className='flex items-center rounded-btn py-3 px-4 space-x-1 text-white bg-[#AD1FEA] hover:bg-[#C75AF6] transition-colors cursor-pointer'
      onClick={() => router.push("/feedback/create")}
    >
      <Image src={IconPlus} width={10} height={10} alt='Plus' />
      <span className='font-semibold text-sm'>Add Feedback</span>
    </div>
  )
}

export default FeedbackButtonAuth
