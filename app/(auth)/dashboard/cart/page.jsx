"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useMyContext } from "@/context/context";

export default function CartPage() {
  const user = useMyContext();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = user.user?._id;

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/${userId}`);
        setCart(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
        userId,
        productId,
        quantity,
      });
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
        data: { userId, productId },
      });
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!cart || cart.items.length === 0) return <p className="p-4">Your cart is empty</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div className="flex items-center gap-4">
              {item.product.imageUrl?.[0]?.url && (
                <img
                  src={item.product.imageUrl[0].url}
                  alt={item.product.brand}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <p className="font-medium">{item.product.brand}</p>
                <p className="text-gray-500">${item.product.cost}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product._id, parseInt(e.target.value))
                }
                className="w-16 p-1 border rounded text-center"
              />
              <button
                onClick={() => removeItem(item.product._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end font-bold text-lg">
        Total: $
        {cart.items.reduce(
          (acc, item) => acc + item.product.cost * item.quantity,
          0
        )}
      </div>
    </div>
  );
}
