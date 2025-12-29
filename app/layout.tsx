import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Headers";
import Footer from "../components/Footer";
import { MyContextProvider } from "../context/context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Buy Best watches ..",
//   description: "Affordabable and quality watch | by Clockiza",
// };



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <MyContextProvider >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        </MyContextProvider>
      </body>
    </html>
  );
}
