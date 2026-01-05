"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useMyContext } from "../../../context/context";

export default function RegisterPage() {
  const router = useRouter();
  const { updateState } = useMyContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRoll, setUserRoll] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateUsername(value: string) {
    if (value.length === 0) return "Username cannot be empty";
    if (value.length < 5) return "Username must be at least 5 characters";
    return "";
  }

  function validateEmail(value: string) {
    if (value.length === 0) return "Email cannot be empty";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email";
    return "";
  }

  function validatePassword(value: string) {
    if (value.length === 0) return "Password cannot be empty";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  }

  function validateConfirmPassword(value: string) {
    if (value.length === 0) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return "";
  }

  // MOVED OUTSIDE RETURN - Define function before JSX
  async function AddUser() {
    setSuccessMessage("");
    setIsLoading(true);

    // Validate all fields
    const usernameErr = validateUsername(username);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword);

    setUsernameError(usernameErr);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);

    if (usernameErr || emailErr || passwordErr || confirmPasswordErr) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        { username, email, password, userRoll},
        { withCredentials: true }
      );

      const data = res.data;

      if (res.status === 201) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setSuccessMessage(`Registration failed: ${data.message}`);
      }
    } catch (error: unknown) {
      let msg = "An error occurred. Please try again.";

      if (axios.isAxiosError(error) && error.response) {
        msg = error.response.data.message || msg;
      }

      setSuccessMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="text-amber-400 hover:text-amber-300 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-slate-700 rounded-lg p-8 shadow-xl border border-slate-600">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-300 mb-8">Join our watch community today</p>

          {successMessage && (
            <p className="text-green-200 bg-green-900 p-4 rounded-lg border border-green-700 mb-6">
              {successMessage}
            </p>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError(validateUsername(e.target.value));
                }}
                disabled={isLoading}
              />
              {usernameError && (
                <p className="text-red-400 text-sm mt-2">{usernameError}</p>
              )}
            </div>

            <div>
            <label className="block text-sm font-semibold mb-2">
              Account Type
            </label>

            <select
              value={userRoll}
              onChange={(e) => setUserRoll(e.target.value)} required
              className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>


            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(validateEmail(e.target.value));
                }}
                disabled={isLoading}
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
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(validatePassword(e.target.value));
                }}
                disabled={isLoading}
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError(validateConfirmPassword(e.target.value));
                }}
                disabled={isLoading}
              />
              {confirmPasswordError && (
                <p className="text-red-400 text-sm mt-2">{confirmPasswordError}</p>
              )}
            </div>

            <button
              className={`w-full py-3  cursor-pointer rounded-lg font-bold transition ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 hover:shadow-lg"
              }`}
              onClick={AddUser}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Create Account"}
            </button>

            <p className="text-center text-gray-300">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-400 cursor-pointer hover:text-amber-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}