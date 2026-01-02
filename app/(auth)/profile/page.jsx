"use client";
import { useMyContext } from "@/context/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/update`,
        form,
        { withCredentials: true }
      );

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
        {/* Logout button top-right */}
        <button
          onClick={logOut}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
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
        </div>

        {/* Profile Form */}
        <div className="p-6 flex flex-col gap-4">
          {user ? (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                rows={3}
              />

              {message && <p className="text-green-600">{message}</p>}

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

              {/* Go to Cart button below form */}
              <button
                onClick={redirectToCart}
                className="w-full mt-4 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
              >
                Go to Cart
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500 font-medium">No user logged in</p>
          )}
        </div>
      </div>
    </main>
  );
}
