"use client"

import { SWRConfig } from "swr"
import fetcher from "@/utils/fetcher"

interface SWRProviderProps {
  children: React.ReactNode
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false, // Disable auto revalidation on focus
        revalidateOnReconnect: true, // Enable revalidation on reconnect
        shouldRetryOnError: false, // Disable retry on error
      }}
    >
      {children}
    </SWRConfig>
  )
}
