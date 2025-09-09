'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AIChatWidget from '@/components/AIChatWidget';
import Header from '@/components/Header';
import { useProperty } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

export default function PropertyDetailPage() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  
  const { property, loading, error } = useProperty(params.id as string);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property not found</h2>
          <p className="text-gray-600 mb-4">{error || 'The property you are looking for does not exist.'}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-blue-600">Properties</Link>
          <span>/</span>
          <span className="text-gray-900">{property.address}, {property.suburb}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-200 rounded-lg overflow-hidden" style={{ height: '500px' }}>
              {/* Main Image */}
              {property.images && property.images.length > 0 ? (
                <Image
                  src={property.images[currentImageIndex].url}
                  alt={property.images[currentImageIndex].caption || `${property.address}, ${property.suburb} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority={currentImageIndex === 0}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              
              {/* Navigation Buttons - Only show if multiple images */}
              {property.images && property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {property.images && property.images.length > 1 && (
              <div className="grid grid-cols-6 gap-2 mt-4">
                {property.images.map((image, index) => (
                <button
                  key={image.id || index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative bg-gray-200 rounded overflow-hidden h-20 ${
                    currentImageIndex === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.caption || `Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
              </div>
            )}

            {/* Property Description */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Property Description</h2>
              <p className="text-gray-600 mb-6">{property.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Property Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{property.address}, {property.suburb}</h1>
                <p className="text-3xl font-bold text-blue-600">{property.priceDisplay || formatPrice(property.price)}</p>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                <div className="text-center">
                  <div className="text-2xl font-bold">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{property.carSpaces}</div>
                  <div className="text-sm text-gray-600">Car Spaces</div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-semibold">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Land Size</span>
                  <span className="font-semibold">{property.landSize ? `${property.landSize} sqm` : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Building Size</span>
                  <span className="font-semibold">{property.buildingSize ? `${property.buildingSize} sqm` : 'N/A'}</span>
                </div>
              </div>

              {/* Agent Contact */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">Contact Agent</h3>
                <div className="space-y-2">
                  <Link href={`/agent/${property.agent.id}`} className="font-semibold text-blue-600 hover:underline block">
                    {property.agent.name}
                  </Link>
                  <a href={`tel:${property.agent.phone}`} className="text-gray-600 hover:text-blue-600 block">
                    {property.agent.phone}
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="text-gray-600 hover:text-blue-600 block">
                    {property.agent.email}
                  </a>
                  <Link href={`/agent/${property.agent.id}`} className="inline-block mt-2 text-sm text-blue-600 hover:underline">
                    View agent profile →
                  </Link>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Make an Inquiry
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition">
                  Book Inspection
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <span className="text-gray-500">Map View - {property.address}</span>
          </div>
        </div>
      </main>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Property Inquiry</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 border rounded-lg"
                defaultValue={`I'm interested in ${property.address}`}
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Send Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => setShowInquiryForm(false)}
                  className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AIChatWidget />
    </div>
  );
}