"use client"
import ConnectionHeader from '@/app/components/ConnectionHeader'
import ConnectionSection from '@/app/components/ConnectionSection'
import { useUserProvider } from '@/context/UserContext'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = ({params}) => {
  const {userId} = params
  const router = useRouter()
  const {status} = useSession()
  if(status==="unauthenticated") router.push("/")
  const {setUserInfo} = useUserProvider()

  const { data:profileData,isLoading:profileLoading } = useQuery({
    queryKey: [userId, "userInfo"],
    queryFn: () => axios.get(`/api/user/getUserInfo/${userId}`).then((res) => {
      return res.data;
    }),
  })

  useEffect(() => {
    if (!profileLoading && profileData) {
      setUserInfo(profileData);
    }
  }, [profileLoading, profileData]);



  const { isLoading, error, data,refetch } = useQuery({
    queryKey: [userId,"connections"],
    queryFn: () => axios.get(`/api/user/getConnections/${userId}`).then((res) => {
      return res.data;
    }),
    enabled: userId?true:false
  })

  const {isLoading:otherLoading,error:otherError,data:otherConnections,refetch:otherRefetch} = useQuery({
    queryKey:[userId,"otherConnections"],
    queryFn:()=>axios.post("/api/user/getAllUsers",{userId}).then((res)=>{
      return res.data
    }),
    enabled:userId?true:false
  })
  return (
    <div className='p-2'>
        <ConnectionHeader/>
        <ConnectionSection 
        otherConnections={otherConnections} 
        otherRefetch={otherRefetch} 
        otherLoading={otherLoading} 
        connections={data} 
        refetch={refetch} 
        isLoading={isLoading} 
        userId={userId}/>
    </div>
  )
}

export default page