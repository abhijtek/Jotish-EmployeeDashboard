"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import Link from "next/link";
function LoginPage() {
  const router = useRouter();

  const [buttonDisable, setButtonDisable] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(UserContext);

  const [allFieldsReq, setAllFieldsReq] = useState(true);

  useEffect(() => {
    const { username, password } = user;

    if (username.length > 0 && password.length > 0) {
      setAllFieldsReq(false);
    } else {
      setAllFieldsReq(true);
    }
  }, [user]);

  const signIn = () => {
    try {
      setButtonDisable(true);

      const res = login(user.username, user.password);

      if (res) {
        router.push("/list");
      }
      else{
        alert("invalid credentials")
      }
      setButtonDisable(false);
    } catch (error) {
      console.log(error.message);
    }
    finally{
        setButtonDisable(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold text-center">
          Employee Dashboard Login
        </h1>

        <label>Username</label>

        <input
          className="w-80 border p-2 rounded"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
        />

        <label>Password</label>

        <input
          className="w-80 border p-2 rounded"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
        />

        <button
          className="w-80 bg-black text-white p-2 rounded hover:cursor-pointer border-2 border-amber-50 hover:bg-gray-600 hover:text-white"
          onClick={signIn}
          disabled={buttonDisable || allFieldsReq}
        >
          {allFieldsReq
            ? "All fields required"
            : buttonDisable
              ? "Loading..."
              : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
