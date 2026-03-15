"use client";

import { useParams } from "next/navigation";
import CameraCapture from "@/components/CameraCapture";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DetailsPage() {

  const router = useRouter();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("auth");
    if (!isUserLoggedIn) {
      router.push("/login");
    }
  }, []);

  const params = useParams();
  const id = params.id;

  return (

    <div className="min-h-screen flex justify-center py-12">

      <div className="w-full max-w-4xl flex flex-col gap-6">

        <h1 className="text-2xl font-bold text-gray-100">
          Identity Verification
        </h1>

        <div className="text-gray-300">
          Employee ID: <span className="text-blue-400">{id}</span>
        </div>

        <div className="border border-gray-700 p-6">
          <CameraCapture employeeId={id} />
        </div>

      </div>

    </div>

  );
}