'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProperties } from '@/hooks/useProperties';
import Header from '@/components/Header';
import PropertyCard from '@/components/property/PropertyCard';
import AIChatWidget from '@/components/AIChatWidget';

export default function HomePage() {
  const { properties, loading, error } = useProperties();
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // Get the first 6 properties as featured
      setFeaturedProperties(properties.slice(0, 6));
    }
  }, [properties]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <Image
          src="/images/hero-image.jpg"
          alt="Luxury home"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex items-center">
          <div className="grant-container">
            <h1 className="grant-h1 text-white mb-6">
              Find your dream home with Grant&apos;s
            </h1>
            <p className="grant-body text-white/90 text-xl mb-8 max-w-2xl">
              Discover exceptional properties and trusted real estate services in your area
            </p>
            <div className="flex gap-4">
              <Link 
                href="/search" 
                className="grant-button grant-button-primary bg-white text-black hover:bg-gray-100"
              >
                Search Properties
              </Link>
              <Link 
                href="/about" 
                className="grant-button grant-button-secondary text-white border-white hover:bg-white/10"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-16 bg-gray-50">
        <div className="grant-container">
          <div className="text-center mb-12">
            <h2 className="grant-h2 mb-4">What are you looking for?</h2>
            <p className="grant-body text-gray-600">
              Start your property search with our quick filters
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/search?type=sale" className="grant-card hover:shadow-lg transition-shadow p-8 text-center">
              <h3 className="grant-h4 mb-2">Buy</h3>
              <p className="grant-body text-gray-600">
                Find your perfect home from our extensive listings
              </p>
            </Link>
            
            <Link href="/search?type=rent" className="grant-card hover:shadow-lg transition-shadow p-8 text-center">
              <h3 className="grant-h4 mb-2">Rent</h3>
              <p className="grant-body text-gray-600">
                Discover rental properties that suit your lifestyle
              </p>
            </Link>
            
            <Link href="/appraisal" className="grant-card hover:shadow-lg transition-shadow p-8 text-center">
              <h3 className="grant-h4 mb-2">Sell</h3>
              <p className="grant-body text-gray-600">
                Get a free property appraisal and expert advice
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="grant-container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="grant-h2 mb-4">Featured Properties</h2>
              <p className="grant-body text-gray-600">
                Handpicked properties you might love
              </p>
            </div>
            <Link href="/listings" className="grant-button grant-button-secondary">
              View All Properties
            </Link>
          </div>

          {loading && (
            <div className="text-center py-12">
              <p className="grant-body">Loading properties...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="grant-body text-red-600">Error loading properties. Please try again later.</p>
            </div>
          )}

          {!loading && !error && featuredProperties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {!loading && !error && featuredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="grant-body text-gray-600">No properties available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="grant-container">
          <div className="text-center mb-12">
            <h2 className="grant-h2 mb-4">Why Choose Grant&apos;s Estate Agents</h2>
            <p className="grant-body text-gray-600 max-w-2xl mx-auto">
              With decades of experience and a commitment to excellence, we&apos;re your trusted partner in real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[rgb(153,92,0)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="grant-h4 mb-2">Trusted Expertise</h3>
              <p className="grant-body text-gray-600">
                Over 30 years of experience in the local property market
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[rgb(153,92,0)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏠</span>
              </div>
              <h3 className="grant-h4 mb-2">Premium Listings</h3>
              <p className="grant-body text-gray-600">
                Exclusive access to the finest properties in prime locations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[rgb(153,92,0)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <h3 className="grant-h4 mb-2">5-Star Service</h3>
              <p className="grant-body text-gray-600">
                Dedicated support throughout your property journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="grant-container text-center">
          <h2 className="grant-h2 text-white mb-4">Ready to find your dream home?</h2>
          <p className="grant-body text-white/80 mb-8 max-w-2xl mx-auto">
            Our team of expert agents is here to help you every step of the way
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="grant-button grant-button-primary bg-white text-black hover:bg-gray-100">
              Contact Us Today
            </Link>
            <Link href="/search" className="grant-button grant-button-secondary text-white border-white hover:bg-white/10">
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-100">
        <div className="grant-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="grant-h4 mb-4">Grant&apos;s Estate Agents</h4>
              <p className="grant-body text-gray-600">
                Your trusted partner in real estate since 1990
              </p>
            </div>
            
            <div>
              <h5 className="grant-body grant-body-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/search" className="grant-body text-gray-600 hover:text-black">Search Properties</Link></li>
                <li><Link href="/about" className="grant-body text-gray-600 hover:text-black">About Us</Link></li>
                <li><Link href="/contact" className="grant-body text-gray-600 hover:text-black">Contact</Link></li>
                <li><Link href="/blog" className="grant-body text-gray-600 hover:text-black">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="grant-body grant-body-bold mb-4">Services</h5>
              <ul className="space-y-2">
                <li><Link href="/buy" className="grant-body text-gray-600 hover:text-black">Buying</Link></li>
                <li><Link href="/sell" className="grant-body text-gray-600 hover:text-black">Selling</Link></li>
                <li><Link href="/rent" className="grant-body text-gray-600 hover:text-black">Renting</Link></li>
                <li><Link href="/appraisal" className="grant-body text-gray-600 hover:text-black">Property Appraisal</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="grant-body grant-body-bold mb-4">Contact Info</h5>
              <p className="grant-body text-gray-600 mb-2">123 Main Street</p>
              <p className="grant-body text-gray-600 mb-2">Sydney, NSW 2000</p>
              <p className="grant-body text-gray-600 mb-2">Phone: (02) 1234 5678</p>
              <p className="grant-body text-gray-600">Email: info@grantsea.com.au</p>
            </div>
          </div>
          
          <div className="border-t border-gray-300 mt-8 pt-8 text-center">
            <p className="grant-body text-gray-600">
              © 2025 Grant&apos;s Estate Agents. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AIChatWidget />
    </div>
  );
}