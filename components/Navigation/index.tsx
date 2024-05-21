import Bulb from "@/assets/suggestions/icon-suggestions.svg"
import Image from "next/image"
import { NavigationDropdownMenu } from "./NavigationDropdownMenu"
import IconPlus from "@/assets/shared/icon-plus.svg"

function Navigation() {
  return (
    <div className='h-[72px] w-full bg-btn-back-background rounded-btn flex items-center justify-between pl-6 py-6 pr-4'>
      <div className='flex items-center space-x-8'>
        <div className='flex space-x-4'>
          <Image src={Bulb} width={23} height={24} alt='Bulb' />
          <h3 className='font-[700] text-white tracking-[-0.25px] text-md'>
            6 Suggestions
          </h3>
        </div>
        <div>
          <NavigationDropdownMenu />
        </div>
      </div>
      <div>
        <div className='flex items-center rounded-btn py-3 px-4 space-x-1 text-white bg-[#AD1FEA] hover:bg-[#C75AF6] transition-colors cursor-pointer'>
          <Image src={IconPlus} width={10} height={10} alt='Plus' />
          <span className='font-semibold text-sm'>Add Feedback</span>
        </div>
      </div>
    </div>
  )
}

export default Navigation
