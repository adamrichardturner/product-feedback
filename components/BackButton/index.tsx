"use client"

import ArrowLeft from "@/assets/shared/icon-arrow-left.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"

function BackButton() {
  const router = useRouter()
  return (
    <button
      type='button'
      onClick={() => router.back()}
      className='flex items-center'
    >
      <Image src={ArrowLeft} width={8} height={4} alt='Arrow Left' />
      <span className='text-[#647196] pl-4 font-[700] text-[14px]'>
        Go Back
      </span>
    </button>
  )
}

export default BackButton
