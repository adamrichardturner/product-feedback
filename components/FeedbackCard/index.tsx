import UpVoteArrow from "@/assets/shared/icon-arrow-up-blue.svg"
import SpeechBubble from "@/assets/shared/icon-comments.svg"
import Image from "next/image"

function FeedbackCard() {
  return (
    <div className='h-[152px] rounded-btn bg-white pl-8 pt-7 flex justify-between'>
      <div className='bg-white flex space-x-10'>
        <div className='flex flex-col items-center space-y-1 pt-3.5 pb-2 w-[40px] h-[52px] cursor-pointer transition-colors rounded-btn bg-btn-upvote-background hover:bg-btn-upvote-background-hover'>
          <Image src={UpVoteArrow} width={8} height={4} alt='Up Vote Arrow' />
          <span className='font-semibold text-txt-primary text-body3'>65</span>
        </div>
        <article>
          <h3 className='font-semibold text-txt-primary text-md leading-md tracking-md'>
            Add a dark theme option
          </h3>
          <p className='pt-1 text-body1 leading-body1 text-txt-secondary'>
            It would help people with light sensitivities and who prefer dark
            mode.
          </p>
          <div className='mt-2.5 inline-block text-body3 font-semibold transition-colors py-1.5 px-4 rounded-btn hover:cursor-pointer bg-btn-upvote-background text-btn-upvote-active hover:bg-btn-upvote-background-hover'>
            Feature
          </div>
        </article>
      </div>
      <div className='flex items-center space-x-2 -mt-7 pr-8'>
        <Image src={SpeechBubble} width={18} height={16} alt='Speech Bubble' />
        <span className='font-semibold text-txt-primary'>2</span>
      </div>
    </div>
  )
}

export default FeedbackCard
