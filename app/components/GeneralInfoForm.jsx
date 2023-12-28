"use client"
import React,{useState} from 'react'
import Button from './Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const GeneralInfoForm = ({preFillData,refetch,closeModal}) => {
    const {data:session} = useSession()
    const queryClient = useQueryClient()
    const [fieldValue, setFieldValue] = useState(preFillData.value)
    const {mutate,isLoading} = useMutation({
        mutationFn:async(id)=>{
            const body={
               [preFillData.labelName]:fieldValue
            }
            return await axios.patch(`/api/user/editUserInfo/${id}`,body)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["userInfo"])
            refetch()
            closeModal()
        }
    })
    const handleSubmit=(e)=>{
         e.preventDefault()
         mutate(session?.user?.id)
    }
  return (
    <form className='flex flex-col gap-2  font-medium' onSubmit={handleSubmit}>
       <label htmlFor="" className='text-textLabel'>{preFillData.labelName}</label>
       <input type="text" className='inputFormStyle' value={fieldValue} onChange={(e)=>setFieldValue(e.target.value)}/>
       <Button
       text={isLoading?"Updating...":"Update"}
       className={`px-7 py-2 text-sm ${isLoading?"bg-gray-400/70 text-white":""}`}
       disabled={isLoading}
       />
    </form>
  )
}

export default GeneralInfoForm