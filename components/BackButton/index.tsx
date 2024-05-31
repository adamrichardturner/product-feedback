"use client"

import ArrowLeftBlue from "@/assets/shared/icon-arrow-left-blue.svg"
import ArrowLeftGray from "@/assets/shared/icon-arrow-left-gray.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  isDark: boolean
}

function BackButton({ isDark }: BackButtonProps) {
  const router = useRouter()
  return (
    <button
      type='button'
      onClick={() => router.back()}
      className='flex items-center'
    >
      <Image
        src={isDark ? ArrowLeftBlue : ArrowLeftGray}
        width={8}
        height={4}
        alt='Arrow Left'
      />
      <span
        className={`${
          isDark ? "text-txt-secondary" : "text-white"
        } pl-4 font-[700] text-[14px]`}
      >
        Go Back
      </span>
    </button>
  )
}

export default BackButton
