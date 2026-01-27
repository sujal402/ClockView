"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/context";
import { toast } from "sonner";
import cart from "@/app/(auth)/dashboard/cart/page.jsx";

export default function QuantityAndCart({ product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { user } = useMyContext();

  const isLoggedIn = !!user;

  function AddToCart(){

    console.log("Add to cart clicked");
    console.log("isLoggedIn:", isLoggedIn);
  

    if(!isLoggedIn){
      toast.warning("Please login to add items to cart");
      router.push("/login");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user._id,
        productId: product._id,
        quantity: quantity,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    toast.success("Added to cart");




    // router.push("/dashboard/cart");
  }

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
        onClick={AddToCart}
        className="bg-gradient-to-r from-amber-500 to-orange-500 
                   text-black font-semibold px-8 py-3 rounded-lg 
                   hover:scale-105 transition cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
}
