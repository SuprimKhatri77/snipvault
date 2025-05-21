"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { snippets, testimonials, features } from "../../data"
import * as Icons from "lucide-react"
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Pricing from '@/components/Pricing';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % snippets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="dark">
      <main className="bg-gray-900 text-gray-100 min-h-screen">


        {/* Hero Section */}
        <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 opacity-50"></div>
          <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-emerald-500 opacity-20 blur-3xl rounded-full"></div>
          <div className="absolute left-0 top-1/3 w-1/4 h-1/4 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>

          <motion.div
            className="max-w-7xl mx-auto relative z-1 flex flex-col lg:flex-row items-center justify-between"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                  Store & Organize
                </span>
                <br />Your Code Snippets
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                SnipVault helps developers save, organize, and share code snippets with powerful search, syntax highlighting, and team collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-in" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-lg font-medium hover:from-emerald-400 hover:to-emerald-500 transition shadow-lg hover:shadow-emerald-500/20">
                  Start for Free
                </Link>
                <Link href="/sign-in" className="px-8 py-4 bg-gray-800 rounded-lg text-lg font-medium hover:bg-gray-700 transition flex items-center justify-center">
                  <i className="fab fa-github mr-2"></i> GitHub Sign In
                </Link>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                No credit card required · Free plan available
              </p>
            </div>

            <div className="lg:w-1/2 lg:pl-10 hidden sm:block">
              <div className="relative bg-gray-800 rounded-xl shadow-2xl shadow-emerald-500/10 min-h-[450px]">
                <div className="flex bg-gray-900 px-4 py-2 items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-400">
                    {snippets[activeFeature].title}
                  </div>
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="language-javascript">
                    {snippets[activeFeature].code}
                  </code>
                </pre>
              </div>
              <div className="mt-4 flex justify-center">
                {snippets.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 mx-1 rounded-full ${index === activeFeature ? 'bg-emerald-500' : 'bg-gray-600'}`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-emerald-500">100K+</p>
                <p className="text-gray-400 mt-2">Active Users</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-500">5M+</p>
                <p className="text-gray-400 mt-2">Snippets Saved</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-500">100+</p>
                <p className="text-gray-400 mt-2">Languages</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-500">99.9%</p>
                <p className="text-gray-400 mt-2">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                  Packed with Features
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to manage your code snippets efficiently
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const LucideIcon = Icons[feature.icon as keyof typeof Icons] as LucideIcon;

                return (
                  <motion.div
                    key={index}
                    className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      {LucideIcon && <LucideIcon className="text-emerald-500 w-6 h-6" />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                  Loved by Developers
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See what our users have to say about SnipVault
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 relative"
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="absolute top-6 right-6 text-4xl text-emerald-500/20">
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <p className="text-gray-300 mb-6 relative z-10">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-emerald-500">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <Pricing />

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-2xl border border-gray-700 text-center relative overflow-hidden"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to organize your code?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join thousands of developers who use SnipVault to store, manage, and share their code snippets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-lg font-medium hover:from-emerald-400 hover:to-emerald-500 transition shadow-lg">
                  Start for Free
                </button>
                <button className="px-8 py-4 bg-gray-700 rounded-lg text-lg font-medium hover:bg-gray-600 transition">
                  Schedule a Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>


      </main>
    </div>


  )
}