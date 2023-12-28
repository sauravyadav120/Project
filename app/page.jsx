"use client"

import Image from "next/image";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const page = () => {
  const [authType, setAuthType] = useState("login")
  return(
 
     <div className={`w-full flex items-center justify-center ${authType==="login"?"h-screen":"my-5"}`}>
      <div className={`border-2 border-borderSubCard  cardShadowSecondary p-4 w-[90%] md:w-[50%] rounded-xl`}>
        {authType==="login"?<LoginForm setAuthType={setAuthType}/>:<RegisterForm setAuthType={setAuthType}/>}
      </div>
    </div>  
  )
    
};

export default page;
