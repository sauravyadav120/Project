import { useUserProvider } from '@/context/UserContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RxChevronRight } from 'react-icons/rx';
import { usePathname, useRouter } from 'next/navigation';
import Button from './Button';
import { signOut } from 'next-auth/react';
const Sidebar = () => {
  const { showSideBar, setShowSideBar,userInfo } = useUserProvider();
  const router = useRouter()

  const closeSidebar = () => {
    setShowSideBar(false);
  };
  const [active, setActive] = useState("My Profile")
  const path = usePathname()
  useEffect(() => {
    if(path==="/profile"){
      setActive("My Profile")
      return
    }
    setActive("My Connections")
  }, [path])
  

  return (
    <div className="relative z-50 sidebarShadow">
      {showSideBar && (
        <div
          className="fixed inset-0 bg-black w-full h-full opacity-50 z-20"
          onClick={closeSidebar}
        ></div>
      )}
      <aside
        className={`transition-transform duration-300 ease-in-out bg-white flex flex-col  ${
          showSideBar ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 w-[300px] h-full overflow-y-auto z-30`}
      >
        <div className="p-5 flex flex-col gap-3 items-end justify-end">
          <span className="font-medium sidebarContentShadow border-2 py-2 px-8  rounded-xl border-borderSubCard text-textSecondary text-xl">Dashboard</span>
          <ul className="mt-4  flex flex-col p-3">
            <li className="mb-2 ml-2  flex items-center gap-3" onClick={()=>{
              setActive("My Profile")
              setShowSideBar(false)
              }}>
              <RxChevronRight className='text-gray-400 font-medium text-lg'/>
              <Link href="/profile" className={` text-xl px-6 py-2 border-2 rounded-xl   ${active==="My Profile"?"border-borderPrimary border-2  rounded-xl":""}`}>
                My Profile
              </Link>
            </li>
            <li className="mb-2 flex items-center gap-3 mt-6" onClick={()=>{
              setActive("My Connections") 
              setShowSideBar(false)
              }}>
            <RxChevronRight className='text-gray-400 font-medium text-lg'/>
              <Link href={`/profile/connections/${userInfo?._id}`} className={` text-xl  border-2 p-2  rounded-xl ${active==="My Connections"?"border-borderPrimary border-2  rounded-xl":""} `}>
                My Connections
              </Link>
            </li>
          </ul>
       
        </div>
        <Button
          text={"Logout"}
          className={"text-xl mt-auto mb-6 bg-transparent"}
          onClick={()=>{
            signOut()
            setShowSideBar(false)
          }}
          />
      </aside>
    </div>
  );
};

export default Sidebar;
