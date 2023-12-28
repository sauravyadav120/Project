import { useUserProvider } from '@/context/UserContext';
import { formatDate, formatDuration } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Button from './Button';

const EducationCard = ({item,setSelectedEducation,openModal,setType,refetch}) => {
  const {userInfo} = useUserProvider()
  const {mutate,isLoading} = useMutation({
    mutationFn:async(body)=>{
      const {userId,recordId} = body
      return await axios.delete(`/api/user/deleteProfessionalDetail/education/${recordId}`,{data:{userId}})
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
    let durationText = ""
    if (item.startDate) {
      if (item.endDate) {
        const yearsMonths = formatDate(item.startDate, item.endDate);
        durationText = formatDuration(yearsMonths);
      } else {
        const yearsMonthsFromStart = calculateDuration(item.startDate);
        durationText = formatDuration(yearsMonthsFromStart) + " - Present";
      }
    }
  return (
    <div className='p-3 border-2 border-borderSubCard rounded-xl mt-4'>
    <h1 className='text-textPrimary text-base font-medium uppercase'>{item.collegeName}</h1>
      <div className="flex items-center justify-between font-medium text-textSecondary my-3 p-2">
            <span>{durationText}</span>
          <span>{item.degree}</span>
      </div>
      {item.about && <p className="text-professionalHeaderTextColor">
        {item.about}
      </p>}

      <div className="flex flex-wrap gap-3 items-center mt-3">
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
        setSelectedEducation(item)
      }}
      />
      </div>
      
  </div>
  )
}

export default EducationCard