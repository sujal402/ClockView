import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border p-4 rounded-lg hover:shadow-lg transition cursor-pointer bg-white flex flex-col">
        <img
          src={product?.imageUrl || "/watch1.jpg"}
          alt={product?.name}
          className="w-full h-48 object-contain mb-3 rounded-md"
        />

        <p className="text-sm font-medium">Code: {product.code}</p>
        <p className="text-sm">Company: {product.companyName}</p>
        <p className="text-sm">Brand: {product.brand}</p>
        <p className="text-sm">Country: {product.countryOfManufacture}</p>
        <p className="text-sm">Machine No: {product.machineNo}</p>
        <p className="text-sm">First Inside Cover No: {product.firstInsideCoverNo}</p>
        <p className="text-sm">Second Inside Cover No: {product.secondInsideCoverNo}</p>
        <p className="text-sm">Condition: {product.condition}</p>
        <p className="text-sm">Diameter (mm): {product.diameterMm}</p>
        <p className="text-sm">Weight (gms): {product.weightGms}</p>
        <p className="text-sm font-semibold">Cost: {product.cost}</p>
        <p className="text-sm text-gray-600">
          Remarks: {product.remarks.length > 40 ? product.remarks.substring(0, 40) + "..." : product.remarks}
        </p>
      </div>
    </Link>
  );
}
