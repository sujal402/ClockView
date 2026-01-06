// "use client";
// import { useState } from "react";

// export default function Page() {
//   const [selected, setSelected] = useState("profile");

//   return (
//     <div className="flex h-screen">

//       {/* LEFT SIDE - STATIC */}
//       <div className="w-64 bg-gray-900 text-white fixed h-full p-4">
//         <h2 className="text-xl font-semibold mb-6">Menu</h2>

//         <div
//           onClick={() => setSelected("profile")}
//           className={`p-2 rounded cursor-pointer mb-2 
//             ${selected === "profile" ? "bg-gray-700" : "hover:bg-gray-800"}`}
//         >
//           Profile
//         </div>

//         <div
//           onClick={() => setSelected("explore")}
//           className={`p-2 rounded cursor-pointer mb-2 
//             ${selected === "explore" ? "bg-gray-700" : "hover:bg-gray-800"}`}
//         >
//           Explore
//         </div>

//         <div
//           onClick={() => setSelected("setting")}
//           className={`p-2 rounded cursor-pointer 
//             ${selected === "setting" ? "bg-gray-700" : "hover:bg-gray-800"}`}
//         >
//           Settings
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="ml-64 flex-1 p-6 bg-gray-100 overflow-auto">
//         {selected === "profile" && (
//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-bold mb-2">Content One</h3>
//             <p>This is the content for option one.</p>
//           </div>
//         )}

//         {selected === "explore" && (
//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-bold mb-2">Content Two</h3>
//             <p>This is the content for option two.</p>
//           </div>
//         )}

//         {selected === "setting" && (
//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-bold mb-2">Content Three</h3>
//             <p>This is the content for option three.</p>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard! The right panel content changes based on the route.</p>
    </div>
  );
}
