'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyInterest?: string;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export default function AnimatedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    propertyInterest: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  // Validation rules
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return '';
      case 'phone':
        if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) return 'Please enter a valid phone number';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Validate field if it has been touched
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setFieldErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setFocusedField(null);
    setTouchedFields(prev => new Set(prev).add(fieldName));
    const error = validateField(fieldName, formData[fieldName as keyof FormData] || '');
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We\'ll contact you within 24 hours.',
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        propertyInterest: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focused: {
      scale: 1.02,
      borderColor: "#3B82F6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1), 0 10px 15px -3px rgba(59, 130, 246, 0.1)",
    },
    unfocused: {
      scale: 1,
      borderColor: "#E5E7EB",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    }
  };

  const formFields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true, icon: '👤' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, icon: '✉️' },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: false, icon: '📱' },
  ];

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-10"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        ref={formRef}
        className="relative max-w-6xl mx-auto z-10"
        style={{ opacity, scale }}
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Experience the future of real estate communication
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative">
              {/* Glassmorphic card */}
              <motion.div
                className="relative bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Let's Connect
                </h3>
                
                {/* Animated contact items */}
                {[
                  { icon: '📍', title: 'Office Locations', items: ['Narre Warren', 'Berwick', 'Pakenham'] },
                  { icon: '📞', title: 'Phone', items: ['(03) 9704 8888', '0412 345 678'] },
                  { icon: '✉️', title: 'Email', items: ['info@grantsea.com.au'] },
                  { icon: '🕐', title: 'Hours', items: ['Mon-Fri: 9am-5:30pm', 'Sat: 9am-4pm', 'Sun: By appointment'] },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="mb-6 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <motion.span 
                        className="text-3xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {contact.icon}
                      </motion.span>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">{contact.title}</h4>
                        {contact.items.map((item, i) => (
                          <p key={i} className="text-gray-600">{item}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Social media buttons */}
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    {['facebook', 'linkedin', 'instagram'].map((social, index) => (
                      <motion.a
                        key={social}
                        href="#"
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + index * 0.1, type: "spring" }}
                      >
                        {social[0].toUpperCase()}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 3D floating effect shadow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-2xl"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ zIndex: -1 }}
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="space-y-6">
                {/* Animated input fields */}
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.icon} {field.label} {field.required && '*'}
                    </label>
                    <motion.input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => handleBlur(field.name)}
                      required={field.required}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none ${
                        fieldErrors[field.name] ? 'border-red-500' : ''
                      }`}
                      variants={inputVariants}
                      animate={focusedField === field.name ? 'focused' : 'unfocused'}
                    />
                    <AnimatePresence>
                      {fieldErrors[field.name] && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-1 text-sm text-red-500 flex items-center gap-1"
                        >
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            ⚠️
                          </motion.span>
                          {fieldErrors[field.name]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Subject dropdown with animation */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📋 Subject *
                  </label>
                  <motion.select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => handleBlur('subject')}
                    required
                    className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none"
                    variants={inputVariants}
                    animate={focusedField === 'subject' ? 'focused' : 'unfocused'}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="buying">Buying Property</option>
                    <option value="selling">Selling Property</option>
                    <option value="leasing">Leasing/Renting</option>
                    <option value="appraisal">Property Appraisal</option>
                    <option value="other">Other</option>
                  </motion.select>
                </motion.div>

                {/* Message textarea with animation */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    💬 Message *
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => handleBlur('message')}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none resize-none ${
                      fieldErrors.message ? 'border-red-500' : ''
                    }`}
                    variants={inputVariants}
                    animate={focusedField === 'message' ? 'focused' : 'unfocused'}
                    placeholder="Tell us how we can help you..."
                  />
                  <AnimatePresence>
                    {fieldErrors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-500 flex items-center gap-1"
                      >
                        <motion.span
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          ⚠️
                        </motion.span>
                        {fieldErrors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit button with advanced animation */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-4 px-6 rounded-xl font-semibold text-white overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                      animate={{
                        backgroundPosition: isSubmitting ? ["0% 50%", "100% 50%"] : "0% 50%",
                      }}
                      transition={{
                        duration: 2,
                        repeat: isSubmitting ? Infinity : 0,
                        ease: "linear",
                      }}
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    
                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              ⏳
                            </motion.div>
                            Sending...
                          </motion.div>
                        ) : (
                          <motion.span
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            Send Message ✨
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>

                    {/* Ripple effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 2, opacity: 0.2 }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </motion.div>
              </div>

              {/* Success/Error messages with animation */}
              <AnimatePresence>
                {submitStatus.type && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      <motion.span
                        animate={{ rotate: submitStatus.type === 'success' ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl"
                      >
                        {submitStatus.type === 'success' ? '✅' : '❌'}
                      </motion.span>
                      {submitStatus.message}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </div>

        {/* Interactive map placeholder */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20"
        >
          <motion.div
            className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-xl"
              />
              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-6xl mb-4"
                >
                  🗺️
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800">Find Us on the Map</h3>
                <p className="text-gray-600 mt-2">Interactive map coming soon</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}