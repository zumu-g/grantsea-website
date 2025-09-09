'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Your Dream Home Awaits",
      subtitle: "Discover premium properties in Melbourne's Southeast",
      cta: "Browse Properties",
      link: "/properties",
    },
    {
      title: "Thinking of Selling?",
      subtitle: "Get a free market appraisal from our expert agents",
      cta: "Get Appraisal",
      link: "/contact",
    },
    {
      title: "Investment Opportunities",
      subtitle: "Maximize your returns with our property expertise",
      cta: "Learn More",
      link: "/contact",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700">
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 bg-white bg-opacity-95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Grant's Estate Agents
              </Link>
              
              <div className="hidden md:flex space-x-6">
                <Link href="/properties" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Properties
                </Link>
                <Link href="/buy" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Buy
                </Link>
                <Link href="/lease" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Lease
                </Link>
                <Link href="/sell" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sell
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="tel:0397048888" className="hidden md:block text-gray-700 hover:text-blue-600">
                📞 (03) 9704 8888
              </a>
              <Link
                href="/appraisal"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Free Appraisal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content - Centered with proper overlay positioning */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 transition-all duration-500">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 transition-all duration-500">
            {slides[currentSlide].subtitle}
          </p>
          
          <Link
            href={slides[currentSlide].link}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            {slides[currentSlide].cta}
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Properties Sold</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">98%</p>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">15+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">5</p>
              <p className="text-gray-600">Office Locations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}