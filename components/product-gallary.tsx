"use client";
import { useState } from "react";

export default function ProductGallery({ product }: any) {
  // State for main image
  const [mainImage, setMainImage] = useState(
    product.imageUrl?.[0]?.url || "/watch1.jpg"
  );

  // Optional: toggle full-screen mode
  const [isFull, setIsFull] = useState(false);

  return (
    <div>
      {/* Main Image */}
      <div
        className={`bg-slate-900/60 rounded-2xl p-6 border border-white/10 flex justify-center items-center ${
          isFull ? "fixed inset-0 z-50 bg-black bg-opacity-90 p-12" : ""
        }`}
      >
        <img
          src={mainImage}
          alt={product.name}
          className={`object-contain rounded-lg cursor-pointer ${
            isFull ? "w-full h-full" : "w-full h-[420px]"
          }`}
          onClick={() => setIsFull(!isFull)} // toggle full image
        />
      </div>

      {/* Thumbnails */}
      {!isFull && product.imageUrl && product.imageUrl.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto">
          {product.imageUrl.map((img: any, index: any) => (
            <img
              key={index}
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg border border-white/20 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setMainImage(img.url)}
            />
          ))}
        </div>
      )}

      {/* Videos */}
      {!isFull && product.videoUrl && product.videoUrl.length > 0 && (
        <div className="mt-6 flex flex-col space-y-4">
          {product.videoUrl.map((vid: any, i: any) => (
            <video
              key={i}
              src={vid.url}
              controls
              className="w-full max-w-md rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}
