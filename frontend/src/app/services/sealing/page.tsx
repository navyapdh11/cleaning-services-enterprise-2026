'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, DollarSign, CheckCircle, Star, Shield, ArrowRight, Image as ImageIcon, ChevronDown, ChevronUp, Droplets, Layers } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  { icon: Droplets, title: 'Waterproof Protection', description: 'Our penetrating sealers create an invisible barrier that repels water, oil, and stains from your surfaces.' },
  { icon: Layers, title: 'Multiple Sealer Types', description: 'Penetrating, topical, colour-enhancing, and anti-slip sealers. We select the right product for your surface and needs.' },
  { icon: ShieldCheck, title: 'Long-Lasting Results', description: 'Professional-grade sealers last 2-5 years depending on traffic, protecting your investment and reducing maintenance costs.' },
  { icon: Star, title: 'Anti-Slip Options', description: 'Improve safety with anti-slip sealer applications for pool areas, bathrooms, and commercial entrances.' },
];

const pricingPlans = [
  { name: 'Single Room/Area', price: '$139', duration: '2-3 hours', features: ['Up to 30 sqm', 'Surface preparation', 'Penetrating sealer applied', 'Even coat distribution', 'Edge sealing', 'Curing time guidance'] },
  { name: 'Multiple Areas', price: '$229', duration: '2.5-3 hours', features: ['Up to 60 sqm', 'Everything in Single plan', 'Multiple room coverage', 'Colour-enhancing option', 'Anti-slip additive available', 'Before & after photos'] },
  { name: 'Full Property', price: '$349', duration: '3+ hours', features: ['60+ sqm', 'Everything above', 'All sealed surfaces', 'Premium sealer grade', 'Multi-coat application', 'Maintenance schedule included'] },
];

const faqs = [
  { q: 'What surfaces can be sealed?', a: 'We seal natural stone (marble, granite, travertine, slate), concrete, terrazzo, tile and grout, timber floors, and pavers. Each surface type requires a specific sealer formulation for optimal protection and appearance.' },
  { q: 'How long does a sealer last?', a: 'Penetrating sealers typically last 3-5 years, while topical sealers last 2-3 years. High-traffic areas may need reapplication sooner. We provide a maintenance schedule and can schedule reminders for reapplication.' },
  { q: 'How long before the surface can be used after sealing?', a: 'Most sealers are touch-dry within 2-4 hours and can handle light foot traffic within 6-8 hours. Full cure takes 24-48 hours, during which heavy furniture and vehicles should be kept off the surface. Your technician will provide specific guidance.' },
  { q: 'What is the difference between penetrating and topical sealer?', a: 'Penetrating sealers soak into the surface pores and protect from within without changing the appearance. Topical sealers sit on the surface and can add gloss or a wet look. Penetrating sealers are generally preferred for natural stone, while topical sealers are common on concrete and tiles.' },
];

const testimonials = [
  { name: 'George M.', location: 'Perth WA', text: 'Our travertine pool area was staining constantly. After sealing, water just beads right off. No more stains at all.', rating: 5 },
  { name: 'Diana K.', location: 'Adelaide SA', text: 'The anti-slip sealer on our bathroom tiles has made such a difference for our elderly parents. Safer and still looks great.', rating: 5 },
  { name: 'Chris P.', location: 'Sydney NSW', text: 'Had our entire driveway sealed and it looks fantastic. The colour enhancement brought out the natural beauty of the concrete.', rating: 5 },
];

const galleryItems = [
  { label: 'Stone Before' },
  { label: 'Stone After' },
  { label: 'Concrete Before' },
  { label: 'Concrete After' },
  { label: 'Tile Before' },
  { label: 'Tile After' },
];

export default function SealingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url(/grid.svg)] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <span className="text-primary-200 text-sm font-semibold uppercase tracking-wider">Surface Sealing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Protect What<br />Matters Most
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Professional surface sealing for stone, concrete, tile, and more. Long-lasting protection. Starting from $139.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book?service=sealing" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Book Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#pricing" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Pricing
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-primary-200 text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 2-3 hours</span>
              <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> From $139</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> 2-5 year protection</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50" />
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Seal Your Surfaces?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">Sealing protects your surfaces from stains, water damage, mould, and wear. It is the most cost-effective way to extend the life and beauty of your floors and stone surfaces.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card hover:shadow-lg transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Sealing Process</h2>
            <p className="text-neutral-600 text-lg">Careful preparation and application for maximum protection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { room: 'Surface Preparation', items: ['Surface type assessment', 'Deep clean & dry', 'Existing sealer removal', 'Stain pre-treatment', 'Crack & chip repair', 'Test patch application'] },
              { room: 'Sealer Application', items: ['Sealer type selection', 'Even coat application', 'Edge & corner coverage', 'Penetration time allowed', 'Excess removal', 'Second coat (if required)'] },
              { room: 'Curing & Handover', items: ['Curing time management', 'Surface inspection', 'Water bead test', 'Coverage documentation', 'Aftercare instructions', 'Maintenance schedule provided'] },
            ].map((room, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card">
                <h3 className="text-xl font-semibold mb-4 text-primary-600">{room.room}</h3>
                <ul className="space-y-3">
                  {room.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-neutral-600 text-lg">Based on area size and sealer type. Premium sealers available.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`card ${i === 1 ? 'border-primary-400 ring-2 ring-primary-200' : 'hover:shadow-lg'} transition-all`}>
                {i === 1 && <span className="inline-block bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">Most Popular</span>}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-primary-600">{plan.price}</span>
                </div>
                <p className="text-neutral-500 text-sm mb-6 flex items-center gap-1"><Clock className="w-4 h-4" /> {plan.duration}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-neutral-700 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book?service=sealing" className="btn-primary w-full text-center">
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Difference</h2>
            <p className="text-neutral-600 text-lg">Watch water bead on a perfectly sealed surface</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card flex flex-col items-center justify-center min-h-[200px] bg-neutral-100">
                <ImageIcon className="w-12 h-12 text-neutral-400 mb-3" />
                <span className="text-neutral-500 font-medium">{item.label}</span>
                <span className="text-neutral-400 text-sm mt-1">Gallery image placeholder</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-neutral-700 mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-neutral-500 text-sm">{t.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex items-center justify-between w-full text-left">
                  <span className="text-lg font-semibold pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-neutral-600 mt-4 leading-relaxed">
                    {faq.a}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Protect Your Investment</h2>
          <p className="text-xl text-neutral-300 mb-8">Professional surface sealing prevents costly damage and keeps your surfaces looking beautiful for years.</p>
          <Link href="/book?service=sealing" className="btn bg-primary-600 hover:bg-primary-700 text-lg px-10 py-4 inline-flex">
            Book Surface Sealing <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> 2-5 year protection</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Anti-slip options</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> All surface types</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
