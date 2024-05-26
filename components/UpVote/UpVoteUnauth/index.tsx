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
import UpVoteArrow from "@/assets/shared/icon-arrow-up-blue.svg"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import Link from "next/link"

interface UpVoteUnauthProps {
  upvotes: number
}

export function UpVoteUnauth({ upvotes }: UpVoteUnauthProps) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.push("/")
    setLoading(false)

    if (!error) {
      router.push("/")
    } else {
      console.error("Login error:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex flex-col items-center space-y-1 pt-3.5 pb-2 w-[40px] h-[52px] cursor-pointer transition-colors rounded-btn bg-btn-upvote-background hover:bg-btn-upvote-background-hover'>
          <Image src={UpVoteArrow} width={8} height={4} alt='Up Vote Arrow' />
          <span className='font-semibold text-txt-primary text-body3'>
            {upvotes}
          </span>
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
          <div className='flex items-center rounded-btn py-2.5 text-white bg-[#3A4374] hover:bg-[#656EA3] transition-colors cursor-pointer'>
            <span className='font-semibold text-sm px-4'>Cancel</span>
          </div>
          <Button
            type='button'
            onClick={handleSubmit}
            className='px-0'
            disabled={loading}
          >
            <div
              className={`flex items-center w-[144px] justify-center rounded-btn py-2.5 text-white transition-colors cursor-pointer ${
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
