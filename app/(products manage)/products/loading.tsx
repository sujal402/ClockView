export default function LoadingProducts() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 animate-pulse bg-gray-200 h-8 w-1/3 rounded"></h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border p-4 rounded-lg bg-white animate-pulse flex flex-col space-y-2">
            <div className="w-full h-48 bg-gray-200 rounded-md" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="px-6 py-2 bg-gray-300 rounded animate-pulse w-32 h-10"></div>
      </div>
    </div>
  );
}
