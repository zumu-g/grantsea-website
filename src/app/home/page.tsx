'use client';

import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import PropertyListings from '@/components/PropertyListings';
import ContactForm from '@/components/ContactForm';
import AIChatWidget from '@/components/AIChatWidget';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Category Grid Section - On.com style */}
      <CategoryGrid />
      
      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-2xl font-semibold mb-3">Buy Property</h3>
              <p className="text-gray-600 mb-4">
                Find your dream home from our extensive portfolio of quality properties
              </p>
              <a href="/properties" className="text-blue-600 hover:underline">
                Browse Properties →
              </a>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-semibold mb-3">Sell Property</h3>
              <p className="text-gray-600 mb-4">
                Get the best price for your property with our expert marketing strategies
              </p>
              <a href="/contact" className="text-blue-600 hover:underline">
                Get Free Appraisal →
              </a>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🔑</div>
              <h3 className="text-2xl font-semibold mb-3">Property Management</h3>
              <p className="text-gray-600 mb-4">
                Professional property management services for investors and landlords
              </p>
              <a href="/contact" className="text-blue-600 hover:underline">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <PropertyListings />
      
      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Grant's Estate Agents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of Melbourne's Southeast property market</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">Track record of achieving premium prices for our clients</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Full Service</h3>
              <p className="text-gray-600">From first consultation to settlement and beyond</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Technology Driven</h3>
              <p className="text-gray-600">Latest tools and platforms for maximum exposure</p>
            </div>
          </div>
        </div>
      </section>
      
      <ContactForm />
      
      <AIChatWidget />
    </div>
  );
}