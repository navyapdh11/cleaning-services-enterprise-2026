'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Sparkles, Droplets, Home, Building, Wind, Hammer, Shield, Zap, PaintBucket, Droplet, Wrench, Star, Clock, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const STATIC_SERVICES = [
  {
    id: 'regular',
    name: 'Regular Cleaning',
    slug: 'regular-cleaning',
    icon: Sparkles,
    description: 'Standard cleaning service for homes and apartments. Perfect for ongoing maintenance.',
    duration: 120,
    basePrice: 120,
    features: ['Kitchen & bathroom sanitization', 'Dusting all surfaces', 'Vacuuming & mopping', 'Trash removal', 'Bed making'],
    popular: true,
    customQuote: false,
  },
  {
    id: 'end-of-lease',
    name: 'End of Lease Cleaning',
    slug: 'end-of-lease',
    icon: Home,
    description: 'Bond-back guaranteed deep cleaning for tenants moving out.',
    duration: 300,
    basePrice: 350,
    features: ['Complete property clean', 'Inside all cabinets', 'Oven & stove cleaning', 'Window cleaning', 'Carpet steam cleaning', 'Bond-back guarantee'],
    popular: true,
    customQuote: false,
  },
  {
    id: 'commercial',
    name: 'Commercial Cleaning',
    slug: 'commercial-cleaning',
    icon: Building,
    description: 'Professional cleaning for offices, retail spaces, and commercial properties.',
    duration: 180,
    basePrice: 200,
    features: ['Office & desk cleaning', 'Restroom sanitization', 'Kitchen/break room', 'Floor care', 'Trash removal', 'Window cleaning'],
    popular: false,
    customQuote: false,
  },
  {
    id: 'carpet',
    name: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    icon: Wind,
    description: 'Professional steam cleaning for fresh, hygienic carpets.',
    duration: 90,
    basePrice: 150,
    features: ['Hot water extraction', 'Stain pre-treatment', 'Deodorizing', 'Quick drying', 'Pet stain removal'],
    popular: false,
    customQuote: false,
  },
  {
    id: 'window',
    name: 'Window Cleaning',
    slug: 'window-cleaning',
    icon: Droplet,
    description: 'Crystal clear windows inside and out for maximum light.',
    duration: 60,
    basePrice: 100,
    features: ['Interior & exterior', 'Frame & track cleaning', 'Screen washing', 'Sill wiping', 'Hard water removal'],
    popular: false,
    customQuote: false,
  },
  {
    id: 'pressure-washing',
    name: 'Pressure Washing',
    slug: 'pressure-washing',
    icon: Droplets,
    description: 'High-pressure cleaning for driveways, walls, and outdoor areas.',
    duration: 120,
    basePrice: 200,
    features: ['Driveways & paths', 'Walls & fences', 'Decks & patios', 'Gutter cleaning', 'Graffiti removal'],
    popular: false,
    customQuote: false,
  },
  {
    id: 'tile-grout',
    name: 'Tile & Grout Cleaning',
    slug: 'tile-grout-cleaning',
    icon: Hammer,
    description: 'Deep cleaning and restoration for tile surfaces and grout lines.',
    duration: 90,
    basePrice: 180,
    features: ['Deep grout cleaning', 'Stain removal', 'Colour sealing', 'Tile polishing', 'Anti-bacterial treatment'],
    popular: false,
    customQuote: false,
  },
  {
    id: 'machine-scrubbing',
    name: 'Machine Scrubbing',
    slug: 'machine-scrubbing',
    icon: Zap,
    description: 'Industrial floor scrubbing for large commercial and industrial spaces.',
    duration: 150,
    basePrice: 160,
    features: ['Auto scrubber cleaning', 'Strip & wax', 'Burnishing', 'Concrete scrubbing', 'Epoxy floor care'],
    popular: false,
    customQuote: false,
  },
  {
    id: 'polishing',
    name: 'Polishing',
    slug: 'polishing',
    icon: PaintBucket,
    description: 'Professional floor and surface polishing for a brilliant shine.',
    duration: 120,
    basePrice: 140,
    features: ['Timber floor polishing', 'Marble buffing', 'Concrete honing', 'Terrazzo restoration', 'Protective coating'],
    popular: false,
    customQuote: false,
  },
  {
    id: 'sealing',
    name: 'Sealing',
    slug: 'sealing',
    icon: Shield,
    description: 'Protective sealing for natural stone, tile, and grout surfaces.',
    duration: 90,
    basePrice: 150,
    features: ['Stone sealing', 'Grout sealing', 'Tile impregnating', 'Concrete sealing', 'Deck sealing'],
    popular: false,
    customQuote: false,
  },
  {
    id: 'custom',
    name: 'Custom Cleaning',
    slug: 'custom-cleaning',
    icon: Wrench,
    description: 'Tailored cleaning solutions designed around your specific needs.',
    duration: 0,
    basePrice: 0,
    features: ['Customizable scope', 'Flexible scheduling', 'Specialized tasks', 'One-off or recurring', 'Tailored checklist'],
    popular: false,
    customQuote: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Cleaning Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 max-w-3xl mx-auto"
          >
            Professional cleaning for homes and offices across Australia. Clear prices, experienced teams, bond-back guarantee.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STATIC_SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-neutral-200 hover:border-primary-300 relative"
                >
                  {s.popular && (
                    <div className="absolute -top-3 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Popular
                    </div>
                  )}
                  <Link href={`/services/${s.slug}`} className="block">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 hover:text-primary-600 transition-colors">{s.name}</h3>
                    <p className="text-neutral-600 mb-4 text-sm">{s.description}</p>

                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {s.customQuote ? 'Flexible' : `${s.duration} min`}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" /> {s.customQuote ? 'Custom Quote' : `From $${s.basePrice}`}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      {s.features.slice(0, 4).map((f, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-700">{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <span className={`font-bold ${s.customQuote ? 'text-lg text-primary-600' : 'text-primary-600'}`}>
                        {s.customQuote ? 'Get Quote' : `$${s.basePrice}`}
                      </span>
                      <span className="text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Customers Pick CleanPro</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Star, title: 'Top Rated', desc: 'Over 10,000 bookings at 4.9 stars' },
              { icon: Shield, title: 'Insured & Bonded', desc: '$20M public liability coverage' },
              { icon: Clock, title: 'Flexible Booking', desc: 'Book online anytime, same-day available' },
              { icon: Sparkles, title: 'Eco-Friendly', desc: 'Safe products for families and pets' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your Clean Today</h2>
          <p className="text-xl text-neutral-300 mb-8">Get 10% off your first service.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="btn bg-primary-600 hover:bg-primary-700 text-white text-lg px-8 py-3">
              Book Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn border-2 border-neutral-600 text-white hover:border-white text-lg px-8 py-3">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
