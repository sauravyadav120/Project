import React, { useState } from 'react'
import Button from './Button'
import { useMutation } from '@tanstack/react-query'
import { useUserProvider } from '@/context/UserContext'
import axios from 'axios'
import { RxCross1 } from 'react-icons/rx'

const ExperienceForm = ({type,selectedExperience,setSelectedExperience,refetch,closeModal}) => {
  const [formData, setFormData] = useState({
    jobType:"",
    company:"",
    startDate:"",
    endDate:"",
    designation:""
  })
  const {userInfo} = useUserProvider()
  const handleChange=(e)=>{
    type==="add"?setFormData({...formData,[e.target.name]:e.target.value}):
    setSelectedExperience({...selectedExperience,[e.target.name]:e.target.value})
  }

  const {mutate,isLoading} = useMutation({
    mutationFn:async(body)=>{
    return type==="edit"? await axios.patch("/api/user/editProfessionalDetails/experiences",body):
      await axios.post("/api/user/addProfessionalDetails/experiences",body)

    },
    onSuccess:()=>{
      type==="add"?setFormData({...formData,jobType:"",company:"",startDate:"",endDate:"",designation:""}):setSelectedExperience(null)
      refetch()
      if(type==="edit") closeModal()
    }
  })
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(type==="add"){
      const body= {
        userId:userInfo?._id,
        newDetail:formData
      }
      mutate(body)
   
      return
    }
    const body={
      recordId:selectedExperience._id,
      userId:userInfo._id,
      editObject:{
        jobType:selectedExperience.jobType,
        designation:selectedExperience.designation,
        company:selectedExperience.company,
        startDate:selectedExperience.startDate,
        endDate:selectedExperience.endDate
      }
    }
    mutate(body)

  }
  return (
    <form onSubmit={handleSubmit}>
      {type==="add"?(
        <div className='flex flex-col gap-3 w-full'>
            <div className='flex items-center justify-between'>
      <h1 className='text-textPrimary'>Add Experience</h1>
      <RxCross1 className='cursor-pointer' onClick={()=>closeModal()}/>
        </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="jobType" className='text-textLabel'>Job Type(Internship,Part-Time,Full-Time)</label>
          <input type="text" className='inputFormStyle' name='jobType' value={formData.jobType}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="company" className='text-textLabel'>Company</label>
          <input type="text" className='inputFormStyle' name='company' value={formData.company}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="designation" className='text-textLabel'>Designation</label>
          <input type="text" className='inputFormStyle' name='designation' value={formData.designation}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="startDate" className='text-textLabel'>StartDate</label>
          <input type="date" className='inputFormStyle' name='startDate' value={formData.startDate}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="endDate" className='text-textLabel'>End Date</label>
          <input type="date" className='inputFormStyle' name='endDate' value={formData.endDate}  onChange={handleChange}/>
          </div>
          <Button
          text={isLoading?"Adding...":"Add"}
          type="submit"
          className={`px-7 py-2 text-xs disabled:bg-loadingBtnBgColor`}
          disabled={isLoading}
          />

        </div>
      ):(
        <div className='flex flex-col gap-3 w-full'>
            <div className='flex items-center justify-between'>
      <h1 className='text-textPrimary'>Update Experience</h1>
      <RxCross1 className='cursor-pointer' onClick={()=>closeModal()}/>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="jobType" className='text-textLabel'>Job Type(Internship,Part-Time,Full-Time)</label>
          <input type="text" className='inputFormStyle' name='jobType' value={selectedExperience?.jobType}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="company" className='text-textLabel'>Company</label>
          <input type="text" className='inputFormStyle' name='company' value={selectedExperience?.company}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="designation" className='text-textLabel'>Designation</label>
          <input type="text" className='inputFormStyle' name='designation' value={selectedExperience?.designation}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="startDate" className='text-textLabel'>StartDate</label>
          <input type="date" className='inputFormStyle' name='startDate' value={selectedExperience?.startDate}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="endDate" className='text-textLabel'>End Date</label>
          <input type="date" className='inputFormStyle' name='endDate' value={selectedExperience?.endDate}  onChange={handleChange}/>
          </div>
          <Button
          text={isLoading?"Updating...":"Update"}
          type="submit"
          className={`px-7 py-2 text-xs disabled:bg-loadingBtnBgColor`}
          disabled={isLoading}
          />

        </div>
      )}
    </form>
  )
}

export default ExperienceForm