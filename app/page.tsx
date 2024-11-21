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
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='flex h-auto w-full flex-1 flex-col justify-center gap-2 space-y-8 rounded-btn bg-white p-6 text-center sm:max-w-md md:w-[540px] md:p-10'>
        <div>
          <h2 className='text-lg font-[700] leading-none tracking-[-0.333px] text-txt-primary md:text-2xl'>
            Product Feedback Dashboard
          </h2>
          <p className='pt-1.5 text-xs leading-none text-black md:text-sm'>
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
          className='w-full cursor-pointer rounded-btn bg-[#AD1FEA] px-4 py-6 text-md font-semibold text-white transition-colors hover:bg-[#C75AF6]'
          onClick={onLogin}
        >
          Try Demo
        </Button>
      </div>
    </div>
  )
}
