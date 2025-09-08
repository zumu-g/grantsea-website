'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AIChatWidget from '@/components/AIChatWidget';
import Header from '@/components/Header';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

// Mock agent data - in production this would come from the API
const mockAgents: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    phone: '03 9123 4567',
    mobile: '0423 456 789',
    photo: '/agents/sarah-thompson.jpg',
    bio: `With over 15 years of experience in Melbourne's Southeast real estate market, Sarah Thompson has established herself as one of the region's most trusted property consultants. Her deep understanding of the local market, combined with her commitment to exceptional client service, has resulted in countless successful property transactions and satisfied clients.

Sarah specializes in residential properties across Berwick, Narre Warren, and surrounding suburbs. Her approach combines market expertise with genuine care for her clients' needs, ensuring every transaction is handled with professionalism and attention to detail.`,
    specialties: [
      'Residential Sales',
      'First Home Buyers',
      'Investment Properties',
      'Property Auctions'
    ],
    languages: ['English', 'Mandarin'],
    achievements: [
      'Top Sales Consultant 2023',
      'REIV Excellence Award 2022',
      'Over $150M in total sales',
      '200+ properties sold'
    ],
    testimonials: [
      {
        id: '1',
        author: 'John & Mary Davies',
        text: 'Sarah made selling our family home a stress-free experience. Her market knowledge and negotiation skills got us a price well above our expectations.',
        rating: 5
      },
      {
        id: '2',
        author: 'Michael Chen',
        text: 'As a first-time buyer, I appreciated Sarah\'s patience and guidance throughout the process. She found us the perfect home within our budget.',
        rating: 5
      }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarah-thompson',
      facebook: 'https://facebook.com/sarah.thompson.realestate'
    }
  },
  '2': {
    id: '2',
    name: 'Michael Chen',
    position: 'Property Investment Specialist',
    email: 'michael@grantsea.com',
    phone: '03 9123 4568',
    mobile: '0412 345 678',
    photo: '/agents/michael-chen.jpg',
    bio: `Michael Chen brings a unique perspective to real estate investment, combining his background in finance with deep local market knowledge. Fluent in English, Mandarin, and Cantonese, Michael serves a diverse clientele seeking investment opportunities in Melbourne's growth corridors.

His analytical approach and attention to market trends have helped numerous investors build successful property portfolios. Michael's expertise in identifying high-growth areas and understanding rental yields makes him an invaluable resource for property investors.`,
    specialties: [
      'Investment Properties',
      'Development Sites',
      'Commercial Real Estate',
      'International Buyers'
    ],
    languages: ['English', 'Mandarin', 'Cantonese'],
    achievements: [
      'Investment Specialist of the Year 2023',
      'MBA in Finance',
      '$100M+ in investment sales',
      'Featured in Property Investment Magazine'
    ],
    testimonials: [
      {
        id: '3',
        author: 'David & Lisa Wong',
        text: 'Michael\'s investment insights have been invaluable. He helped us build a portfolio of three properties with excellent returns.',
        rating: 5
      },
      {
        id: '4',
        author: 'Robert Smith',
        text: 'Professional, knowledgeable, and always available. Michael made my first investment property purchase seamless.',
        rating: 5
      }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/michael-chen-realestate',
      wechat: 'michael_chen_property'
    }
  },
  '3': {
    id: '3',
    name: 'Emma Wilson',
    position: 'New Homes Consultant',
    email: 'emma@grantsea.com',
    phone: '03 9123 4569',
    mobile: '0434 567 890',
    photo: '/agents/emma-wilson.jpg',
    bio: `Emma Wilson specializes in new home sales and off-the-plan developments throughout Casey and Cardinia. With strong relationships with leading developers and builders, Emma provides exclusive access to the latest projects before they hit the market.

Her expertise in new construction, combined with her understanding of first home buyer grants and incentives, makes her the go-to consultant for buyers looking to enter the property market or upgrade to their dream home.`,
    specialties: [
      'New Home Sales',
      'Off-the-Plan Developments',
      'First Home Buyer Grants',
      'House & Land Packages'
    ],
    languages: ['English'],
    achievements: [
      'New Homes Specialist 2023',
      'Certified First Home Buyer Advocate',
      '150+ new homes sold',
      'Developer Partnership Excellence Award'
    ],
    testimonials: [
      {
        id: '5',
        author: 'Tom & Sarah Mitchell',
        text: 'Emma\'s knowledge of new developments helped us find the perfect house and land package. She guided us through every step.',
        rating: 5
      },
      {
        id: '6',
        author: 'Jessica Brown',
        text: 'Emma made buying my first home so easy. She explained all the grants and helped me get the best deal possible.',
        rating: 5
      }
    ],
    socialMedia: {
      instagram: '@emma_wilson_realestate',
      facebook: 'https://facebook.com/emma.wilson.newhomes'
    }
  }
};

