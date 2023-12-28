"use client"
import React,{useEffect, useState} from 'react'
import Button from './Button'
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
const LoginForm = ({setAuthType}) => {
    
  const router = useRouter()
   const{status} = useSession()
   if(status==="authenticated") {
    router.push('/profile')
   }
    const [formData, setformData] = useState({
        email:"",
        password:""
    })
    const [error,setError] = useState("")
    useEffect(() => {
      if(error){
        setTimeout(() => {
          setError("")
        }, 2000);
      }
    }, [error])
    
    const handleChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
         const user = await signIn("credentials",{...formData,redirect:false})
         if(user.error) {
          setError("Some error occured.Please check your credentials")
          return
         }
         router.push(`/profile`)

    }
  return (
    <>
    <form action="" className="mt-7" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="email" className="text-textLabel  text-base font-medium">Email</label>
            <input type="text" className="border-2 border-borderSubCard focus:border-borderPrimary p-2 h-12 outline-none rounded-xl" placeholder="johndoe@gmail.com"  value={formData.email} onChange={handleChange} name='email'/>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="email" className="text-textLabel text-base font-medium">Password</label>
            <input type="password" className="border-2 border-borderSubCard focus:border-borderPrimary p-2 h-12 outline-none rounded-xl" placeholder="johndoe"  value={formData.password} onChange={handleChange} name='password'/>
          </div>
         <Button
         className="text-sm py-2 px-7 bg-transparent border-2 border-borderPrimary text-textPrimary"
         text={"Login"}
         />
        </form>
        
        <small  className="text-textLabel mt-2 md:mt-0">
          Don't have an account? <span className="text-textPrimary text-base font-medium my-5 cursor-pointer" onClick={()=>setAuthType("register")}>Register Now</span> 
        </small>
        {error && <h2 className='text-sm text-red-500 p-3'>{error}</h2>}
         </>
  )
}

export default LoginForm