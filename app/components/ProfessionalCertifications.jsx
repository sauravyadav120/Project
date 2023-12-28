"use client";
import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import CertificationModifciationform from "./CertificationModifciationform";
import CertificationCard from "./CertificationCard";
import Empty from "./Empty";

const ProfessionalCertifications = ({ certifications, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="mt-2 flex flex-col gap-3 border-2 border-borderSubCard p-3 rounded-xl">
      <Modal
        Form={<CertificationModifciationform
        selectedCertificate={selectedCertificate}
        setSelectedCertificate={setSelectedCertificate}
        type={type}
        refetch={refetch}
        closeModal={closeModal}
          />}
        closeModal={closeModal}
        isOpen={isOpen}
      />
      <div className="flex items-center justify-between my-2">
        <span>Certifications</span>
        <Button
          className="px-7 py-2 text-xs font-medium"
          text={"Add"}
          onClick={()=>{
            openModal()
            setType("add")
          }}
        />
      </div>
      {certifications?.length > 0
        ? certifications.map((item, idx) => (
          <CertificationCard
          item={item}
          key={idx}
          setSelectedCertificate={setSelectedCertificate}
          openModal={openModal}
          setType={setType}         
          refetch={refetch} 
          />
          ))
        : <Empty text={"Showcase your certificates"}/> }
    </div>
  );
};

export default ProfessionalCertifications;
