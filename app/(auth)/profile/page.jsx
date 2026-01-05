"use client";
import { useMyContext } from "@/context/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminProfile from "@/components/adminProfile";
import CustomerProfile from "@/components/customerProfile";

export default function Profile() {
  const { user, updateState } = useMyContext();
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user) return;

    if(form.phone.length < 7) 
    {
      setMessage("Contact Number must be of 10 digit");
      return;
    }  

    if(form.address.length == 0) 
    {
      setMessage("Address should not be empty");
      return;
    }  
  

    setLoading(true);
    setMessage("");

    try {
      console.log("about to send req");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/update`,
        form,
        { withCredentials: true }
      );

      console.log("response : ",res);

      updateState("user", res.data.user);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const redirectToCart = () => router.push("/cart");

  const logOut = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
      updateState("user", null);
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden relative">
              <button
                onClick={logOut}
                className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition cursor-pointer"
              >
                Log Out
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-400 p-6 flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-amber-600">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{user?.username || "Guest"}</h1>
                  <p className="text-white/90 text-sm">{user?.email || "Not logged in"}</p>
                </div>
                  {/* Admin Button */}
                  {user?.userRoll === "admin" && (
                    <button
                      onClick={() => router.push("/admin")}
                      className="
                        px-4 py-2
                        bg-white/20 text-white font-semibold
                        rounded-xl
                        backdrop-blur-sm
                        hover:bg-white/30
                        transition
                        cursor-pointer
                      "
                    >
                      Admin Dashboard
                    </button>
                  )}
              </div>

              {/* Profile Form */}
              <div className="p-6 flex flex-col gap-4">
                {user ? (
                  <>
                  {/* Username */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      disabled
                      placeholder=" "
                      className="peer w-full p-4 pt-6 border border-slate-300 rounded-xl bg-slate-100 text-slate-700 focus:outline-none"
                    />
                    <label
                    className="
                      absolute left-4
                      top-4
                      text-sm text-slate-500
                      bg-slate-100 px-1
                      pointer-events-none
                      transition-all

                      peer-placeholder-shown:top-4
                      peer-placeholder-shown:text-sm

                      peer-focus:top-2
                      peer-focus:text-xs

                      peer-[&:not(:placeholder-shown)]:top-2
                      peer-[&:not(:placeholder-shown)]:text-xs
                    "
                    >
                      Username
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative w-full">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      disabled
                      placeholder=" "
                      className="peer w-full p-4 pt-6 border border-slate-300 rounded-xl bg-slate-100 text-slate-700 focus:outline-none"
                    />
                    <label
                    className="
                      absolute left-4
                      top-4
                      text-sm text-slate-500
                      bg-slate-100 px-1
                      pointer-events-none
                      transition-all

                      peer-placeholder-shown:top-4
                      peer-placeholder-shown:text-sm

                      peer-focus:top-2
                      peer-focus:text-xs

                      peer-[&:not(:placeholder-shown)]:top-2
                      peer-[&:not(:placeholder-shown)]:text-xs
                    "
                    >
                      Email
                    </label>
                  </div>

                  {/* User Role */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="userRole"
                      value={user?.userRoll}
                      disabled
                      placeholder=""
                      className="peer w-full p-4 pt-6 border border-slate-300 rounded-xl bg-slate-100 text-slate-700 focus:outline-none"
                    />
                    <label
                    className="
                      absolute left-4
                      top-4
                      text-sm text-slate-500
                      bg-slate-100 px-1
                      pointer-events-none
                      transition-all

                      peer-placeholder-shown:top-4
                      peer-placeholder-shown:text-sm

                      peer-focus:top-2
                      peer-focus:text-xs

                      peer-[&:not(:placeholder-shown)]:top-2
                      peer-[&:not(:placeholder-shown)]:text-xs
                    "
                    >
                      User Role
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="peer w-full p-4 pt-6 border border-slate-300 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                      <label
                      className="
                      absolute left-4
                      top-4
                      text-sm text-slate-500
                      bg-slate-100 px-1
                      pointer-events-none
                      transition-all

                      peer-placeholder-shown:top-4
                      peer-placeholder-shown:text-sm

                      peer-focus:top-2
                      peer-focus:text-xs

                      peer-[&:not(:placeholder-shown)]:top-2
                      peer-[&:not(:placeholder-shown)]:text-xs
                    "
                      >
                      Phone Number
                    </label>
                  </div>

                  {/* Address */}
                  <div className="relative w-full">
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      rows={3}
                      className="peer w-full p-4 pt-6 border border-slate-300 rounded-xl bg-white text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <label
                      className="
                      absolute left-4
                      top-4
                      text-sm text-slate-500
                      bg-slate-100 px-1
                      pointer-events-none
                      transition-all

                      peer-placeholder-shown:top-4
                      peer-placeholder-shown:text-sm

                      peer-focus:top-2
                      peer-focus:text-xs

                      peer-[&:not(:placeholder-shown)]:top-2
                      peer-[&:not(:placeholder-shown)]:text-xs
                    "

                    >
                      Address
                    </label>
                  </div>              
                  
                  {message && <p className="text-green-600">{message}</p>}

                  <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Updating..." : "Update Profile"}
                  </button>

                  {/* Go to Cart button below form */}
                  <button
                    onClick={redirectToCart}
                    className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition cursor-pointer"
                  >
                    Go to Cart
                  </button>
                  </> ) : (
                    <p className="text-center text-gray-500 font-medium">No user logged in</p>
                  )}
              </div>
      </div>
    </main>
  );
}
