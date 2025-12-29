export default function RecommendedProducts() {
  return (
    <main className="bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden py-16">
      
      {/* Section Header / Banner */}
      <section className="relative w-full max-w-7xl mx-auto mb-12 rounded-3xl overflow-hidden">
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 flex items-center justify-center">
          
          {/* Glow effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-6 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-6 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Recommended Products
            </h2>
            <p className="text-lg md:text-xl font-light">
              Curated Luxury Timepieces Just for You
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {[
            { img: "/watch1.jpg", name: "Product 1" },
            { img: "/watch1.jpg", name: "Product 2" },
            { img: "/watch1.jpg", name: "Product 3" },
            { img: "/watch1.jpg", name: "Product 4" },
          ].map((product, index) => (
            <div
              key={index}
              className="group bg-slate-900/60 border border-white/10 rounded-2xl p-5 
                         hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20 
                         transition-all duration-300 cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl mb-4 bg-slate-800">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-lg font-semibold text-center group-hover:text-amber-400 transition">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
