import React from 'react'
import Button from './Button'
import Modal from './Modal'
import GeneralInfoForm from './GeneralInfoForm'
import {useState} from 'react'
const PersonalProfileBio = ({ about, name,refetch }) => {

  let [isOpen, setIsOpen] = useState(false)
  const [formInfoData, setformInfoData] = useState({
    labelName: "",
    value: ""
  })

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }




  return (
    <div className="border-2 border-borderSubCard p-5 flex flex-col rounded-md text-base mt-2">
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        Form={<GeneralInfoForm
           preFillData={formInfoData}
           refetch={refetch}
           closeModal={closeModal}
        />}
      />
      <div className="flex items-center justify-between my-2">
        <span className="flex items-center font-medium gap-1">
          About <span className="text-borderPrimary">{name}</span>
        </span>
        <Button className="px-7 py-2 text-xs font-medium" text={"Edit"} onClick={()=>{
          setformInfoData({...formInfoData,labelName:"bio",value:about})
          openModal()
        }} />
      </div>
      <p className="text-bioTextColor font-normal text-justify my-2 leading-snug">
        {about ? about : "No Bio added"}
      </p>
    </div>
  )
}

export default PersonalProfileBio