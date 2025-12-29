import RecommendationedProducts from "@/components/Recommended-products";
import QuantityAndCart from "@/components/QuantityAndCart";

export default async function ProductDetail({ params }: any) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    return <div className="flex justify-center text-white">Invalid product ID</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/get/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="flex justify-center text-white">Failed to load product.</div>;
  }

  const { product } = await res.json();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      
      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        
        {/* Image */}
        <div className="bg-slate-900/60 rounded-2xl p-6 border border-white/10">
          <img
            src={product?.imageUrl || "/watch1.jpg"}
            alt={product?.name}
            className="w-full h-[420px] object-contain"
          />
        </div>

        {/* Details */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            <p><span className="font-semibold text-white">Code:</span> {product.code}</p>
            <p><span className="font-semibold text-white">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold text-white">Company:</span> {product.companyName}</p>
            <p><span className="font-semibold text-white">Country:</span> {product.countryOfManufacture}</p>
            <p><span className="font-semibold text-white">Machine No:</span> {product.machineNo}</p>
            <p><span className="font-semibold text-white">Condition:</span> {product.condition}</p>
            <p><span className="font-semibold text-white">Diameter:</span> {product.diameterMm} mm</p>
            <p><span className="font-semibold text-white">Weight:</span> {product.weightGms} gms</p>
          </div>

          <p className="mt-4 text-slate-400">
            <span className="font-semibold text-white">Remarks:</span> {product.remarks}
          </p>

          <p className="text-2xl font-bold text-amber-400 mt-6">
            ₹ {product.cost}
          </p>

          {/* Quantity + Cart */}
          <QuantityAndCart product={product} />
        </div>
      </section>

      {/* Recommended */}
      <RecommendationedProducts />
    </main>
  );
}
