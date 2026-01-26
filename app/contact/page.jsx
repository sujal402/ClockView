"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validate() {
    if (!name.trim()) return "Name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Valid email is required";
    if (!message.trim() || message.length < 10) return "Message must be at least 10 characters long";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`,
        {
          username: name,   // match backend field names
          email,
          message,
        }
      );

      setSuccess(res.data.message || "Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      if (error.response) {
        // Backend responded with error
        setError(error.response.data.message || "Failed to send message");
      } else {
        // Network error
        setError(error.message || "Network error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-amber-400 hover:text-amber-300">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
        
        <div className="bg-slate-700 rounded-lg p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-300 mb-8">Have feedback or questions? Send us a message and we'll get back to you soon.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-200 bg-red-900 p-4 rounded-lg border border-red-700">{error}</div>}
            {success && <div className="text-green-200 bg-green-900 p-4 rounded-lg border border-green-700">{success}</div>}

            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                rows={6} 
                className="w-full bg-slate-600 border border-slate-500 text-white p-3 rounded-lg focus:border-amber-400 focus:outline-none transition resize-none"
                placeholder="Your message here..."
              />
            </div>

            <div className="flex items-center gap-4">
              <button 
                type="submit" 
                disabled={isLoading} 
                className={`px-6 py-3 rounded-lg font-semibold transition ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 hover:shadow-lg'}`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
              <button 
                type="button" 
                onClick={() => { setName(''); setEmail(''); setMessage(''); setError(''); setSuccess(''); }} 
                className="px-6 py-3 rounded-lg font-semibold bg-slate-600 hover:bg-slate-500 transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
