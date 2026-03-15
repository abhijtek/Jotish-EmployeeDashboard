"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/utils/fetchUsers";

import AuditImage from "@/components/AuditImage";
import SalaryChart from "@/components/SalaryChart";
import dynamic from "next/dynamic";

const CityMap = dynamic(
  () => import("@/components/CityMap"),
  { ssr: false }
);

export default function AnalyticsPage() {

  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const islogin = localStorage.getItem("auth");
    if (!islogin) router.push("/login");
  }, []);

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchUsers();
      setUsers(data);
    }

    loadUsers();
  }, []);

  return (
    <div className="flex justify-center py-12">

      <div className="w-full max-w-5xl flex flex-col items-center gap-12">

        <h1 className="text-3xl font-bold text-gray-100">
          Employee Analytics
        </h1>

        <div className="w-full flex justify-center">
          <AuditImage />
        </div>

        <div className="w-full flex justify-center">
          <SalaryChart users={users} />
        </div>

        <div className="w-full flex justify-center">
          <CityMap users={users} />
        </div>

      </div>

    </div>
  );
}