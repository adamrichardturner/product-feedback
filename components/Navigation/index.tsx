import Bulb from "@/assets/suggestions/icon-suggestions.svg"
import Image from "next/image"
import { SelectDropdownMenu } from "../ui/SelectDropdownMenu"
import IconPlus from "@/assets/shared/icon-plus.svg"
import Link from "next/link"

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
          <SelectDropdownMenu options={options} />
        </div>
      </div>
      <div>
        <Link href='/feedback/create'>
          <div className='flex items-center rounded-btn py-3 px-4 space-x-1 text-white bg-[#AD1FEA] hover:bg-[#C75AF6] transition-colors cursor-pointer'>
            <Image src={IconPlus} width={10} height={10} alt='Plus' />
            <span className='font-semibold text-sm'>Add Feedback</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navigation

const options = [
  { value: "mostUpvotes", label: "Most Upvotes" },
  { value: "leastUpvotes", label: "Least Upvotes" },
  { value: "mostComments", label: "Most Comments" },
  { value: "leastComments", label: "Least Comments" },
]
