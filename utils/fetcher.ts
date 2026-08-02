import { api, isAxiosError } from "@/services/api"

const fetcher = async (url: string) => {
  try {
    const response = await api.get(url)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ??
          error.response?.data?.error ??
          "An error occurred"
      )
    }
    throw error
  }
}

export default fetcher
