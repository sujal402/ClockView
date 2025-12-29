import Link from "next/link";

export default function Footer(){
    const currentYear = new Date().getFullYear();
    
    return(
    <>
        <footer className="bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 text-white">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-amber-400 mb-4">Clock Shop</h3>
                        <p className="text-gray-400 text-sm">Premium watches for every occasion.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-amber-400 transition">Home</Link></li>
                            <li><Link href="/products" className="hover:text-amber-400 transition">Products</Link></li>
                            <li><Link href="/about" className="hover:text-amber-400 transition">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
                            <li><a href="#" className="hover:text-amber-400 transition">FAQ</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Shipping Info</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-amber-400 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {currentYear} Clock Shop. All rights reserved.</p>
                    <p>Made with passion for watch enthusiasts.</p>
                </div>
            </div>
        </footer>
    </>
);
}