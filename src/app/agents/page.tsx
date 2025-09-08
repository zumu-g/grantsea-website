'use client';

import React from 'react';
import Link from 'next/link';
import AIChatWidget from '@/components/AIChatWidget';
import Header from '@/components/Header';

// Mock agents data - in production this would come from the API
const agents = [
  {
    id: '1',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    mobile: '0423 456 789',
    photo: '/agents/sarah-thompson.jpg',
    specialties: ['Residential Sales', 'First Home Buyers'],
    languages: ['English', 'Mandarin'],
    propertiesCount: 12
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Property Investment Specialist',
    email: 'michael@grantsea.com',
    mobile: '0412 345 678',
    photo: '/agents/michael-chen.jpg',
    specialties: ['Investment Properties', 'Commercial Real Estate'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    propertiesCount: 8
  },
  {
    id: '3',
    name: 'Emma Wilson',
    position: 'New Homes Consultant',
    email: 'emma@grantsea.com',
    mobile: '0434 567 890',
    photo: '/agents/emma-wilson.jpg',
    specialties: ['New Home Sales', 'Off-the-Plan Developments'],
    languages: ['English'],
    propertiesCount: 15
  },
  {
    id: '4',
    name: 'David Martinez',
    position: 'Property Manager',
    email: 'david@grantsea.com',
    mobile: '0445 678 901',
    photo: '/agents/david-martinez.jpg',
    specialties: ['Property Management', 'Tenant Relations'],
    languages: ['English', 'Spanish'],
    propertiesCount: 45
  },
  {
    id: '5',
    name: 'Jessica Brown',
    position: 'Auction Specialist',
    email: 'jessica@grantsea.com',
    mobile: '0456 789 012',
    photo: '/agents/jessica-brown.jpg',
    specialties: ['Property Auctions', 'Market Analysis'],
    languages: ['English'],
    propertiesCount: 10
  },
  {
    id: '6',
    name: 'Tony Nguyen',
    position: 'Commercial Specialist',
    email: 'tony@grantsea.com',
    mobile: '0467 890 123',
    photo: '/agents/tony-nguyen.jpg',
    specialties: ['Commercial Real Estate', 'Development Sites'],
    languages: ['English', 'Vietnamese'],
    propertiesCount: 6
  }
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced agents are committed to helping you find your perfect property. 
            With local knowledge and a passion for real estate, we're here to guide you every step of the way.
          </p>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agent/${agent.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative">
                <div className="h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                  {agent.photo ? 'Agent Photo' : 'No Photo'}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                  <p className="text-white/90">{agent.position}</p>
                </div>
              </div>
              
              <div className="p-6">
                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.languages.map((lang, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 text-xs rounded">
                      {lang}
                    </span>
                  ))}
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Specialties:</h4>
                  <p className="text-sm text-gray-600">{agent.specialties.join(', ')}</p>
                </div>

                {/* Contact */}
                <div className="space-y-2 mb-4">
                  <a 
                    href={`tel:${agent.mobile}`} 
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {agent.mobile}
                  </a>
                  <a 
                    href={`mailto:${agent.email}`} 
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {agent.email}
                  </a>
                </div>

                {/* Properties Count */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-600">
                    {agent.propertiesCount} active listings
                  </span>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work With the Best?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Our team is here to help you achieve your real estate goals.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      <AIChatWidget />
    </div>
  );
}