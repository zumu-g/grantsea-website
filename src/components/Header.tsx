'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Component1_39 } from '@/components/anima-exports/icons/Component1_39';
import { Component1_20 } from '@/components/anima-exports/icons/Component1_20';
import { Variant9 } from '@/components/anima-exports/icons/Variant9';
import { Component1_51 } from '@/components/anima-exports/icons/Component1_51';

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Grant's Estate Agents
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">Home</Link>
              <Link href="/listings" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">Listings</Link>
              <Link href="/properties" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">Buy</Link>
              <Link href="/properties?type=rent" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">Rent</Link>
              <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">Sell</Link>
              <Link href="/agents" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">Our Team</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-200">Contact</Link>
            </nav>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button 
                onClick={() => setShowSearchModal(true)}
                className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Search"
              >
                <Component1_39 className="w-5 h-5 text-gray-600" />
              </button>

              {/* Favorites Icon */}
              <Link 
                href="/favorites"
                className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Favorites"
              >
                <Component1_51 className="w-5 h-5 text-gray-600" />
              </Link>

              {/* User Profile Icon */}
              <Link 
                href="/profile"
                className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Profile"
              >
                <Component1_20 className="w-5 h-5 text-gray-600" />
              </Link>

              {/* Mobile Menu Icon */}
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-3 hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Menu"
              >
                <Variant9 className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t">
            <nav className="container mx-auto px-4 py-6 space-y-5">
              <Link href="/" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Home</Link>
              <Link href="/listings" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Listings</Link>
              <Link href="/properties" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Buy</Link>
              <Link href="/properties?type=rent" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Rent</Link>
              <Link href="/sell" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Sell</Link>
              <Link href="/agents" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Our Team</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">Contact</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Search Properties</h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form 
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const searchQuery = formData.get('search') as string;
                if (searchQuery) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                }
                setShowSearchModal(false);
              }}
            >
              <input
                name="search"
                type="text"
                placeholder="Search by suburb, postcode, or address..."
                className="w-full p-3 border rounded-lg focus:border-blue-600 focus:outline-none"
                autoFocus
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="p-3 border rounded-lg">
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Townhouse</option>
                  <option>Land</option>
                </select>
                <input
                  type="number"
                  placeholder="Min Price"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="p-3 border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Search Properties
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}