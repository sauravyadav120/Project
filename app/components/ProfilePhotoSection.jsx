"use client"
import React,{useEffect,useState} from 'react'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
const ProfilePhotoSection = ({image,refetch}) => {
  const {data:session} = useSession()
  const queryClient = useQueryClient()
  const [imgUrl, setImgUrl] = useState(null)
  const {mutate} = useMutation({
    mutationFn:async(url)=>{
      await axios.patch(`/api/user/editUserInfo/${session?.user?.id}`,{image:url})
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(['userInfo'])
      refetch()
    }
  })
  useEffect(() => {
      if (imgUrl) {
        mutate(imgUrl)
      }
  }, [imgUrl])
  


  return (
    <div className="flex items-center justify-between">
      <div className='w-24 h-24 relative'>
    <Image
    alt="Profile"
    src={image || "/assets/profile.svg"}
    fill
    className="bg-profileBgColor rounded-full object-cover"
    />
    </div>
    <CldUploadButton
    uploadPreset='ij6ciqdo'
    onUpload={(result)=>{
      setImgUrl(result.info.secure_url)
    }}
    className='px-5 py-3 bg-buttonBgPrimaryColor text-xs font-medium text-buttonTextPrimaryColor rounded-full'
    />
</div>
  )
}

export default ProfilePhotoSection