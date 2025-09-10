'use client';

import dynamic from 'next/dynamic';
import AnimatedContactForm from '@/components/AnimatedContactForm';
import { motion } from 'framer-motion';

// Dynamically import the 3D background to avoid SSR issues
const Canvas3DBackground = dynamic(() => import('@/components/Canvas3DBackground'), {
  ssr: false
});

export default function UltraModernContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Canvas Background */}
      <Canvas3DBackground />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/90 via-white/80 to-blue-50/90 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Animated Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <motion.a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Grant's Estate Agents
            </motion.a>
            <nav className="hidden md:flex gap-6">
              {['Home', 'Buy', 'Rent', 'Sell', 'Agents'].map((item, index) => (
                <motion.a
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.header>
        
        {/* Spacer for fixed header */}
        <div className="h-20" />
        
        {/* Contact Form Component */}
        <AnimatedContactForm />
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
          <motion.button
            className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 500 }}
          >
            <span className="text-2xl">📞</span>
          </motion.button>
          <motion.button
            className="w-14 h-14 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.2, type: "spring", stiffness: 500 }}
          >
            <span className="text-2xl">💬</span>
          </motion.button>
        </div>
        
        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="relative z-10 bg-gray-900 text-white py-12 mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Grant's Estate Agents</h3>
              <p className="text-gray-400">Your trusted partner in real estate since 1990</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/buy" className="hover:text-white transition-colors">Buy Property</a></li>
                <li><a href="/rent" className="hover:text-white transition-colors">Rent Property</a></li>
                <li><a href="/sell" className="hover:text-white transition-colors">Sell Property</a></li>
                <li><a href="/agents" className="hover:text-white transition-colors">Our Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 (03) 9704 8888</li>
                <li>✉️ info@grantsea.com.au</li>
                <li>📍 Multiple locations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest properties</p>
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}