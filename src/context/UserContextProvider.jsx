"use client"

import { useEffect, useState } from "react";
import UserContext from "./UserContext";

export const UserContextProvider = ({children})=>{
    const [user,setUser] = useState();
    
    const login = (username,password)=>{
        if(username === "testuser" && password === "Test123"){
            localStorage.setItem("auth","true");
            setUser({username});
            return true;
        }
        return false;
    }

    const logout = ()=>{
        localStorage.removeItem("auth");
        setUser(null);
    }
     
    useEffect(()=>{
      const userLoggedIn = localStorage.getItem("auth");
      if(userLoggedIn){
        setUser({username: "testuser"})
      }
    },[])

    return <UserContext.Provider 
    value={{user,login,logout}}>
        {children}
    </UserContext.Provider>
}