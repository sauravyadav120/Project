"use client"
import { formatDate, formatDuration,calculateDuration } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import Button from './Button'
import { useUserProvider } from '@/context/UserContext'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const ExperienceCard = ({startDate,endDate,jobType,designation,company,setSelectedExperience,openModal,setType,_id,refetch}) => {
  let durationText = ""

  if (startDate) {
    if (endDate) {
      const yearsMonths = formatDate(startDate, endDate);
      durationText = formatDuration(yearsMonths);
    } else {
      const yearsMonthsFromStart = calculateDuration(startDate);
      durationText = formatDuration(yearsMonthsFromStart) + " - Present";
    }
  }

  const {userInfo} = useUserProvider()
  const {mutate,isLoading} = useMutation({
    mutationFn:async(body)=>{
      const {userId,recordId} = body
      return await axios.delete(`/api/user/deleteProfessionalDetail/experiences/${recordId}`,{data:{userId}})
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
    <div className="border-2 border-borderSubCard p-2 justify-between flex items-center flex-wrap gap-3 rounded-xl">
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm font-medium gap-3">
            <span>{durationText}</span>
          <span>{jobType}</span>
            </div>
            <div className="flex items-center text-sm text-professionalHeaderTextColor gap-5  justify-between">
                <span>{company}</span>
                <span>--{designation}</span>
            </div>
        </div>
        <Image
        alt="logo"
        src="/assets/logo.svg"
        width={70}
        height={70}
        />
        <div className='flex items-center gap-2'>
          <Button
          type="submit"
          text="Edit"
          className={`text-xs px-7 py-2`}
          onClick={()=>{
            setType("edit")
            setSelectedExperience({jobType,company,designation,startDate,endDate,_id})
            openModal()
          }}
          />
          <Button
            text={!isLoading?"Delete":"Deleting..."}
          className={
            "text-xs px-5 py-2 bg-red-500 text-white border-none outline-none disabled:bg-loadingBtnBgColor disabled:text-white"
          }
          onClick={()=>handleDelete(_id)}
          type={"Submit"}
          disabled={isLoading}
          />
        </div>
    </div>
  )
}

export default ExperienceCard