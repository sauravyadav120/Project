import React from 'react'
import ProfilePhotoSection from './ProfilePhotoSection'
import PersonalProfileUserInfo from './PersonalProfileUserInfo'
import PersonalProfileBio from './PersonalProfileBio'
import ProfileSkillsSection from './ProfileSkillsSection'
import ProfessionalDetailsHeader from './ProfessionalDetailsHeader'
import ProfessionalCertifications from './ProfessionalCertifications'
import ProfessionalExperience from './ProfessionalExperience'
import ProfessionalEducation from './ProfessionalEducation'

const ProfileSection = ({userData,refetch}) => {
  return (
    <div className="mt-3 p-3 relative isolate">
    <div className="max-w-7xl p-3 h-[90px] rounded-md text-xs m-auto text-white bg-cardPrimary">
        My Profile
    </div>
    <div className=" absolute w-[86%]   lg:w-[90%] xl:w-[80%] h-max  left-1/2 transform -translate-x-1/2  top-1/2 rounded-xl  flex flex-col gap-6 lg:bg-cardSecondary lg:border-1 lg:border-borderSubCard lg:p-3 lg:cardShadowSecondary lg:flex-row">
        <div className="bg-cardSecondary border-1 border-borderSubCard  cardShadowSecondary p-3 flex flex-col rounded-xl lg:border-0 lg:shadow-none lg:border-none lg:bg-none lg:p-0 lg:flex-1">
           <ProfilePhotoSection image={userData?.image} refetch={refetch}/>
           <PersonalProfileUserInfo name={userData?.name} email={userData?.email} phone={userData?.phone} refetch={refetch}/>
           <PersonalProfileBio about={userData?.bio} name={userData?.name} refetch={refetch}/>
           <ProfileSkillsSection skills={userData?.professionalDetails?.skills} refetch={refetch}/>
        </div>
        <div className="bg-cardSecondary  cardShadowSecondary border-1 border-borderSubCard p-3 flex flex-col rounded-xl lg:border-0 lg:shadow-none lg:border-none lg:bg-none lg:p-0 lg:flex-1">
          <ProfessionalDetailsHeader/>
          <ProfessionalCertifications certifications={userData?.professionalDetails?.certification} refetch={refetch}/>
          <ProfessionalExperience experiences={userData?.professionalDetails?.experiences}  refetch={refetch}/>
          <ProfessionalEducation education={userData.professionalDetails.education}  refetch={refetch}/>
        </div>
    </div>      
</div>
  )
}

export default ProfileSection