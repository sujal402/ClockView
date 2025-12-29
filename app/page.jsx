import Link from "next/link";
import NewlyAdded from "../components/Newly-added";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Banner Section */}
      <section className="relative w-full h-80 md:h-96 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative text-center text-white px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Premium Pocket Watches</h2>
          <p className="text-xl md:text-2xl font-light">Luxury Timepieces for Every Moment</p>
        </div>
      </section>  

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center px-4 relative z-10">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
        Timeless Elegance
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"> Redefined</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
        Discover our exquisite collection of luxury watches crafted for those who appreciate fine craftsmanship and timeless style.
        </p>
        <Link 
        href="/products" 
        className="inline-block px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-lg text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
        Explore Collection
        </Link>
      </div>
      </section>

      <NewlyAdded />

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-800 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-700 p-8 rounded-lg hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
          <p className="text-gray-300">Handpicked watches from renowned brands with authentic certifications.</p>
        </div>
        <div className="bg-slate-700 p-8 rounded-lg hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4">Competitive Price</h3>
          <p className="text-gray-300">Best market prices with flexible payment options and special discounts.</p>
        </div>
        <div className="bg-slate-700 p-8 rounded-lg hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4">Lifetime Support</h3>
          <p className="text-gray-300">Expert support and warranty coverage for peace of mind.</p>
        </div>
        </div>
      </div>
      </section>

      {/* Featured Brands Section */}
      <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Featured Brands </h2>
        <div className="grid md:grid-cols-4 gap-6">
        {["Rolex", "Omega", "Seiko", "Tudor"].map((brand) => (
          <div key={brand} className="bg-slate-700 p-8 rounded-lg text-center hover:scale-105 transition">
          <p className="text-xl font-semibold">{brand}</p>
          </div>
        ))}
        </div>
      </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-400 to-orange-500 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Find Your Perfect Watch?</h2>
        <Link 
        href="/products" 
        className="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition"
        >
        Browse Products
        </Link>
      </div>
      </section>
    </main>
    );
}