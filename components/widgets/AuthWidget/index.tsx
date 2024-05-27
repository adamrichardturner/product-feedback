"use client"

import { useCallback, useEffect, useState } from "react"
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs"
import useUser from "@/hooks/user/useUser"
import { toast } from "sonner"
import AuthAvatar from "./AuthAvatar"

export default function AuthWidget({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<any>()
  const { isAuth, updateUserAuth, updateUserAvatar } = useUser()
  const [loading, setLoading] = useState(true)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setAvatarUrl(data.avatar_url)
        updateUserAvatar(data.avatar_url)
      }
    } catch (error) {
      toast("Error loading user data.")
    } finally {
      setLoading(false)
    }
  }, [user, supabase, updateUserAvatar])

  useEffect(() => {
    const checkLoggedIn = async () => {
      await updateUserAuth()
      if (user) {
        await getProfile()
      }
    }
    checkLoggedIn()
  }, [user, updateUserAuth, getProfile])

  return (
    <>
      {isAuth ? (
        <AuthAvatar uid={user?.id || ""} url={avatar_url} size={70} />
      ) : (
        <h2>Null</h2>
      )}
    </>
  )
}
