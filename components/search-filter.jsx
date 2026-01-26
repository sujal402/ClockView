"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [company, setCompany] = useState(searchParams.get("companyName") || "");
  const [condition, setCondition] = useState(searchParams.get("condition") || "");
  const [priceRange, setPriceRange] = useState(
    Number(searchParams.get("priceRange")) || 0
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc"
  );

  const toggleSortOrder = () => {
    if (!sortBy) return;
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = new URLSearchParams(searchParams.toString());

      search ? query.set("search", search) : query.delete("search");
      company ? query.set("companyName", company) : query.delete("companyName");
      condition ? query.set("condition", condition) : query.delete("condition");

      priceRange > 0
        ? query.set("priceRange", priceRange)
        : query.delete("priceRange");

      if (sortBy) {
        query.set("sortBy", sortBy);
        query.set("sortOrder", sortOrder);
      } else {
        query.delete("sortBy");
        query.delete("sortOrder");
      }

      router.push(`/products?${query.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, company, condition, priceRange, sortBy, sortOrder]);

  return (
    <div className="mb-6 overflow-x-auto bg-card p-4 rounded-lg shadow-md">
      <div className="flex flex-nowrap gap-4 min-w-max px-1">

        <input
          type="text"
          placeholder="Search by code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-input border border-border text-foreground p-2 min-w-[200px] rounded focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <input
          type="text"
          placeholder="Search by company..."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="bg-input border border-border text-foreground p-2 min-w-[200px] rounded focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="bg-input border border-border text-foreground p-2 min-w-[200px] rounded focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="" className="bg-white text-black dark:bg-zinc-900 dark:text-white">All Conditions</option>
          <option value="Excellent" className="bg-white text-black dark:bg-zinc-900 dark:text-white">Excellent</option>
          <option value="Needs Service" className="bg-white text-black dark:bg-zinc-900 dark:text-white">Needs Service</option>
          <option value="Needs Repair" className="bg-white text-black dark:bg-zinc-900 dark:text-white">Needs Repair</option>
        </select>

        {/* Price Range */}
        <div className="flex items-center gap-2 bg-muted p-2 rounded">
          <span className="text-sm font-medium text-foreground">
            Max Price: ₹{priceRange.toLocaleString()}
          </span>
          <input
            type="range"
            min={0}
            max={100000}
            step={1000}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-[200px] cursor-pointer accent-primary"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center border border-border rounded overflow-hidden bg-input">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-input text-foreground p-2 min-w-[200px] outline-none border-r border-border"
          >
            <option value="" className="bg-white text-black dark:bg-zinc-900 dark:text-white">Sort By</option>
            <option value="price" className="bg-white text-black dark:bg-zinc-900 dark:text-white">Price</option>
            <option value="newest" className="bg-white text-black dark:bg-zinc-900 dark:text-white">Newest</option>
            <option value="popular" className="bg-white text-black dark:bg-zinc-900 dark:text-white">Popular</option>
          </select>

          <button
            onClick={toggleSortOrder}
            disabled={!sortBy}
            className={`p-3 px-4 text-3xl font-extrabold transition bg-input text-foreground
              ${
                !sortBy
                  ? "text-muted-foreground cursor-not-allowed"
                  : "hover:bg-accent"
              }`}
          >
            {sortOrder === "asc" ? "⬆" : "⬇"}
          </button>
        </div>

      </div>
    </div>
  );
}
