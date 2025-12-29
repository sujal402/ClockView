import { CiUser } from "react-icons/ci";
import Link from "next/link";
import ProfileLogo from "./ProfileLogo"
// import { usePathname } from "next/navigation";

export default function Header(){
    // const pathname = usePathname();
    // const isActive = pathname === "/profile";

    return(
    <>
    <div className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-lg">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/favicon.ico" height={35} width={35} alt="logo" className="rounded-lg"/>
            <span className="text-xl font-bold text-amber-400 hidden sm:inline">Clock Shop</span>
        </Link>
        <div className="text-white">
            <ul className="flex justify-center gap-6 md:gap-8">
                <Link href="/"><li className="cursor-pointer hover:text-amber-400 transition-colors duration-150 font-medium">Home</li></Link>
                {/* <Link href="/products"><li className="cursor-pointer hover:text-amber-400 transition-colors duration-150 font-medium">Products</li></Link> */}
                <Link href="/about"><li className="cursor-pointer hover:text-amber-400 transition-colors duration-150 font-medium">About</li></Link>
                <Link href="/contact"><li className="cursor-pointer hover:text-amber-400 transition-colors duration-150 font-medium">Contact</li></Link>
            </ul>
        </div>
        <ProfileLogo />
        {/* <Link href="/profile" className="">
            <CiUser size={25} className={`cursor-pointer rounded-full p-1 transition-colors ${
          isActive ? "bg-blue-500 text-white" : "text-gray-600"
        }`}/>
        </Link> */}
    </div>
    </>
);
}