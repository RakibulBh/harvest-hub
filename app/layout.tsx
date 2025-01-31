import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harvest Hub",
  description: "Connecting clients and farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* Navigation Bar */}
        <header className="bg-[#013A40] text-white py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Harvest Hub</h1>
            <nav className="space-x-6 flex">
              <Link href="/" className="text-white hover:underline">
                Home
              </Link>
              <Link href="/myproducts" className="text-white hover:underline">
                My Products
              </Link>
              <Link href="/profile" className="text-white hover:underline">
                Farms
              </Link>
              <Link href="/dashboard" className="text-white hover:underline">
                Dashboard
              </Link>
              <Link href="/messages" className="text-white hover:underline">
                Messages
              </Link>
              <Link href="/contact" className="text-white hover:underline">
                Contact
              </Link>
              <Link href="/help" className="text-white hover:underline">
                Help
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">{children}</main>

        {/* Footer */}
        <footer className="bg-[#013A40] text-white text-center py-8">
          <p className="mb-4 text-lg font-semibold">Thank you for visiting our page</p>
          <div className="grid grid-cols-4 gap-6 justify-center text-white">
            {/* Column 1 */}
            <div>
              <h3 className="font-bold mb-2 text-yellow-300">Browse</h3>
              <Link href="#" className="hover:underline block">
                Popular Foods
              </Link>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-bold mb-2 text-yellow-300">Locations</h3>
              <Link href="#" className="hover:underline block">
                Near You
              </Link>
              <Link href="#" className="hover:underline block">
                Popular
              </Link>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-bold mb-2 text-yellow-300">Contact</h3>
              <Link href="#" className="hover:underline block">
                Email
              </Link>
              <Link href="#" className="hover:underline block">
                Phone
              </Link>
              <Link href="#" className="hover:underline block">
                Support
              </Link>
              <Link href="#" className="hover:underline block">
                Report
              </Link>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-bold mb-2 text-yellow-300">About Us</h3>
              <Link href="#" className="hover:underline block">
                Our Goal
              </Link>
              <Link href="#" className="hover:underline block">
                Why Choose Us
              </Link>
              <Link href="/privacy-policy" className="hover:underline block">
              Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
