"use client"
import React,{useState} from 'react'
import Button from './Button'
import ExperienceCard from './ExperienceCard'
import Empty from './Empty'
import Modal from './Modal'
import ExperienceForm from './ExperienceForm'

const ProfessionalExperience = ({experiences,refetch}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null)

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="border-2 border-borderSubCard p-3 flex flex-col gap-3 mt-2 rounded-xl">
      <Modal
      Form={<ExperienceForm
      type={type}
      refetch={refetch}
      closeModal={closeModal}
      selectedExperience={selectedExperience}
      setSelectedExperience={setSelectedExperience}
      />}
      closeModal={closeModal}
      isOpen={isOpen}
      />
            <div className="flex items-center justify-between">
                <span className="text-textSecondary">Experience</span>
                <Button
                className="px-7 py-2 text-xs"
                text="Add"
                onClick={()=>{
                  openModal()
                  setType("add")
                }}
                />
            </div>
            {experiences.length>0 ?experiences?.map((item,idx)=>(
              <ExperienceCard
              key={idx}
              startDate={item.startDate}
              endDate={item.endDate || "Present"}
              jobType={item.jobType}
              designation={item?.designation}
              company={item?.company}
              setSelectedExperience={setSelectedExperience}
              setType={setType}
              openModal={openModal}
              _id={item._id}
              refetch={refetch}
              />
            )): <Empty text={"Showcase your experiences"}/>}
    </div>
  )
}

export default ProfessionalExperience