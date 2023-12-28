import React,{useState} from 'react'
import Button from './Button'
import { formatDate, formatDuration } from '@/lib/utils'
import EducationCard from './EducationCard'
import Modal from './Modal'
import EducationForm from './EducationForm'
import Empty from './Empty'

const ProfessionalEducation = ({education,refetch}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null)

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="border-2 border-borderSubCard p-3 mt-2 rounded-xl">
      <Modal
      Form={<EducationForm
      closeModal={closeModal}
      selectedEducation={selectedEducation}
      setSelectedEducation={setSelectedEducation}
      refetch={refetch}
      type={type}
      />}
      closeModal={closeModal}
      isOpen={isOpen}
      />
        <div className="flex justify-between items-center">
            <h1 className=" text-base">Education</h1>
            <Button
                className="px-7 py-2 text-xs"
                text="Add"
                onClick={()=>{
                  openModal()
                  setType("add")
                }}
                />
        </div>
        {education?.length>0 ? education.map((item,idx)=>(
         <EducationCard
         item={item}
         key={idx}
         refetch={refetch}
         openModal={openModal}
         setSelectedEducation={setSelectedEducation}
         setType={setType}
         />
        )):<Empty
        text={"Showcase your education"}
        />}
     
    </div>
  )
}

export default ProfessionalEducation