"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useMyContext } from "@/context/context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { theme, language, user,userEmail,userName,updateState } = useMyContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    if (value.length < 7) return "Valid email is required";
    return "";
  };

  const validatePassword = (value) => {
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const verifyUser = async function() {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passErr);

    if (emailErr || passErr) return;

    console.log("Verifying user...");
    // console.log("backend url:", process.env.NEXT_PUBLIC_BACKEND_URL);

    try {

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          {email,password } ,
          { withCredentials: true }
        );

      console.log("Login response:", res);
      if (res.status !== 200) {
        setPasswordError("Invalid email or password");
        return;
      }
      updateState("userEmail", email);
      updateState("user", res.data.user);

      console.log("User verified");
      router.push("/");
    }catch(error){
      console.log("login error:",error.message);
      setPasswordError("Invalid email or password");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="text-amber-400 hover:text-amber-300 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-slate-700 rounded-lg p-8 shadow-xl border border-slate-600">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-300 mb-8">Sign in to your account</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(validateEmail(e.target.value));
                }}
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-2">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value));
                }}
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <button
              onClick={verifyUser}
              className="w-full py-3 rounded-lg cursor-pointer font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 hover:shadow-lg transition mt-2"
            >
              Sign In
            </button>

            <p className="text-center text-gray-300">
              Don't have an account?{" "}
              <Link href="/register" className="text-amber-400 cursor-pointer hover:text-amber-300 font-semibold">
                Register here
              </Link>
            </p>
          </div>

          {/* Debug info
          {(userEmail || userName) && (
            <div className="mt-6 pt-6 border-t border-slate-600 text-xs text-gray-400 space-y-1">
              <p>Theme: {theme}</p>
              <p>User: {userName || "Not set"}</p>
              <p>Email: {userEmail || "Not set"}</p>
            </div>
          )} */}
        </div>
      </div>
    </main>
  );
}
