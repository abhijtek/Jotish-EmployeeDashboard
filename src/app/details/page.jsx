"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Details() {

  const router = useRouter();

  useEffect(() => {

    const isUserLoggedIn = localStorage.getItem("auth");

    if (!isUserLoggedIn) {
      router.push("/login");
    }

  }, []);

  return (

    <div className="min-h-screen flex items-center justify-center text-gray-200 text-lg">
      Details
    </div>

  );
}

export default Details;