"use client"
import React, { useRef } from 'react'
import Button from './Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {RxCross1} from 'react-icons/rx'
import { useUserProvider } from '@/context/UserContext'

const SkillForm = ({closeModal,type,refetch,selectedSkill,setSelectedSkill}) => {
    const skillRef = useRef()
    const {userInfo} = useUserProvider()
    const queryClient = useQueryClient()
    const {mutate,isLoading} = useMutation({
      mutationFn:async(body)=>{
          if(type==="add") return await axios.post(`/api/user/addProfessionalDetails/skills`,body)
          return await axios.patch("/api/user/editProfessionalDetails/skills",body)
      },
      onSuccess:()=>{
        queryClient.invalidateQueries(["userInfo"])
        type==="add"?skillRef.current.value="":setSelectedSkill(null)
        refetch()
        if(type==="edit") closeModal()
      }
    })

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(type==="add"){
          const body = {
            userId:userInfo?._id,
            newDetail:{
              skillName:skillRef.current.value
            }
          }
          mutate(body)
          return
        }
        const body = {
          userId:userInfo?._id,
          recordId:selectedSkill._id,
          editObject:{
            skillName:selectedSkill.skillName
          }
        }
        mutate(body)

    }



  return (
   <form action="" onSubmit={handleSubmit}>
    {type==="add"?(
      <div className='flex flex-col'>
        <div className='flex items-center justify-between'>
      <h1 className='text-textPrimary'>Add Your Skills</h1>
      <RxCross1 className='cursor-pointer' onClick={()=>closeModal()}/>
        </div>
      <div className='flex flex-col gap-2 mt-3'>
      <label htmlFor="skillName">Skill Name</label>
      <input ref={skillRef} type="text" required className='inputFormStyle'/>
      </div>
      <Button disabled={isLoading}  className={`text-sm px-7 mt-4 py-2  disabled:bg-loadingBtnBgColor`} text={isLoading?"Adding...":"Add"}/>
      </div>
    ):(
      <div className='flex flex-col gap-2 '>
        <div className='flex items-center justify-between'>
            <h1 className='text-bioTextColor'>Your Skill</h1>
            <RxCross1 className='cursor-pointer text-textPrimary' onClick={()=>closeModal()}/>
        </div>      
      <label htmlFor="skillName" className='text-textLabel'>Skill</label>
      <input value={selectedSkill?.skillName} onChange={(e)=>setSelectedSkill({...selectedSkill,skillName:e.target.value})} type="text" required className='inputFormStyle'/>
      <Button disabled={isLoading}  className={`text-sm px-7 mt-4 py-2  disabled:bg-loadingBtnBgColor`} text={isLoading?"Updating...":"Update"}/>
      </div>

    )}
   </form>
  )
}

export default SkillForm