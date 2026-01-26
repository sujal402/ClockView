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
    <div className="min-h-screen bg-gradient-to-b  text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

        <Filters />

        <ProductGrid products={data.products} />

        {/* Pagination Info */}
        <div className="mt-8 flex justify-center">
          <div className="bg-card text-card-foreground p-4 rounded-lg shadow-md">
            <p className="text-sm">
              Page <span className="font-semibold">{data.pagination.currentPage}</span> of <span className="font-semibold">{data.pagination.totalPages}</span> | Total Products: <span className="font-semibold">{data.pagination.totalProducts}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
