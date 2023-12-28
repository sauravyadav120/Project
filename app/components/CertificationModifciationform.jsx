import React, { useState } from 'react'
import Button from './Button'
import { useMutation } from '@tanstack/react-query'
import { useUserProvider } from '@/context/UserContext'
import axios from 'axios'
import { RxCross1 } from 'react-icons/rx'

const CertificationModifciationform = ({type,selectedCertificate,setSelectedCertificate,refetch,closeModal}) => {
  const [formData, setFormData] = useState({
    certificateName:"",
    certificateCompanyName:""
  })
  const {userInfo} = useUserProvider()
  const handleChange=(e)=>{
    type==="add"?setFormData({...formData,[e.target.name]:e.target.value}):
    setSelectedCertificate({...selectedCertificate,[e.target.name]:e.target.value})
  }

  const {mutate,isLoading} = useMutation({
    mutationFn:async(body)=>{
    return type==="edit"? await axios.patch("/api/user/editProfessionalDetails/certification",body):
      await axios.post("/api/user/addProfessionalDetails/certification",body)

    },
    onSuccess:()=>{
      type==="add"?setFormData({...formData,certificateCompanyName:"",certificateName:""}):setSelectedCertificate(null)
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
      recordId:selectedCertificate._id,
      userId:userInfo._id,
      editObject:{
        certificateName:selectedCertificate.certificateName,
        certificateCompanyName:selectedCertificate.certificateCompanyName
      }
    }
    mutate(body)

  }
  return (
    <form onSubmit={handleSubmit}>
      {type==="add"?(
        <div className='flex flex-col gap-3 w-full'>
            <div className='flex items-center justify-between'>
      <h1 className='text-textPrimary'>Add Certificate</h1>
      <RxCross1 className='cursor-pointer' onClick={()=>closeModal()}/>
        </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="" className='text-textLabel'>CertificateName</label>
          <input type="text" className='inputFormStyle' name='certificateName' value={formData.certificateName}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="certificateCompanyName" className='text-textLabel'>Company</label>
          <input type="text" className='inputFormStyle' name='certificateCompanyName' value={formData.certificateCompanyName}  onChange={handleChange} required/>
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
      <h1 className='text-textPrimary'>Update Certificate</h1>
      <RxCross1 className='cursor-pointer' onClick={()=>closeModal()}/>
        </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="" className='text-textLabel'>CertificateName</label>
          <input type="text" className='inputFormStyle' name='certificateName' value={selectedCertificate?.certificateName}  onChange={handleChange} required/>
          </div>
          <div className='flex flex-col gap-2'>
          <label htmlFor="certificateCompanyName" className='text-textLabel'>Company</label>
          <input type="text" className='inputFormStyle' name='certificateCompanyName' value={selectedCertificate?.certificateCompanyName}  onChange={handleChange} required/>
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

export default CertificationModifciationform