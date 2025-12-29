// app/products/page.jsx
import Filters from "@/components/search-filter.jsx";
import ProductGrid from "@/components/productGrid.jsx";

export default async function ProductsPage({ searchParams }) {
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const query = new URLSearchParams(params).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/get?${query}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch products:", res.status, text);
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <Filters />

      <ProductGrid products={data.products} />

      {/* Pagination Info */}
      <div className="mt-4">
        Page {data.pagination.currentPage} of {data.pagination.totalPages} | Total Products: {data.pagination.totalProducts}
      </div>
    </div>
  );
}
