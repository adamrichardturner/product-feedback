"use client"

import { Button } from "@/components/ui/button"
import { loginToDemoAccount } from "@/services/authService"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const onLogin = async () => {
    try {
      const response = await loginToDemoAccount()
      if (response?.user && response?.user?.aud === "authenticated") {
        router.push("/feedback")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='flex-1 flex space-y-8 flex-col sm:max-w-md rounded-btn justify-center gap-2 w-full md:w-[540px] p-6 md:p-10 h-auto bg-white text-center'>
        <div>
          <h2 className='font-[700] text-lg md:text-2xl text-txt-primary tracking-[-0.333px] leading-none'>
            Product Feedback Dashboard
          </h2>
          <p className='text-black text-xs md:text-sm leading-none pt-1.5'>
            Made by{" "}
            <a
              href='https://adamrichardturner.dev'
              target='_blank'
              className='font-[600] leading-none'
            >
              Adam Richard Turner
            </a>
          </p>
        </div>

        <Button
          className='text-white bg-[#AD1FEA] hover:bg-[#C75AF6] transition-colors cursor-pointer w-full text-md font-semibold rounded-btn px-4 py-6'
          onClick={onLogin}
        >
          Try Demo
        </Button>
      </div>
    </div>
  )
}
