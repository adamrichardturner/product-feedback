"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import IconPlus from "@/assets/shared/icon-plus.svg"
import Image from "next/image"
import Link from "next/link"
import useUser from "@/hooks/user/useUser"

export function FeedbackButtonUnAuth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { loginWithPassword } = useUser()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await loginWithPassword(email, password)
      setLoading(false)
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      setLoading(false)
      router.push("/login?message=Could not authenticate user")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex items-center rounded-btn h-[44px] py-3 px-4 space-x-1 text-white bg-[#AD1FEA] hover:bg-[#C75AF6] transition-colors cursor-pointer'>
          <Image src={IconPlus} width={10} height={10} alt='Plus' />
          <span className='font-semibold text-sm'>Add Feedback</span>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] text-txt-primary'>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription className='text-txt-secondary'>
            You need to be logged in to add feedback, upvote and comment.{" "}
            <Link href='/register'>
              <span className='font-semibold text-txt-primary'>
                Register here
              </span>
            </Link>
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='password' className='text-right'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <div className='flex items-center mt-4 md:mt-0 justify-center rounded-btn py-2.5 text-white bg-[#3A4374] hover:bg-[#656EA3] transition-colors cursor-pointer'>
            <span className='font-semibold text-sm px-4'>Cancel</span>
          </div>
          <Button
            type='button'
            onClick={handleSubmit}
            className='px-0'
            disabled={loading}
          >
            <div
              className={`flex items-center w-full md:w-[144px] justify-center rounded-btn py-2.5 text-white transition-colors cursor-pointer ${
                loading
                  ? "bg-[#C75AF6] hover:bg-[#C75AF6]"
                  : "bg-[#AD1FEA] hover:bg-[#C75AF6]"
              }`}
            >
              <span className='font-semibold text-sm px-4'>
                {loading ? "Logging In" : "Login"}
              </span>
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
