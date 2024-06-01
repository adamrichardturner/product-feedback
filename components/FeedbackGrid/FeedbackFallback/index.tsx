import FallbackGraphic from "@/assets/suggestions/illustration-empty.svg"
import FeedbackButtonAuth from "@/components/Navigation/FeebackButtonAuth"
import { FeedbackButtonUnAuth } from "@/components/Navigation/FeedbackButtonUnAuth"
import Image from "next/image"

interface FeedbackFallbackProps {
  isAuth: boolean
}

const FeedbackFallback = ({ isAuth }: FeedbackFallbackProps) => {
  return (
    <div className='bg-white py-[110px] px-4 flex flex-col items-center space-y-10 text-center rounded-btn'>
      <Image
        src={FallbackGraphic}
        width={130}
        height={137}
        alt='Inspector with magnifying glass'
      />
      <div className='flex flex-col items-center space-y-2'>
        <h3 className='text-txt-primary font-[700] text-[24px] tracking-[-0.333px]'>
          There is no feedback yet.
        </h3>
        <p className='text-txt-secondary text-[16px] text-center'>
          Got a suggestion? Found a bug that needs to be squashed?
          <br /> We love hearing about new ideas to improve our app.
        </p>
      </div>
      <div>{isAuth ? <FeedbackButtonAuth /> : <FeedbackButtonUnAuth />}</div>
    </div>
  )
}

export default FeedbackFallback
