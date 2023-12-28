import Image from 'next/image'
import React from 'react'

const ProfessionalDetailsHeader = () => {
  return (
    <div className="border-2 border-borderSubCard rounded-xl px-3 py-5 flex items-center justify-between mt-4">
        <div className="flex flex-col gap-3">
        <h3 className="text-base font-medium text-textSecondary">Professional Details</h3>
        <p className="w-full  text-professionalHeaderTextColor">These are the professional details shown to the users in the app.</p>
        </div>
        <Image
        alt="stars"
        src="/assets/Stars.svg"
        width={130}
        height={130}
        />
    </div>
  )
}

export default ProfessionalDetailsHeader