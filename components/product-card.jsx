import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border border-border p-4 rounded-lg hover:shadow-lg transition cursor-pointer bg-card text-card-foreground flex flex-col h-full">
        <img
          src={product.imageUrl?.[0]?.url || "/watch1.jpg"} // ✅ access url
          alt={product?.name}
          className="w-full h-48 object-contain mb-3 rounded-md"
        />

        <div className="flex-grow">
          <p className="text-sm font-medium text-primary">Code: {product.code}</p>
          <p className="text-sm text-muted-foreground">Company: {product.companyName}</p>
          <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>
          <p className="text-sm text-muted-foreground">Country: {product.countryOfManufacture}</p>
          <p className="text-sm text-muted-foreground">Machine No: {product.machineNo}</p>
          <p className="text-sm text-muted-foreground">First Inside Cover No: {product.firstInsideCoverNo}</p>
          <p className="text-sm text-muted-foreground">Second Inside Cover No: {product.secondInsideCoverNo}</p>
          <p className="text-sm text-muted-foreground">Condition: {product.condition}</p>
          <p className="text-sm text-muted-foreground">Diameter (mm): {product.diameterMm}</p>
          <p className="text-sm text-muted-foreground">Weight (gms): {product.weightGms}</p>
          <p className="text-sm font-semibold text-primary">Cost: ₹{product.cost}</p>
          <p className="text-sm text-muted-foreground">
            Remarks: {product.remarks.length > 40 ? product.remarks.substring(0, 40) + "..." : product.remarks}
          </p>
        </div>
      </div>
    </Link>
  );
}
