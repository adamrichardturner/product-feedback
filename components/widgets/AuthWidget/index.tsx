"use client"

import { useEffect } from "react"
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs"
import useUser from "@/hooks/user/useUser"
import AvatarFallbackImage from "@/assets/shared/avatarFallback.png"
import Image from "next/image"

export default function AuthWidget({ session }: { session: Session | null }) {
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
  }, [user, avatar_url, updateUserAuth, fetchAndSetAvatarUrl, isAuth])

  return (
    <>
      {isAuth ? (
        <div className='avatar-container'>
          <Image
            width={70}
            height={70}
            src={avatar_url || AvatarFallbackImage}
            alt='User Avatar'
            className='avatar image rounded-full'
            style={{ height: 70, width: 70 }}
          />
        </div>
      ) : (
        <div className='avatar-container'>
          <Image
            width={70}
            height={70}
            src={AvatarFallbackImage}
            alt='Fallback Avatar'
            className='avatar image rounded-full'
            style={{ height: 70, width: 70 }}
          />
        </div>
      )}
    </>
  )
}
