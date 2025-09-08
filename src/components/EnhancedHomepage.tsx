'use client';

import { useState } from 'react';
import Link from 'next/link';
import AIChatWidget from './AIChatWidget';

// Mock property data for carousel
const properties = [
  {
    id: 1,
    title: 'Modern Family Residence',
    price: '$1,250,000',
    location: 'Berwick',
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    image: '/api/placeholder/400/300',
    type: 'House',
  },
  {
    id: 2,
    title: 'Luxury Waterfront Estate',
    price: '$2,150,000',
    location: 'Narre Warren',
    bedrooms: 5,
    bathrooms: 4,
    carSpaces: 3,
    image: '/api/placeholder/400/300',
    type: 'House',
  },
  {
    id: 3,
    title: 'Contemporary Townhouse',
    price: '$780,000',
    location: 'Narre Warren South',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    image: '/api/placeholder/400/300',
    type: 'Townhouse',
  },
  {
    id: 4,
    title: 'Executive Family Home',
    price: '$1,450,000',
    location: 'Pakenham',
    bedrooms: 5,
    bathrooms: 3,
    carSpaces: 3,
    image: '/api/placeholder/400/300',
    type: 'House',
  },
  {
    id: 5,
    title: 'Modern Apartment Living',
    price: '$650,000',
    location: 'Officer',
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    image: '/api/placeholder/400/300',
    type: 'Apartment',
  },
];

export default function EnhancedHomepage() {
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  
  const nextProperty = () => {
    setCurrentPropertyIndex((prev) => (prev + 1) % properties.length);
  };
  
  const prevProperty = () => {
    setCurrentPropertyIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  // Get visible properties for carousel (3 at a time)
  const getVisibleProperties = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentPropertyIndex + i) % properties.length;
      visible.push(properties[index]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video Placeholder */}
      <section className="relative h-screen">
        {/* Video Placeholder Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-light">
            [Video Placeholder - Property Showcase Video Will Go Here]
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-20 bg-white bg-opacity-95 backdrop-blur-sm">
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
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Heading and AI Chat */}
              <div className="text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Your Property Journey Starts Here
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  Melbourne's Southeast trusted real estate experts
                </p>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                  <h3 className="text-lg font-semibold mb-3">Ask Grant's AI Assistant</h3>
                  <p className="text-sm text-gray-200">
                    Get instant answers about properties, market insights, and more
                  </p>
                </div>
              </div>

              {/* Right Side - Agent Image and Service Buttons */}
              <div className="relative">
                <div className="bg-white rounded-lg p-6 shadow-2xl">
                  {/* Agent Placeholder Image */}
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500">
                    [Estate Agent Image Placeholder]
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    How can we help you today?
                  </h3>
                  
                  <div className="space-y-3">
                    <Link href="/buy" className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-700 transition-colors">
                      I'm looking to buy
                    </Link>
                    <Link href="/lease" className="block w-full bg-gray-800 text-white py-3 px-6 rounded-lg text-center hover:bg-gray-900 transition-colors">
                      I'm looking to lease
                    </Link>
                    <Link href="/sell" className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg text-center hover:bg-green-700 transition-colors">
                      I'm looking to sell
                    </Link>
                    <Link href="/appraisal" className="block w-full bg-orange-600 text-white py-3 px-6 rounded-lg text-center hover:bg-orange-700 transition-colors">
                      Get a free appraisal
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suburb Profiles Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Explore Our Suburbs</h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            {/* Berwick (was Cloud) */}
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-5xl mb-4">🏘️</div>
              <h3 className="text-xl font-semibold mb-2">Berwick</h3>
              <p className="text-gray-600 text-sm">Historic charm meets modern living</p>
              <p className="text-blue-600 font-semibold mt-2">Avg: $1.2M</p>
            </div>
            
            {/* Narre Warren (was Performance) */}
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Narre Warren</h3>
              <p className="text-gray-600 text-sm">Family-friendly community hub</p>
              <p className="text-blue-600 font-semibold mt-2">Avg: $850K</p>
            </div>
            
            {/* Narre Warren South (was Cloudmonster) */}
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-5xl mb-4">🌳</div>
              <h3 className="text-xl font-semibold mb-2">Narre Warren South</h3>
              <p className="text-gray-600 text-sm">Modern estates & parklands</p>
              <p className="text-blue-600 font-semibold mt-2">Avg: $920K</p>
            </div>
            
            {/* Pakenham (was Core) */}
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-5xl mb-4">🏡</div>
              <h3 className="text-xl font-semibold mb-2">Pakenham</h3>
              <p className="text-gray-600 text-sm">Growth corridor opportunity</p>
              <p className="text-blue-600 font-semibold mt-2">Avg: $680K</p>
            </div>
            
            {/* Officer (was The Roger) */}
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">Officer</h3>
              <p className="text-gray-600 text-sm">Emerging lifestyle precinct</p>
              <p className="text-blue-600 font-semibold mt-2">Avg: $750K</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals - Property Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">New Property Listings</h2>
            <div className="flex gap-2">
              <button
                onClick={prevProperty}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextProperty}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {getVisibleProperties().map((property, index) => (
              <Link
                key={`${property.id}-${index}`}
                href={`/property/${property.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 block"
              >
                <div className="relative h-64 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Property Image
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    NEW
                  </div>
                  <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm">
                    {property.type}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-3">{property.price}</p>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span>🛏️ {property.bedrooms} Beds</span>
                    <span>🚿 {property.bathrooms} Baths</span>
                    <span>🚗 {property.carSpaces} Cars</span>
                  </div>
                  
                  <div className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors text-center">
                    View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-lg">Properties Sold</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-lg">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-lg">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">5</p>
              <p className="text-lg">Office Locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grant's AI Chat - Now with ChatGPT style */}
      <AIChatWidget />
    </div>
  );
}