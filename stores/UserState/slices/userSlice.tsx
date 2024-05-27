// stores/UserState/useUserStore.js
import create from "zustand"
import { StateCreator } from "zustand"

export interface User {
  id: string
  updated_at?: string
  username?: string
  full_name?: string
  avatar_url?: string
  website?: string
}

export interface IUserSlice {
  user: User
  isLoggedIn: boolean
  isAuth: boolean
  avatar_url: string
  setUser: (newUser: User) => void
  setAuth: (isUserAuth: boolean) => void
  setLoggedIn: (isUserLoggedIn: boolean) => void
  setAvatarUrl: (newUrl: string) => void
}

export const createUserSlice: StateCreator<IUserSlice> = (set) => ({
  user: {
    id: "",
    updated_at: "",
    username: "",
    full_name: "",
    avatar_url: "",
    website: "",
  },
  isLoggedIn: false,
  isAuth: false,
  avatar_url: "",
  setUser: (newUser: User) =>
    set(() => ({
      user: { ...newUser },
    })),
  setAuth: (isUserAuth: boolean) =>
    set(() => ({
      isAuth: isUserAuth,
    })),
  setLoggedIn: (isUserLoggedIn: boolean) =>
    set(() => ({
      isLoggedIn: isUserLoggedIn,
    })),
  setAvatarUrl: (newUrl: string) =>
    set(() => ({
      avatar_url: newUrl,
    })),
})
