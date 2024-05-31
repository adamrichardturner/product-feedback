"use client"

import React, { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useUser from "@/hooks/user/useUser"
import AvatarFallbackImage from "@/assets/shared/avatarFallback.png"

export default function AuthAvatar({
  uid,
  url,
  size,
}: {
  uid: string | null
  url: string | null
  size: number
}) {
  const supabase = createClient()
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const { isAuth, updateUserAvatar } = useUser()

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path)
        if (error) {
          throw error
        }

        const absoluteUrl = URL.createObjectURL(data)
        setAvatarUrl(absoluteUrl)
        updateUserAvatar(absoluteUrl)
      } catch (error) {
        console.error("Error downloading image: ", error)
      }
    }

    if (url && isAuth) {
      downloadImage(url)
    }
  }, [url, supabase, isAuth])

  const handleAccount = () => {
    router.push("/account")
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out: ", error)
    }
    router.push("/")
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const handleRegister = () => {
    router.push("/register")
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='cursor-pointer'>
            {avatarUrl ? (
              <Image
                width={size}
                height={size}
                src={avatarUrl}
                alt='Avatar'
                className='avatar image rounded-full'
                style={{ height: size, width: size }}
              />
            ) : (
              <Image
                width={size}
                height={size}
                src={AvatarFallbackImage}
                alt='Avatar'
                className='avatar image rounded-full'
                style={{ height: size, width: size }}
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 p-6'>
          {isAuth ? (
            <>
              <DropdownMenuItem onClick={handleAccount}>
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={handleLogin}>Login</DropdownMenuItem>
              <DropdownMenuItem onClick={handleRegister}>
                Register
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
