'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OnStyleHeader() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[1001] transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-[90px] md:h-[90px] px-6 md:px-12">
            {/* Logo - Simplified text version */}
            <Link href="/" className="flex items-center">
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Grant's
              </span>
            </Link>

            {/* Center Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-12">
              <Link 
                href="/buy" 
                className={`text-xl font-bold transition-colors duration-200 ${
                  scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-gray-200'
                }`}
              >
                Buy
              </Link>
              <Link 
                href="/rent" 
                className={`text-xl font-bold transition-colors duration-200 ${
                  scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-gray-200'
                }`}
              >
                Rent
              </Link>
              <Link 
                href="/sell" 
                className={`text-xl font-bold transition-colors duration-200 ${
                  scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-gray-200'
                }`}
              >
                Sell
              </Link>
              <Link 
                href="/agents" 
                className={`text-xl font-bold transition-colors duration-200 ${
                  scrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-gray-200'
                }`}
              >
                Agents
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              {/* Search Icon */}
              <button 
                onClick={() => setShowSearchModal(true)}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
                  scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                }`}
                aria-label="Search"
              >
                <svg 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Saved Properties Icon */}
              <Link 
                href="/saved"
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
                  scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                }`}
                aria-label="Saved Properties"
              >
                <svg 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>

              {/* Profile Icon */}
              <Link 
                href="/profile"
                className={`w-12 h-12 hidden md:flex items-center justify-center rounded-full transition-all duration-200 ${
                  scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                }`}
                aria-label="Profile"
              >
                <svg 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`md:hidden w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
                  scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                }`}
                aria-label="Menu"
              >
                <svg 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className={`md:hidden border-t transition-colors duration-300 ${
              scrolled ? 'bg-white border-gray-200' : 'bg-black/90 border-white/20'
            }`}>
              <nav className="px-6 py-6 space-y-6">
                <Link 
                  href="/buy" 
                  className={`block text-lg font-bold transition-colors duration-200 ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Buy
                </Link>
                <Link 
                  href="/rent" 
                  className={`block text-lg font-bold transition-colors duration-200 ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Rent
                </Link>
                <Link 
                  href="/sell" 
                  className={`block text-lg font-bold transition-colors duration-200 ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Sell
                </Link>
                <Link 
                  href="/agents" 
                  className={`block text-lg font-bold transition-colors duration-200 ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Agents
                </Link>
                <Link 
                  href="/profile" 
                  className={`block text-lg font-bold transition-colors duration-200 ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Profile
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Add padding to body content to account for fixed header */}
      <div className="h-[90px] md:h-[90px]" />

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-[1002] pt-32">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Search Properties</h2>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Search by suburb, postcode, or address..."
                className="w-full p-4 text-lg border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                autoFocus
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="p-4 text-lg border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Townhouse</option>
                  <option>Land</option>
                </select>
                <input
                  type="number"
                  placeholder="Min Price"
                  className="p-4 text-lg border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="p-4 text-lg border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
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