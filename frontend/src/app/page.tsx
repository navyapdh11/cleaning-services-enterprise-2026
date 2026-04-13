'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: Sparkles, title: 'Premium Quality', description: 'Eco-friendly products and trained professionals for spotless results every time.' },
  { icon: Shield, title: 'Insured & Bonded', description: 'Full insurance coverage for your peace of mind during every service.' },
  { icon: Clock, title: 'Flexible Scheduling', description: 'Book online 24/7 with same-day service availability in your area.' },
  { icon: Star, title: '5-Star Rated', description: 'Trusted by thousands of happy customers with consistent excellence.' },
];

const services = [
  { name: 'Residential Cleaning', price: 'From $99', desc: 'Regular home cleaning tailored to your needs' },
  { name: 'Deep Cleaning', price: 'From $199', desc: 'Intensive cleaning for hard-to-reach areas' },
  { name: 'Commercial Cleaning', price: 'From $149', desc: 'Professional office and retail space cleaning' },
  { name: 'Move In/Out', price: 'From $179', desc: 'Thorough cleaning for transitions' },
  { name: 'Carpet Cleaning', price: 'From $89', desc: 'Deep extraction for fresh, clean carpets' },
  { name: 'Window Cleaning', price: 'From $69', desc: 'Crystal clear windows inside and out' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url(/grid.svg)] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Premium Cleaning<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-200">Services for Every Space</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Professional, reliable, and eco-friendly cleaning solutions. Book in seconds, enjoy for years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/services" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50" />
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CleanPro?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">We combine technology, training, and care to deliver exceptional cleaning experiences.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card hover:shadow-lg transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-neutral-600 text-lg">Comprehensive cleaning solutions for every need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="card hover:border-primary-300 transition-all duration-300 cursor-pointer group">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">{service.name}</h3>
                <p className="text-neutral-600 mb-4">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-bold">{service.price}</span>
                  <Link href="/register" className="btn-primary text-sm">Book Now</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', text: 'Absolutely fantastic service! My home has never looked better.', rating: 5 },
              { name: 'James L.', text: 'Professional, punctual, and thorough. Highly recommend CleanPro.', rating: 5 },
              { name: 'Emily R.', text: 'The online booking system makes it so easy. Great experience every time.', rating: 5 },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card">
                <div className="flex gap-1 mb-4">{Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-neutral-700 mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Spotless Space?</h2>
          <p className="text-xl text-neutral-300 mb-8">Join thousands of satisfied customers. First cleaning is on us!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn bg-primary-600 hover:bg-primary-700 text-lg px-8 py-3">Start Free Trial</Link>
            <Link href="/contact" className="btn border-2 border-neutral-600 hover:border-white text-lg px-8 py-3">Contact Sales</Link>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> No credit card required</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Cancel anytime</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> 100% satisfaction guarantee</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
