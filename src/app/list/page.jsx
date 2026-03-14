"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function ListPage() {
    const router = useRouter();
  useEffect(()=>{
     const isUserLoggedIN = localStorage.getItem("auth")
     if(!isUserLoggedIN)
        router.push('/login');
  },[])  
  return (
    <div>ListPage</div>
  )
}

export default ListPage