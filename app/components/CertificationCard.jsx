"use client"
import React from 'react'
import Button from './Button'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useUserProvider } from '@/context/UserContext'
const CertificationCard = ({item,setSelectedCertificate,openModal,setType,refetch}) => {
  const {userInfo} = useUserProvider()
  const {mutate,isLoading} = useMutation({
    mutationFn:async(body)=>{
      const {userId,recordId} = body
      return await axios.delete(`/api/user/deleteProfessionalDetail/certification/${recordId}`,{data:{userId}})
    },
    onSuccess:()=>{
      refetch()
    }
  })
  const handleDelete=(id)=>{
    const body = {
      recordId:id,
      userId:userInfo?._id
    }
    mutate(body)
  }
  return (
    <div
    className="border-2 border-borderSubCard py-3 rounded-full flex items-center gap-3 justify-around flex-wrap"
  >
    <Image
      alt="certificate logo"
      src="/assets/certificateLogo.svg"
      width={35}
      height={35}
    />
    <div className="flex  flex-col items-center justify-between text-base text-professionalHeaderTextColor font-medium">
      <p>{item.certificateName}</p>
      <p>{item.certificateCompanyName}</p>
    </div>
    <div className="flex flex-wrap gap-3 items-center">
    <Button
      text={isLoading?"Deleting":"Delete"}
      className={
        "text-xs px-5 py-2 bg-red-500 text-white border-none outline-none disabled:bg-loadingBtnBgColor disabled:text-white"
      }
      onClick={()=>handleDelete(item._id)}
      disabled={isLoading}
    />
    <Button
      text={"Edit"}
      className={
        " px-7 py-2 text-xs"
      }
      onClick={()=>{
        openModal()
        setType("edit")
        setSelectedCertificate(item)
      }}
      />
      </div>
  </div>
  )
}

export default CertificationCard