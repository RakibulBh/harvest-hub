import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  ArrowRight,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-green-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="bg-green-50 rounded-xl p-8 mb-12">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Stay updated
              </h3>
              <p className="text-gray-600">
                Subscribe to our newsletter for the latest updates and offers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-green-600">
                Subscrib<span className="text-gray-800">ify</span>
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              The easiest way to manage and customize your subscription
              packages.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/packages"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/custom"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Create Custom
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/licensing"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="text-green-600 mr-2 mt-1" size={18} />
                <span className="text-gray-600">support@subscribify.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="text-green-600 mr-2 mt-1" size={18} />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-green-600 font-medium hover:underline mt-2"
                >
                  Get in touch <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Subscribify. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-green-600 transition-colors"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-green-600 transition-colors"
            >
              Accessibility
            </Link>
            <Link
              href="#"
              className="text-gray-500 text-sm hover:text-green-600 transition-colors"
            >
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
