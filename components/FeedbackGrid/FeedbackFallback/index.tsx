import FallbackGraphic from "@/assets/suggestions/illustration-empty.svg"
import FeedbackButton from "@/components/Navigation/FeebackButton"
import Image from "next/image"

const FeedbackFallback = () => {
  return (
    <div className='flex flex-col items-center space-y-10 rounded-btn bg-white px-4 py-[110px] text-center'>
      <Image
        src={FallbackGraphic}
        width={130}
        height={137}
        alt='Inspector with magnifying glass'
      />
      <div className='flex flex-col items-center space-y-2'>
        <h3 className='text-[24px] font-[700] tracking-[-0.333px] text-txt-primary'>
          There is no feedback yet.
        </h3>
        <p className='text-center text-[16px] text-txt-secondary'>
          Got a suggestion? Found a bug that needs to be squashed?
          <br /> We love hearing about new ideas to improve our app.
        </p>
      </div>
      <div>
        <FeedbackButton />
      </div>
    </div>
  )
}

export default FeedbackFallback
