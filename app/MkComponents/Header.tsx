import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#013A40] text-white py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Harvest Hub</h1>
        <nav className="space-x-6 flex">
          <Link href="/myaccount" className="text-white hover:underline">
            My Account
          </Link>
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
  );
}
