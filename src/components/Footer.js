'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Left Links */}
          <div className="flex flex-col md:flex-row gap-5">
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
          <div>
            <Link href="/home">
              <h1 className="text-4xl lg:pr-16">NexCart</h1>
            </Link>
          </div>

          {/* Right Social Media Icons */}
          <div className="flex space-x-4">
            <button
              className="text-gray-400 hover:text-white"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook text-2xl"></i>
            </button>
            <button
              className="text-gray-400 hover:text-white"
              aria-label="Twitter"
            >
              <i className="bi bi-twitter text-2xl"></i>
            </button>
            <button
              className="text-gray-400 hover:text-white"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Bottom Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 NexCart. All Rights Reserved.</p>
          <div className="mt-2">
            <Link href="/terms" className="hover:text-gray-300 mx-2">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-gray-300 mx-2">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
