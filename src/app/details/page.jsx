"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
function Details() {
    const router = useRouter();
   useEffect(()=>{
    const isUserLoggedIn = localStorage.getItem("auth");
    if(isUserLoggedIn){
       router.push("/list");
    }
    else{
        router.push("/login")
    }
   },[]) 
  return (
    <div>Details</div>
  )
}

export default Details