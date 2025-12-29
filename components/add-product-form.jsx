'use client';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

    try {
      const formData = new FormData(e.target);

      console.log("backend url:", process.env.NEXT_PUBLIC_BACKEND_URL);
      const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/add`;

      const res = await axios.post(backendUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      if (res.status === 201 || res.status === 200) {
        alert("Product added successfully!");
        e.target.reset();
      } else {
        alert("Failed to add product");
      }
    } catch (err) {
      console.log("Axios error object:", err);
      console.log("Message:", err.message);             // Network error or other
      alert("Error submitting product. Check console.");
    } finally {
      setLoading(false);
    }
};


  const inputClass =
    "w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8 md:p-12">
      <div className="max-w-5xl mx-auto">

        <Link href="/" className="text-amber-400 hover:text-amber-300 mb-8 inline-block">
          ← Back to Home
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Add New Product</h1>
          <p className="text-gray-300">
            Enter complete watch details and upload product media.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-700 border border-slate-600 rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input name="code" placeholder="Product Code" required className={inputClass} />
          <input name="companyName" placeholder="Company Name" required className={inputClass} />
          <input name="brand" placeholder="Brand" required className={inputClass} />
          <input name="countryOfManufacture" placeholder="Country of Manufacture" className={inputClass} />
          <input name="machineNo" placeholder="Machine No" className={inputClass} />
          <input name="firstInsideCoverNo" placeholder="First Inside Cover No" className={inputClass} />
          <input name="secondInsideCoverNo" placeholder="Second Inside Cover No" className={inputClass} />

          <select name="condition" required className={inputClass}>
            <option value="">Condition</option>
            <option>Excellent</option>
            <option>Needs Service</option>
            <option>Needs Repair</option>
          </select>

          <input type="number" name="diameterMm" placeholder="Diameter (mm)" className={inputClass} />
          <input type="number" name="weightGms" placeholder="Weight (gms)" className={inputClass} />

          <select name="bodyMaterial" className={inputClass}>
            <option value="">Body Material</option>
            <option>Gold</option>
            <option>Silver</option>
            <option>Alloy</option>
            <option>Nickel</option>
            <option>Iron</option>
            <option>Other</option>
          </select>

          <input type="number" name="cost" placeholder="Cost" required className={inputClass} />

          <textarea
            name="remarks"
            placeholder="Remarks"
            className={`${inputClass} md:col-span-2`}
          />

          {/* Images */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-amber-400">
              Product Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              className={inputClass}
            />
          </div>

          {/* Videos */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-amber-400">
              Product Videos
            </label>
            <input
              type="file"
              name="videos"
              multiple
              accept="video/*"
              className={inputClass}
            />
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 mt-4 cursor-pointer bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold py-3 rounded-lg hover:shadow-lg transition"
          >
            {loading ? 'Saving...' : 'Add Product'}
          </button>
        </form>
      </div>
    </main>
  );
}
