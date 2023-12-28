"use client"
import { createContext, useContext, useState } from "react";
const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState("")
  const [showSideBar, setShowSideBar] = useState(false);
  
  const values = {
    userInfo,
    setUserInfo,
    showSideBar,
    setShowSideBar
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
export const useUserProvider = () => {
  const ctx = useContext(UserContext);
  return ctx;
};
