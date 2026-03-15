"use client";

import { useEffect, useState } from "react";
import VirtualizedList from "@/components/VirtualizedList";
import EmployeeRow from "@/components/EmployeeRow";
import { fetchUsers } from "@/utils/fetchUsers";
import { useRouter } from "next/navigation";

const ROW_HEIGHT = 60;

export default function ListPage() {

  const router = useRouter();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const islogin = localStorage.getItem("auth");
    if (!islogin) router.push("/login");
  }, []);

  useEffect(() => {

    async function loadUsers() {
      const data = await fetchUsers();
      setEmployees(data);
    }

    loadUsers();

  }, []);

  return (

    <div className="min-h-screen flex flex-col items-center">

      <div className="w-full border-b border-gray-700">

        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-semibold text-gray-100">
            Employee Insights Dashboard
          </h1>

        </div>

      </div>

      <div className="w-full max-w-5xl px-6 mt-10 flex flex-col gap-4">

        <h2 className="text-lg font-semibold text-gray-200">
          Employee List
        </h2>

        <div className="grid grid-cols-5 border border-gray-700 text-blue-400 font-semibold p-3">

          <div>Name</div>
          <div>Position</div>
          <div>City</div>
          <div>Salary</div>
          <div>Action</div>

        </div>

        <VirtualizedList
          numItems={employees.length}
          itemHeight={ROW_HEIGHT}
          windowHeight={600}
          renderItem={({ index, style }) => (

            <EmployeeRow
              key={index}
              employee={employees[index]}
              style={style}
            />

          )}
        />

      </div>

    </div>

  );
}