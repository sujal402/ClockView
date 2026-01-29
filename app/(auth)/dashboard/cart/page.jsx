"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMyContext } from "@/context/context";

export default function CartPage() {
  const user = useMyContext();
  const router = useRouter();
  const [cart, setCart] = useState(null);

  const userId = user.user?._id;

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/${userId}`
        );
        setCart(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, [userId]);

  const removeItem = async (productId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
        { data: { userId, productId } }
      );
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = () => {
    alert("Redirecting to payment gateway...");
  };

  if (!cart) {
    return (
      <div className="min-h-screen bg-black p-6 animate-pulse">
        <div className="h-8 w-40 bg-zinc-800 rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-zinc-800 rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-zinc-800 rounded" />
                  <div className="h-3 w-20 bg-zinc-800 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-8 w-16 bg-zinc-800 rounded-full" />
                <div className="h-9 w-20 bg-zinc-800 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <div className="h-12 w-48 bg-zinc-900 border border-zinc-800 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0)
    return (
      <div className="min-h-screen bg-black p-6 text-gray-400">
        Your cart is empty
      </div>
    );

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.cost * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 tracking-wide">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition"
          >
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => router.push(`/products/${item.product._id}`)}
            >
              {item.product.imageUrl?.[0]?.url && (
                <img
                  src={item.product.imageUrl[0].url}
                  alt={item.product.brand}
                  className="w-20 h-20 object-cover rounded-lg border border-zinc-800"
                />
              )}
              <div>
                <p className="font-semibold text-lg">{item.product.brand}</p>
                <p className="text-gray-400 text-sm">${item.product.cost}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full text-sm bg-zinc-800 text-gray-300 border border-zinc-700">
                Qty: {item.quantity}
              </span>

              <button
                onClick={() => removeItem(item.product._id)}
                className="px-4 py-2 rounded-lg bg-red-600/90 hover:bg-red-600 transition text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div className="px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xl font-bold">
          Total: ${total}
        </div>

        <button
          onClick={handleCheckout}
          className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition text-lg"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
