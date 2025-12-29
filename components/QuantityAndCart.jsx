"use client";
import { useState } from "react";

export default function QuantityAndCart({ product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-6 mt-8">
      
      {/* Counter */}
      <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="px-4 py-2 text-xl hover:bg-slate-700"
        >
          −
        </button>
        <span className="px-4 py-2">{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          className="px-4 py-2 text-xl hover:bg-slate-700"
        >
          +
        </button>
      </div>
      {/* Add to Cart */}
      <button
        onClick={() => console.log("Add to cart", product, quantity)}
        className="bg-gradient-to-r from-amber-500 to-orange-500 
                   text-black font-semibold px-8 py-3 rounded-lg 
                   hover:scale-105 transition cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
}
