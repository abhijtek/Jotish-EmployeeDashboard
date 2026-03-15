"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/utils/fetchUsers";

import AuditImage from "@/components/AuditImage";
import SalaryChart from "@/components/SalaryChart";
//import CityMap from "@/components/CityMap";
import dynamic from "next/dynamic";

const CityMap = dynamic(
  () => import("@/components/CityMap"),
  { ssr: false }
);

export default function AnalyticsPage() {
    useEffect(()=>{
    const islogin = localStorage.getItem("auth");
    if(!islogin)router.push("/login"); 
  },[])
  const [users, setUsers] = useState([]);

  useEffect(() => {

    async function loadUsers() {
      const data = await fetchUsers();
      setUsers(data);
    }

    loadUsers();

  }, []);

  return (
    <div className="p-10 space-y-12">

      <h1 className="text-2xl font-bold">
        Employee Analytics
      </h1>

      <AuditImage />

      <SalaryChart users={users} />

      <CityMap users={users} />

    </div>
  );
}
