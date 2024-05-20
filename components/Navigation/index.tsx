import Bulb from "@/assets/suggestions/icon-suggestions.svg"
import Image from "next/image"

function Navigation() {
  return (
    <div className='h-[72px] w-full bg-btn-back-background rounded-btn flex items-center p-6'>
      <div className='flex flex-row space-x-4'>
        <Image src={Bulb} width={23} height={24} alt='Bulb' />
        <h3 className='font-[700] text-white tracking-[-0.25px] text-md'>
          6 Suggestions
        </h3>
      </div>
    </div>
  )
}

export default Navigation
