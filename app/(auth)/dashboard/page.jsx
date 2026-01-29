"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useMyContext } from "@/context/context";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const user = useMyContext();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [cartSummary, setCartSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user.user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchDashboardData = async () => {
      try {
        // Fetch recent products
        const recentRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/recent`
        );
        setRecentProducts(recentRes.data);

        // Fetch orders
        const ordersRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${userId}`
        );
        setOrders(ordersRes.data);

        // Fetch cart summary
        const cartRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/${userId}`
        );
        setCartSummary(cartRes.data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 animate-pulse">
        <div className="h-8 w-40 bg-zinc-800 rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-zinc-900 border border-zinc-800 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>

      {/* Last Seen Products */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recently Viewed</h2>
        <div className="flex gap-4 overflow-x-auto">
          {recentProducts.length === 0 && (
            <p className="text-gray-400">No recently viewed products</p>
          )}
          {recentProducts.map((product) => (
            <div
              key={product._id}
              className="min-w-[150px] bg-zinc-900 p-3 rounded-lg cursor-pointer hover:bg-zinc-800 transition"
              onClick={() => router.push(`/product/${product._id}`)}
            >
              {product.imageUrl?.[0]?.url && (
                <img
                  src={product.imageUrl[0].url}
                  alt={product.brand}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <p className="text-sm font-semibold">{product.brand}</p>
              <p className="text-gray-400 text-sm">${product.cost}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Orders */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Your Orders</h2>
        {orders.length === 0 && (
          <p className="text-gray-400">No orders yet</p>
        )}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex justify-between items-center p-4 rounded-xl bg-zinc-900 border border-zinc-800"
            >
              <div>
                <p className="font-semibold">Order #{order._id}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()} | {order.status}
                </p>
              </div>
              <p className="font-bold">${order.total}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Summary */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Cart Summary</h2>
        {cartSummary.length === 0 && (
          <p className="text-gray-400">Your cart is empty</p>
        )}
        <div className="space-y-4">
          {cartSummary.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800"
            >
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => router.push(`/product/${item.product._id}`)}
              >
                {item.product.imageUrl?.[0]?.url && (
                  <img
                    src={item.product.imageUrl[0].url}
                    alt={item.product.brand}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <p className="font-semibold">{item.product.brand}</p>
                  <p className="text-gray-400 text-sm">${item.product.cost}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-zinc-800 text-gray-300 border border-zinc-700">
                Qty: {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
