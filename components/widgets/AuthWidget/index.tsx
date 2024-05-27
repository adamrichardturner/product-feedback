"use client"

import { useEffect } from "react"
import useUser from "@/hooks/user/useUser"
import AvatarFallbackImage from "@/assets/shared/avatarFallback.png"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/utils/supabase/client"

export default function AuthWidget() {
  const router = useRouter()
  const supabase = createClient()
  const { isAuth, updateUserAuth, fetchAndSetAvatarUrl, avatar_url, user } =
    useUser()

  useEffect(() => {
    const checkLoggedIn = async () => {
      await updateUserAuth()
      if (user) {
        await fetchAndSetAvatarUrl()
      }
    }
    if (user && !avatar_url) {
      checkLoggedIn()
    }
  }, [user, avatar_url, updateUserAuth, fetchAndSetAvatarUrl])

  const handleAccount = () => {
    router.push("/account")
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    updateUserAuth()
    router.push("/")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const handleRegister = () => {
    router.push("/register")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='cursor-pointer'>
          {isAuth ? (
            <Image
              width={40}
              height={40}
              src={avatar_url || AvatarFallbackImage}
              alt='User Avatar'
              className='avatar image rounded-full'
            />
          ) : (
            <Image
              width={40}
              height={40}
              src={AvatarFallbackImage}
              alt='Fallback Avatar'
              className='avatar image rounded-full'
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={10}
        side={"bottom"}
        align={"end"}
        className='w-56 cursor-pointer p-2 divide-y'
      >
        {isAuth ? (
          <>
            <DropdownMenuItem
              className='cursor-pointer text-txt-primary hover:text-btn-primary-background'
              onClick={handleAccount}
            >
              Account
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer text-txt-primary hover:text-btn-primary-background'
              onClick={handleSignOut}
            >
              Sign Out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className='cursor-pointer text-txt-primary hover:text-btn-primary-background'
              onClick={handleLogin}
            >
              Login
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer text-txt-primary hover:text-btn-primary-background'
              onClick={handleRegister}
            >
              Register
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
