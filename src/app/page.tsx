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
      
      {/* Featured Properties */}
      <PropertyListings />
      
      {/* Contact Section */}
      <ContactForm />
      
      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}