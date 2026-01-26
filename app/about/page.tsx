import Link from "next/link";
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
      
        <Link href="/" className="inline-flex items-center gap-2 mb-8 text-amber-400 hover:text-amber-300">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-3">About the Clock App</h1>
          <p className="text-lg text-gray-300">A premium watch collection platform built with modern technology and timeless design.</p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            We believe in the perfect marriage of functionality and elegance. Our platform brings together exquisite timepieces from around the world, 
            showcasing the craftsmanship and innovation that define modern watchmaking. We're dedicated to making luxury accessible and inspiring 
            passionate collectors and enthusiasts alike.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-400">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-400 transition">
              <h3 className="font-bold text-lg mb-2">Curated Collection</h3>
              <p className="text-gray-300">Handpicked watches from renowned brands with authentic certifications and detailed specifications.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-400 transition">
              <h3 className="font-bold text-lg mb-2">Expert Support</h3>
              <p className="text-gray-300">Our team of watch enthusiasts is ready to help you find the perfect timepiece for any occasion.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-400 transition">
              <h3 className="font-bold text-lg mb-2">Secure Transactions</h3>
              <p className="text-gray-300">Safe and reliable payment options with comprehensive buyer protection and warranty coverage.</p>
            </div>
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-400 transition">
              <h3 className="font-bold text-lg mb-2">Community</h3>
              <p className="text-gray-300">Join a thriving community of watch lovers, collectors, and enthusiasts from around the globe.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-400">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-700 p-6 rounded-lg text-center border border-slate-600 hover:border-amber-400 transition">
              <img src="https://i.pravatar.cc/100?img=1" alt="Alice" className="mx-auto rounded-full mb-4 border-2 border-amber-400" />
              <div className="font-bold text-lg">Alice Smith</div>
              <div className="text-sm text-amber-400">Founder & CEO</div>
            </div>

            <div className="bg-slate-700 p-6 rounded-lg text-center border border-slate-600 hover:border-amber-400 transition">
              <img src="https://i.pravatar.cc/100?img=2" alt="Ben" className="mx-auto rounded-full mb-4 border-2 border-amber-400" />
              <div className="font-bold text-lg">Ben Johnson</div>
              <div className="text-sm text-amber-400">Chief Technology Officer</div>
            </div>

            <div className="bg-slate-700 p-6 rounded-lg text-center border border-slate-600 hover:border-amber-400 transition">
              <img src="https://i.pravatar.cc/100?img=3" alt="Clara" className="mx-auto rounded-full mb-4 border-2 border-amber-400" />
              <div className="font-bold text-lg">Clara Lee</div>
              <div className="text-sm text-amber-400">Head of Design</div>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-700 p-8 rounded-lg border border-slate-600">
          <h2 className="text-3xl font-bold mb-4 text-amber-400">Get In Touch</h2>
          <p className="text-gray-300 mb-4">Have questions or feedback? We'd love to hear from you!</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg transition">
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  );
}