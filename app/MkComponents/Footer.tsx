import Link from "next/link";

export default function Footer() {
  return (
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
        </div>
      </div>
    </footer>
  );
}
