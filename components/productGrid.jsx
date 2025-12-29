// app/products/components/ProductGrid.jsx
import ProductCard from "./product-card.jsx";

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
