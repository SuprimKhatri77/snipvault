"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Sample code snippets for the landing page
  const snippets = [
    {
      title: "ReactJS Component",
      language: "jsx",
      code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
    },
    {
      title: "Python Function",
      language: "python",
      code: `def fibonacci(n):
    """Return the nth Fibonacci number."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b`
    },
    {
      title: "CSS Animation",
      language: "css",
      code: `@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animated-element {
  animation: pulse 2s infinite ease-in-out;
}`
    }
  ];

  const features = [
    {
      icon: "far fa-save",
      title: "Save & Organize",
      description: "Store all your code snippets in one place with smart tagging and folders"
    },
    {
      icon: "fas fa-search",
      title: "Instant Search",
      description: "Find any snippet in milliseconds with our powerful search engine"
    },
    {
      icon: "fas fa-share-alt",
      title: "Share Securely",
      description: "Share snippets with your team or keep them private with granular permissions"
    },
    {
      icon: "fas fa-code",
      title: "Syntax Highlighting",
      description: "Support for 100+ programming languages with beautiful syntax highlighting"
    },
    {
      icon: "fas fa-sync",
      title: "Sync Anywhere",
      description: "Access your snippets from any device with real-time synchronization"
    },
    {
      icon: "fas fa-bolt",
      title: "Keyboard Shortcuts",
      description: "Boost your productivity with customizable keyboard shortcuts"
    }
  ];

  const testimonials = [
    {
      text: "SnipVault has transformed how our team shares and reuses code. It's an essential tool in our development workflow.",
      author: "Sarah Chen",
      role: "Lead Developer at TechFlow"
    },
    {
      text: "The search functionality is lightning fast, and the organization features help me keep all my snippets neatly categorized.",
      author: "Marcus Johnson",
      role: "Full-Stack Engineer"
    },
    {
      text: "I've tried many snippet managers, but SnipVault's user experience and feature set are unmatched. Worth every penny!",
      author: "Aisha Patel",
      role: "Software Architect"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Next feature every 5 seconds
  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % snippets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return null; // Prevents hydration errors
  }

  return (
    <div className="dark">
      <Head>
        <title>SnipVault - Smart Code Snippet Manager</title>
        <meta name="description" content="Store, organize, and share your code snippets effortlessly with SnipVault." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <main className="bg-gray-900 text-gray-100 min-h-screen">
        {/* Navigation */}
        <nav className="border-b border-gray-800 backdrop-blur-md bg-gray-900/80 fixed w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold text-emerald-500">
                  <i className="fas fa-code-branch mr-2"></i>
                  SnipVault
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-transparent hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition">
                  Features
                </button>
                <button className="bg-transparent hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition">
                  Pricing
                </button>
                <button className="bg-transparent hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition">
                  Docs
                </button>
                <button className="bg-transparent hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition">
                  Blog
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition">
                  Sign In
                </button>
                <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-md text-sm font-medium transition">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

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
                <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-lg font-medium hover:from-emerald-400 hover:to-emerald-500 transition shadow-lg hover:shadow-emerald-500/20">
                  Start for Free
                </button>
                <button className="px-8 py-4 bg-gray-800 rounded-lg text-lg font-medium hover:bg-gray-700 transition flex items-center justify-center">
                  <i className="fab fa-github mr-2"></i> GitHub Sign In
                </button>
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                No credit card required · Free plan available
              </p>
            </div>

            <div className="lg:w-1/2 lg:pl-10">
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
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <i className={`${feature.icon} text-emerald-500 text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
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
        <section className="py-24 bg-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-gray-900 opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                  Simple, Transparent Pricing
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose the plan that's right for you
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Free Plan */}
              <motion.div
                className="bg-gray-800 rounded-xl overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6 }}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <p className="text-gray-400 mb-6">For individual developers</p>
                  <p className="text-4xl font-bold mb-6">$0<span className="text-gray-400 text-lg font-normal">/month</span></p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>50 snippets</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Basic search</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>5 tags</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Community support</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                    Get Started
                  </button>
                </div>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                className="bg-gradient-to-b from-emerald-900/40 to-gray-800 rounded-xl overflow-hidden relative transform lg:scale-105 shadow-xl shadow-emerald-500/20"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-center py-2 text-sm font-medium">
                  MOST POPULAR
                </div>
                <div className="p-6 pt-12">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <p className="text-gray-400 mb-6">For professionals and small teams</p>
                  <p className="text-4xl font-bold mb-6">$9<span className="text-gray-400 text-lg font-normal">/month</span></p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Unlimited snippets</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Advanced search</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Unlimited tags</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Team sharing (up to 5)</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-lg transition">
                    Start 7-Day Free Trial
                  </button>
                </div>
              </motion.div>

              {/* Team Plan */}
              <motion.div
                className="bg-gray-800 rounded-xl overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Team</h3>
                  <p className="text-gray-400 mb-6">For larger teams and organizations</p>
                  <p className="text-4xl font-bold mb-6">$29<span className="text-gray-400 text-lg font-normal">/month</span></p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Unlimited team members</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Advanced permissions</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Analytics & reporting</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>Dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-emerald-500 mr-2"></i>
                      <span>SSO & SAML integration</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                    Contact Sales
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

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

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="col-span-2">
                <div className="text-xl font-bold text-emerald-500 mb-4">
                  <i className="fas fa-code-branch mr-2"></i>
                  SnipVault
                </div>
                <p className="text-gray-400 mb-4">
                  The modern way to store and share code snippets.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <i className="fab fa-discord"></i>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Changelog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Roadmap</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Guides</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2025 SnipVault. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition mr-4">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition mr-4">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>


  )
}