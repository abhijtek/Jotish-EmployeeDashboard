"use client";

import { useEffect, useState } from "react";
import VirtualizedList from "@/components/VirtualizedList";
import EmployeeRow from "@/components/EmployeeRow";
import { fetchUsers } from "@/utils/fetchUsers";
import { useRouter } from "next/navigation";
const ROW_HEIGHT = 60;

export default function ListPage() {
  const router = useRouter();
  useEffect(()=>{
    const islogin = localStorage.getItem("auth");
    if(!islogin)router.push("/login"); 
  },[])
  const [employees, setEmployees] = useState([]);

  useEffect(() => {

    async function loadUsers() {

      const data = await fetchUsers();
      setEmployees(data);

    }

    loadUsers();

  }, []);

  return (

    <div className="min-h-screen bg-gray-50">

      

      <div className="bg-white border-b">

        <div className="max-w-6xl mx-auto px-6 py-4">

          <h1 className="text-2xl text-gray-700 font-semibold">
            Employee Insights Dashboard
          </h1>

        </div>

      </div>



      <div className="max-w-6xl mx-auto px-6 mt-8">

        <h2 className="text-xl text-black font-medium mb-4">
          Employee List
        </h2>



        <div className="grid grid-cols-5 bg-gray-100 text-blue-500 p-3 font-semibold border">

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