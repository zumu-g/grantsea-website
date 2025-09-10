'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ModernHeader() {
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Grant's Estate Agents</span>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/search" className="text-gray-700 hover:text-blue-600 font-medium">
                Search
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link href="/explore" className="text-gray-700 hover:text-blue-600 font-medium">
                Explore
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-blue-600 font-medium">
                Help
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button 
                onClick={() => setShowSearchModal(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Heart Icon for Saved Properties */}
              <Link 
                href="/saved-properties"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Saved Properties"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>

              {/* User Profile Icon */}
              <Link 
                href="/profile"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Profile"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Mobile Menu Icon */}
              <button 
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-20">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Search Properties</h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Search by suburb, postcode, or address..."
                className="w-full p-3 border rounded-lg focus:border-blue-600 focus:outline-none"
                autoFocus
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="p-3 border rounded-lg focus:border-blue-600 focus:outline-none">
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Townhouse</option>
                  <option>Land</option>
                </select>
                <input
                  type="number"
                  placeholder="Min Price"
                  className="p-3 border rounded-lg focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="p-3 border rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
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