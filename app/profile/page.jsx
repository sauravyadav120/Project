"use client"
import ProfileSection from '@/app/components/ProfileSection'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { useUserProvider } from '@/context/UserContext'

const Page = () => {
  const { data: session, status } = useSession()
  const { setUserInfo } = useUserProvider()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status])

  const id = session?.user?.id

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [id, "userInfo"],
    queryFn: () => axios.get(`/api/user/getUserInfo/${id}`).then((res) => {
      return res.data;
    }),
  })

  useEffect(() => {
    if (!isLoading && data) {
      setUserInfo(data);
    }
  }, [isLoading, data]);

  if (isLoading) return <h1 className='text-center mt-9 text-textLabel text-xl'>Loading your profile...</h1>
  return (
    <div className="p-0">
      <ProfileSection userData={data} refetch={refetch} />
    </div>
  )
}

export default Page;
