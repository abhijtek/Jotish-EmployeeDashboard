"use client";

import { useParams } from "next/navigation";
import CameraCapture from "@/components/CameraCapture";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function DetailsPage() {
    const router = useRouter();
 useEffect(()=>{
  const isUserLoggedIn = localStorage.getItem("auth");
  if(!isUserLoggedIn){
   router.push("/login");
  }
 },[])
  const params = useParams();
  const id = params.id;

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Identity Verification
      </h1>

      <p className="mb-6">
        Employee ID: {id}
      </p>

      <CameraCapture employeeId={id} />

    </div>
  );
}