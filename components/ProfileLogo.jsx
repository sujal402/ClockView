"use client";
import Link from "next/link";
import { CiUser, CiLogin } from "react-icons/ci";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useMyContext } from "@/context/context";

export default function UserIcon() {
  const pathname = usePathname();
  // const { user,userEmail,userName,updateState } = useMyContext();
  
  const { user } = useMyContext();
  // let login;

  // axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
  //   withCredentials: true,
  // })
  // .then(res => {
  //   const login = res.status === 200; // true if status is 200
  //   console.log("Loggedin user:", res.data);
  //   console.log("Is logged in?", login);
  // })
  // .catch(err => {
  //   console.error(err);
  // });


  // updateState("user", Loggedin);
  // updateState("userEmail", Loggedin.email);
  // updateState("userName", Loggedin.name);

  
  const isActive = pathname === "/profile";
  const isLoggedIn = !!user;

  const base = "p-2 rounded-full transition-colors flex items-center justify-center";
  const border = "border border-slate-600";

  return (
    <Link href={isLoggedIn ? "/profile" : "/login"}>
      {isLoggedIn ? (
        <div className={`${base} ${border} ${isActive ? "bg-slate-700 text-amber-400" : "text-white hover:bg-slate-700 hover:text-amber-400"}`}>
          <CiUser size={26} />
        </div>
      ) : (
        <div className={`${base} ${border} text-white hover:text-amber-400 hover:bg-slate-700`}>
          <CiLogin size={26} />
        </div>
      )}
    </Link>
  );
}