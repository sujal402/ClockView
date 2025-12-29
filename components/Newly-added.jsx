export default function NewlyAdded() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-bold mb-2">
          Newly Added Products
        </h2>
        <p className="text-slate-400">
          Fresh arrivals from our premium watch collection
        </p>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {[
            "New Product 1",
            "New Product 2",
            "New Product 3",
            "New Product 4",
          ].map((name, index) => (
            <div
              key={index}
              className="group bg-slate-900/60 border border-white/10 rounded-2xl p-5
                         hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/20
                         transition-all cursor-pointer"
            >
              <div className="bg-slate-800 rounded-xl mb-4 overflow-hidden">
                <img
                  src="/watch1.jpg"
                  alt={name}
                  className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-lg font-semibold text-center group-hover:text-amber-400 transition">
                {name}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
