import Link from "next/link"
import { headers } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SubmitButton } from "./submit-button"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }

    return redirect("/")
  }

  const signUp = async () => {
    "use server"
    return redirect("/register")
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex-1 flex flex-col sm:max-w-md rounded-btn justify-center gap-2 w-[540px] py-[52px] px-[42px] h-auto bg-white'>
        <h2 className='font-[700] text-xl text-txt-primary tracking-[-0.333px] pb-[40px]'>
          Login to your account
        </h2>
        <Link
          href='/'
          className='absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>{" "}
          Back
        </Link>

        <form className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'>
          <label
            className='text-sm font-[700] text-txt-primary tracking-[-0.194px]'
            htmlFor='email'
          >
            Email
          </label>
          <Input
            className='rounded-md px-4 py-2 bg-inherit border mb-6'
            name='email'
            placeholder='you@example.com'
            required
          />
          <label
            className='text-sm font-[700] text-txt-primary tracking-[-0.194px]'
            htmlFor='password'
          >
            Password
          </label>
          <Input
            className='rounded-md px-4 py-2 bg-inherit border mb-6'
            type='password'
            name='password'
            placeholder='••••••••'
            required
          />
          <SubmitButton
            formAction={signIn}
            className='bg-[#AD1FEA] hover:bg-[#C75AF6] transition-colors text-white text-sm font-semibold rounded-btn px-4 py-3 mb-2'
            pendingText='Signing In...'
          >
            Sign In
          </SubmitButton>

          {searchParams?.message && (
            <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
              {searchParams.message}
            </p>
          )}
        </form>
        <Link href='/register'>
          <Button className='bg-[#3A4374] w-full hover:bg-[#656EA3] transition-colors text-white text-sm font-semibold rounded-btn px-4 py-3'>
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  )
}
