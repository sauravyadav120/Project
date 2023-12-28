import Image from 'next/image'
import React from 'react'
import Button from './Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const ConnectionCard = ({item,refetch,userId,type,otherRefetch}) => {
    const {mutate,isLoading} = useMutation({
        mutationFn:async(toId)=>{
            
           return type==="remove"? await axios.delete(`/api/user/deleteConnection/${toId}`,{data:{userId}}): await axios.post(`/api/user/addConnection/${toId}`,{userId})
        },
        onSuccess:()=>{
            refetch()
            otherRefetch()
        }
    })
    const handleBtn=(id)=>{
        mutate(id)
    }

  return (
    <div className='p-3 border-2 border-borderSecondary flex flex-col cardShadowSecondary rounded-xl'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-3 font-medium text-base'>
                <span className='text-textSecondary font-medium'>{item.name}</span>
                <div className='flex flex-col gap-1'>
                {item.experiences.length>0 && <>
                <span className='text-textLabel'>{item.experiences[0].designation}</span>
                <span className='text-textLabel'>@{item.experiences[0].company}</span>
                </>}
                </div>
            </div>
            <div className='relative w-20 h-20 '>
            <Image
            src={item.image || "/assets/profile.svg" }
            className='bg-profileBgColor rounded-full object-cover'
            alt='profile-picture'
            fill
            />
            </div>
        </div>
        <Button
           text={
            type === "remove"
              ? isLoading
                ? "Removing..."
                : "Remove Connection"
              : type === "add"
              ? isLoading
                ? "Connecting..."
                : "Connect"
              : "Unknown Action"
          }
            className={"bg-connectionBtnBgColor font-medium text-base px-4 py-1 w-max mt-6 disabled:bg-loadingBtnBgColor disabled:text-white"}
            disabled={isLoading}
            onClick={()=>handleBtn(item._id)}
            
        />
    </div>
  )
}

export default ConnectionCard