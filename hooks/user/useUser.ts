"use client"

import { useUserStore } from "@/stores/UserState/useUserStore"
import { useCallback } from "react"
import { getAuthUser } from "@/services/userService"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

const useUser = () => {
  const supabase = createClient()
  const user = useUserStore((state) => state.user)
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const isAuth = useUserStore((state) => state.isAuth)
  const avatar_url = useUserStore((state) => state.avatar_url)
  const setUser = useUserStore((state) => state.setUser)
  const setAuth = useUserStore((state) => state.setAuth)
  const setAvatarUrl = useUserStore((state) => state.setAvatarUrl)

  const updateUser = useCallback(
    (newUser: any) => {
      setUser(newUser)
    },
    [setUser]
  )

  const updateUserAuth = useCallback(async () => {
    try {
      const { data } = await getAuthUser()
      if (data && data.length > 0) {
        const user = data[0]
        updateUser(user)
        setAuth(true)
      } else {
        setAuth(false)
      }
    } catch (error) {
      console.error("Error fetching authenticated user:", error)
      setAuth(false)
    }
  }, [updateUser, setAuth])

  const updateUserAvatar = useCallback(
    (url: string) => {
      setAvatarUrl(url)
    },
    [setAvatarUrl]
  )

  const fetchAndSetAvatarUrl = useCallback(async () => {
    if (!user.id) return

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        const avatarPath = data.avatar_url
        const { data: imageData, error: imageError } = await supabase.storage
          .from("avatars")
          .download(avatarPath)

        if (imageError) {
          throw imageError
        }

        const absoluteUrl = URL.createObjectURL(imageData)
        updateUserAvatar(absoluteUrl)
      }
    } catch (error) {
      console.error("Error fetching avatar URL:", error)
    }
  }, [user, supabase, updateUserAvatar])

  const loginWithPassword = useCallback(
    async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        if (data.user) {
          updateUser(data.user)
          await updateUserAuth()
          toast("Logged in successfully.")
        }
        return data
      } catch (error) {
        console.error("Login error:", error)
        toast("Could not authenticate user")
        throw error
      }
    },
    [supabase, updateUser, updateUserAuth]
  )

  return {
    user,
    isLoggedIn,
    isAuth,
    avatar_url,
    updateUserAuth,
    updateUser,
    updateUserAvatar,
    fetchAndSetAvatarUrl,
    loginWithPassword,
  }
}

export default useUser
