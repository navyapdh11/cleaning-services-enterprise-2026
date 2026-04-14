'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Cog, Clock, DollarSign, CheckCircle, Star, Shield, ArrowRight, Image as ImageIcon, ChevronDown, ChevronUp, Settings, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  { icon: Settings, title: 'Industrial Machines', description: 'We use commercial-grade rotary scrubbing machines with various brush types to tackle any floor surface and level of buildup.' },
  { icon: Building2, title: 'Commercial & Residential', description: 'From warehouse floors and supermarket aisles to residential garages and patios. Any size, any surface.' },
  { icon: Cog, title: 'Customisable Brush Selection', description: 'Soft brushes for delicate surfaces, medium for routine maintenance, and aggressive brushes for heavy industrial buildup.' },
  { icon: Shield, title: 'Minimal Disruption', description: 'We work around your schedule. After-hours and weekend service available for commercial properties.' },
];

const pricingPlans = [
  { name: 'Small Area (Residential)', price: '$179', duration: '2-3 hours', features: ['Up to 50 sqm', 'Rotary machine scrubbing', 'Pre-sweep & pre-treatment', 'Rinse & extract', 'Edge cleaning', 'Suitable for garages, patios'] },
  { name: 'Medium Area (Commercial)', price: '$299', duration: '3-4 hours', features: ['Up to 150 sqm', 'Everything in Small plan', 'Heavy-duty degreaser', 'Oil & stain treatment', 'Traffic line restoration', 'After-hours available'] },
  { name: 'Large Area (Industrial)', price: '$449', duration: '4-5 hours', features: ['150+ sqm', 'Everything in Medium plan', 'Industrial degreaser', 'Multiple machine passes', 'Drain flush included', 'Compliance documentation'] },
];

const faqs = [
  { q: 'What is the difference between machine scrubbing and regular mopping?', a: 'Machine scrubbing uses a rotary floor machine with a brush attachment that agitates the surface at high speed, loosening deeply embedded dirt, grease, and grime that mopping cannot touch. The machine then extracts the dirty water, leaving a genuinely clean surface rather than just moving dirty water around.' },
  { q: 'What types of floors can you machine scrub?', a: 'We machine scrub concrete, epoxy-coated, vinyl, linoleum, sealed timber, polished cement, and terrazzo floors. The brush type and cleaning solution are selected based on the floor surface to ensure effective cleaning without damage.' },
  { q: 'Do you handle grease and oil in commercial kitchens?', a: 'Yes, machine scrubbing is ideal for commercial kitchens, workshops, and garages. We use industrial-strength degreasers in conjunction with rotary scrubbing to break down and remove built-up grease, oil, and food residue from floors.' },
  { q: 'How long before the floor is walkable again?', a: 'Most floors are walkable within 30-60 minutes after machine scrubbing, depending on the surface and how much water was used. We use powerful extraction to remove the majority of moisture. Your technician will advise on the specific drying time for your floor.' },
];

const testimonials = [
  { name: 'Frank D.', location: 'Warehouse Manager, Sydney', text: 'Our warehouse floor had 10 years of oil buildup. CleanPro machine scrubbed it and it looks like a new floor. Outstanding work.', rating: 5 },
  { name: 'Sarah J.', location: 'Cafe Owner, Melbourne', text: 'The kitchen floor was so greasy it was a slip hazard. After one machine scrub it was safe and clean again. Highly recommend.', rating: 5 },
  { name: 'Mike T.', location: 'Homeowner, Perth', text: 'Had our garage floor machine scrubbed and it looks incredible. The machine really gets into the concrete pores that nothing else can reach.', rating: 5 },
];

const galleryItems = [
  { label: 'Warehouse Floor Before' },
  { label: 'Warehouse Floor After' },
  { label: 'Kitchen Floor Before' },
  { label: 'Kitchen Floor After' },
  { label: 'Garage Floor Before' },
  { label: 'Garage Floor After' },
];

export default function MachineScrubbingPage() {
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
                <Cog className="w-8 h-8" />
              </div>
              <span className="text-primary-200 text-sm font-semibold uppercase tracking-wider">Machine Scrubbing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Deep Scrub Power<br />for Any Floor
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Industrial rotary machine scrubbing for commercial and residential floors. Starting from $179.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book?service=machine-scrubbing" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Book Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#pricing" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Pricing
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-primary-200 text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 3-5 hours</span>
              <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> From $179</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Commercial & residential</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50" />
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Machine Scrubbing?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">Rotary floor machines deliver cleaning power that manual methods simply cannot match, removing years of buildup in a single session.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Machine Scrubbing Process</h2>
            <p className="text-neutral-600 text-lg">A systematic approach for maximum floor restoration</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { room: 'Preparation', items: ['Floor condition assessment', 'Debris sweep & remove', 'Furniture & obstacle move', 'Grease & oil spot tagging', 'Pre-treatment application', 'Dwell time for chemicals'] },
              { room: 'Machine Scrubbing', items: ['Rotary machine setup', 'Brush type selection', 'Systematic pass pattern', 'Heavy traffic double-pass', 'Edge & corner attention', 'Dirty water extraction'] },
              { room: 'Finishing', items: ['Rinse & neutralise', 'Final water extraction', 'Spot treatment review', 'Floor drying acceleration', 'Quality inspection', 'Aftercare advice provided'] },
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
            <p className="text-neutral-600 text-lg">Based on area size and soil level. Custom quotes for large industrial spaces.</p>
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
                <Link href="/book?service=machine-scrubbing" className="btn-primary w-full text-center">
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
            <p className="text-neutral-600 text-lg">Industrial-strength results on every surface</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Restore Your Floors to Their Best</h2>
          <p className="text-xl text-neutral-300 mb-8">Machine scrubbing removes what nothing else can. Get a floor that looks and feels new again.</p>
          <Link href="/book?service=machine-scrubbing" className="btn bg-primary-600 hover:bg-primary-700 text-lg px-10 py-4 inline-flex">
            Book Machine Scrubbing <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> All floor types</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> After-hours available</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Grease & oil removal</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
