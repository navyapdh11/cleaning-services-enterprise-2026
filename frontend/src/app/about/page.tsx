'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Award, Users, Star, Clock, Heart } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Happy Customers', value: '10,000+' },
  { icon: Star, label: 'Average Rating', value: '4.9/5' },
  { icon: Clock, label: 'Years of Service', value: '8+' },
  { icon: Award, label: 'Awards Won', value: '15' },
];

const values = [
  { icon: Shield, title: 'Trust & Reliability', description: 'Fully insured and bonded for your peace of mind.' },
  { icon: Heart, title: 'Customer First', description: 'Your satisfaction is our top priority.' },
  { icon: Award, title: 'Quality Guaranteed', description: '100% satisfaction guarantee on all services.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About CleanPro Enterprise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-neutral-100 max-w-3xl mx-auto"
          >
            Transforming spaces, one clean at a time since 2018
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <div className="text-3xl font-bold text-neutral-900 mb-2">{stat.value}</div>
              <div className="text-neutral-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral-900 mb-8 text-center">Our Story</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            Founded in 2018, CleanPro Enterprise started with a simple mission: to provide exceptional cleaning services
            that exceed expectations. What began as a small local operation has grown into a trusted enterprise serving
            thousands of residential and commercial customers across the region.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            Our team of professionally trained and background-checked cleaners are committed to delivering consistent,
            high-quality results. We use eco-friendly products and proven techniques to ensure your space is not just
            clean, but truly pristine.
          </p>
          <p className="text-lg text-neutral-700 leading-relaxed">
            Today, we're proud to be one of the leading cleaning service providers, with a 4.9-star rating and over
            10,000 satisfied customers. Our continuous investment in training, technology, and customer service
            ensures that every CleanPro experience exceeds your expectations.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-neutral-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200"
              >
                <value.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                <p className="text-neutral-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
