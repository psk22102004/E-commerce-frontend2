'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white shadow-lg rounded-b-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 ">
        <div className="relative flex items-center py-4 justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} text-2xl`}></i>
            </button>
          </div>

          {/* Left Links */}
          <div className="hidden md:flex font-semibold  flex-grow space-x-10">
            <Link href="/home" className="hover:text-gray-400">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-400">
              Contact Us
            </Link>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2  transform -translate-x-1/2">
            <Link href="/home">
              <h1 className="text-4xl">NexCart</h1>
            </Link>
          </div>

          {/* Right Cart Icon */}
          <div className="flex items-center space-x-4 flex-grow justify-end">
            <button
              onClick={() => router.push('/cart')}
              className="text-gray-400 hover:text-white"
              aria-label="Cart"
            >
              <i className="bi bi-cart3 text-white text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-2 px-4 py-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
