"use client"
import React,{useState} from 'react'
import Button from './Button'
import Modal from './Modal'
import GeneralInfoForm from './GeneralInfoForm'

const PersonalProfileUserInfo = ({name,email,phone,refetch}) => {
    let [isOpen, setIsOpen] = useState(false)
    const [formInfoData, setformInfoData] = useState({
        labelName:"",
        value:""
    })

  function openModal() {
    setIsOpen(true)
  }
  
  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div className="border-2 border-borderSubCard p-2 rounded-md text-base mt-2">
        <Modal
         closeModal={closeModal}
         isOpen={isOpen}
         Form={<GeneralInfoForm
               preFillData={formInfoData}
               refetch={refetch}
               closeModal={closeModal}
         />}
        />
        <div className='flex justify-between flex-wrap items-center'>
              
                <div className="flex flex-col gap-2 my-5 mx-4 font-medium"> 
                    <span className="text-labelTextColor">Your Name</span>
                    <span>{name}</span>
                </div>

                <Button
                text={"Edit"}
                className="px-7 py-2 text-xs"
                onClick={()=>{
                    setformInfoData({...formInfoData,labelName:"name",value:name})
                    openModal()
                }}
                
                />   
        </div>
        <div className='flex justify-between flex-wrap items-center'>
               
                <div className="flex flex-col gap-2 my-5 mx-4 font-medium"> 
                    <span className="text-labelTextColor">Email</span>
                    <span>{email}</span>
                </div>

                <Button
                text={"Edit"}
                className="px-7 py-2 text-xs"
                onClick={()=>{
                    setformInfoData({...formInfoData,labelName:"email",value:email})
                    openModal()
                }}
                />
            
        </div>
        <div className='flex justify-between flex-wrap items-center'>
              
                <div className="flex flex-col gap-2 my-5 mx-4 font-medium"> 
                    <span className="text-labelTextColor">Phone Number</span>
                    <span>{phone}</span>
                </div>
                <Button
                text={"Edit"}
                className="px-7 py-2 text-xs"
                onClick={()=>{
                    setformInfoData({...formInfoData,labelName:"phone",value:phone})
                    openModal()
                }}
                />
        </div>
            </div>
  )
}

export default PersonalProfileUserInfo