export default function AgentProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [showContactForm, setShowContactForm] = useState(false);
  
  const agent = mockAgents[params.id as string] || mockAgents['1'];
  
  // Get properties listed by this agent
  const { properties, loading: propertiesLoading } = useProperties();
  const agentProperties = properties.filter(p => p.agent.name === agent.name).slice(0, 6);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    alert('Thank you for your inquiry. ' + agent.name + ' will contact you shortly.');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/agents" className="hover:text-blue-600">Our Team</Link>
          <span>/</span>
          <span className="text-gray-900">{agent.name}</span>
        </div>
      </div>

      {/* Agent Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Agent Photo */}
            <div className="md:col-span-1">
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  {agent.photo ? 'Agent Photo' : 'No Photo Available'}
                </div>
                {/* Trust badges */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Verified Agent
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Quick Response
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-2">{agent.name}</h1>
              <p className="text-xl text-gray-600 mb-6">{agent.position}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <a href={`tel:${agent.mobile}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {agent.mobile}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-blue-600 hover:underline">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {agent.email}
                    </a>
                    {agent.phone && (
                      <p className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Office: {agent.phone}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.languages.map((lang: string, index: number) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                  
                  {agent.socialMedia && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Connect</h3>
                      <div className="flex gap-4">
                        {agent.socialMedia.linkedin && (
                          <a href={agent.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                            LinkedIn
                          </a>
                        )}
                        {agent.socialMedia.facebook && (
                          <a href={agent.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                            Facebook
                          </a>
                        )}
                        {agent.socialMedia.instagram && (
                          <a href={`https://instagram.com/${agent.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                            Instagram
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Contact {agent.name.split(' ')[0]}
                </button>
                <Link
                  href={`/properties?agent=${agent.id}`}
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
                >
                  View Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 border-b-2 transition ${
                activeTab === 'about'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`py-4 border-b-2 transition ${
                activeTab === 'achievements'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`py-4 border-b-2 transition ${
                activeTab === 'properties'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Properties ({agentProperties.length})
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`py-4 border-b-2 transition ${
                activeTab === 'testimonials'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Testimonials
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-12">
        {activeTab === 'about' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">About {agent.name}</h2>
            <div className="prose prose-lg">
              {agent.bio.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Specialties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {agent.specialties.map((specialty: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Achievements & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agent.achievements.map((achievement: string, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{achievement}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Current Listings</h2>
            {propertiesLoading ? (
              <p>Loading properties...</p>
            ) : agentProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {agentProperties.map((property: any) => (
                  <Link
                    key={property.id}
                    href={`/property/${property.id}`}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition"
                  >
                    <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-500">
                      Property Image
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{property.address}</h3>
                      <p className="text-gray-600 text-sm mb-2">{property.suburb}</p>
                      <p className="text-lg font-bold text-blue-600">
                        {property.priceDisplay || formatPrice(property.price)}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.carSpaces} car</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No current listings available.</p>
            )}
            
            <div className="mt-8 text-center">
              <Link
                href={`/properties?agent=${agent.id}`}
                className="text-blue-600 hover:underline"
              >
                View all properties by {agent.name} →
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Client Testimonials</h2>
            <div className="space-y-6">
              {agent.testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xl font-semibold text-gray-600">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(testimonial.rating)].map((_: any, i: number) => (
                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">"{testimonial.text}"</p>
                      <p className="text-sm text-gray-600">— {testimonial.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Contact {agent.name}</h3>
            <form onSubmit={handleContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="I'm interested in..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
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