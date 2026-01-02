"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NewlyAdded() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/get?limit=4&sortBy=newest&sortOrder=desc`,
          { cache: "no-store" }
        );

        const data = await res.json();
        setProducts(data.products || data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold mb-2">Newly Added Products</h2>
        <p className="text-slate-400">
          Fresh arrivals from our premium watch collection
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="block"
            >
              <div
                className="group bg-slate-900/60 border border-white/10 rounded-2xl p-5
                           hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/20
                           transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="bg-slate-800 rounded-xl mb-4 overflow-hidden h-48 flex items-center justify-center">
                  <img
                    src={product.imageUrl?.[0]?.url || "/watch1.jpg"}
                    alt={product.code}
                    className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Code */}
                <p className="text-sm text-center text-slate-400">
                  Code:{" "}
                  <span className="text-white font-medium">{product.code}</span>
                </p>

                {/* Price */}
                <p className="text-lg font-semibold text-center text-amber-400 mt-1">
                  ₹{product.cost}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
