'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Category {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  featured?: boolean;
}

export default function CategoryGrid() {
  const categories: Category[] = [
    {
      title: "Residential Sales",
      subtitle: "Find your dream home",
      href: "/properties?type=sale",
      image: "/images/residential-sales.jpg",
      featured: true
    },
    {
      title: "Rental Properties",
      subtitle: "Browse available rentals",
      href: "/properties?type=rent",
      image: "/images/rental-properties.jpg",
      featured: true
    },
    {
      title: "New Developments",
      subtitle: "Off-the-plan opportunities",
      href: "/properties?type=new",
      image: "/images/new-developments.jpg"
    },
    {
      title: "Commercial",
      subtitle: "Business & investment",
      href: "/properties?type=commercial",
      image: "/images/commercial.jpg"
    },
    {
      title: "Land & Acreage",
      subtitle: "Build your future",
      href: "/properties?type=land",
      image: "/images/land-acreage.jpg"
    },
    {
      title: "Property Management",
      subtitle: "Professional services",
      href: "/property-management",
      image: "/images/property-management.jpg"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-xl text-gray-600">Explore our diverse property portfolio</p>
        </div>

        {/* Main Featured Grid - Similar to On.com layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-1">
          {/* Large featured items - First two are extra large */}
          {categories.filter(cat => cat.featured).map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className={`category-card group relative overflow-hidden rounded block ${
                index < 2 ? 'md:col-span-1' : ''
              }`}
              style={{ height: index < 2 ? '633px' : '480px' }}
            >
              <div className="absolute inset-0 bg-gray-200 category-image-placeholder">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 427px"
                  onError={(e) => {
                    // Fallback gradient on image error
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = 
                      index === 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                      index === 1 ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
                  }}
                />
              </div>
              
              {/* Text overlay positioned at bottom */}
              <div className="category-overlay absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                  {category.title}
                </h3>
                <p className="text-lg text-white/90 transform transition-all duration-300 opacity-90 group-hover:opacity-100">
                  {category.subtitle}
                </p>
                <div className="mt-4 flex items-center text-white opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Explore</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Secondary Grid - Smaller items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {categories.filter(cat => !cat.featured).map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative overflow-hidden rounded-md block"
              style={{ height: '300px' }}
            >
              <div className="absolute inset-0 bg-gray-900">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              
              {/* Text overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
                <p className="text-sm text-white/90">{category.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats Bar - Similar to On.com's approach */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">250+</p>
            <p className="text-gray-600">Properties Listed</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">15+</p>
            <p className="text-gray-600">Suburbs Covered</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">98%</p>
            <p className="text-gray-600">Sold Success Rate</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-600 mb-2">5★</p>
            <p className="text-gray-600">Google Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}