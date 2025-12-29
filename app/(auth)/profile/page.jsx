"use client";
import { useMyContext } from "@/context/context";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Profile(){
  const { user, updateState } = useMyContext();
  const router = useRouter();

    const LogOut = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
          {},
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        updateState("user", null);
        router.push("/");   // redirect
      }
    };

    return(
      <main className="flex min-h-screen flex-col items-center p-24">
        
        <div className="flex flex-col">

          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-white-600 cursor-pointer" onClick={LogOut}>Log out</button>
          
          users : {user ? JSON.stringify(user) : "No user logged in"}

          <h2>Email: {user?.email}</h2>
          <h2>Name: {user?.username}</h2>
        </div>
    </main>
  );
}