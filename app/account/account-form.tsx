"use client"

import { useCallback, useEffect, useState } from "react"
import Avatar from "./avatar"
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import BackButton from "@/components/BackButton"
import useUser from "@/hooks/user/useUser"

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<any>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const { updateUserAvatar, fetchAndSetAvatarUrl } = useUser()

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
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
    getProfile()
    fetchAndSetAvatarUrl()
  }, [user, getProfile, fetchAndSetAvatarUrl])

  async function updateProfile({
    username,
    fullname,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      toast("Profile updated!")
    } catch (error) {
      toast("Error updating the data.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-start justify-center'>
      <BackButton />
      <div className='bg-white rounded-lg p-8 w-full mt-[68px] md:w-[540px]'>
        <div className='flex justify-center mb-6'>
          <Avatar
            uid={user!.id}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateUserAvatar(url)
              updateProfile({ fullname, username, website, avatar_url: url })
            }}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700'>
            Email
          </label>
          <Input
            id='email'
            type='text'
            value={session?.user.email}
            disabled
            className='w-full px-4 py-2 border rounded-md text-gray-700 bg-gray-200'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='fullName' className='block text-gray-700'>
            Full Name
          </label>
          <Input
            id='fullName'
            type='text'
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
            className='w-full px-4 py-2 rounded-btn'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='username' className='block text-gray-700'>
            Username
          </label>
          <Input
            id='username'
            type='text'
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-2 rounded-btn'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='website' className='block text-gray-700'>
            Website
          </label>
          <Input
            id='website'
            type='url'
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
            className='w-full px-4 py-2 rounded-btn'
          />
        </div>
        <div className='flex row space-x-2 justify-end'>
          <div className='flex justify-center mb-4'>
            <button
              className='bg-[#AD1FEA] hover:bg-[#C75AF6] font-semibold text-sm transition-colors shadow-sm text-white rounded-md px-6 py-2'
              onClick={() =>
                updateProfile({ fullname, username, website, avatar_url })
              }
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update Profile"}
            </button>
          </div>
          <div className='flex justify-center'>
            <form action='/auth/signout' method='post'>
              <button
                className='bg-[#373F68] font-semibold text-sm text-white rounded-md px-6 py-2'
                type='submit'
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
