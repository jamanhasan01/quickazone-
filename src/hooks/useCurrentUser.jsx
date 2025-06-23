import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useCurrentUser() {
  // 1. Get the full session object and its status
  const { data: session, status } = useSession()

  // 2. Safely get the user ID using optional chaining
  // This will be 'undefined' if session or user doesn't exist, preventing a crash
  const id = session?.user?.id

  // 3. Conditionally set the SWR key.
  // If there's no ID yet, the key will be `null`, and SWR will NOT start fetching.
  const key = id ? `/api/users/${id}` : null

  // 4. Call useSWR with the conditional key
  const { data, error, isLoading } = useSWR(key, fetcher)

  return {
    // Return the user data from SWR
    user: data?.data,
    // The SWR loading state
    isLoading,
    // SWR error state
    isError: error,
    // Also return the authentication status from NextAuth for more control
    authStatus: status,
  }
}
