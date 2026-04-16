'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Gem, Clock, DollarSign, CheckCircle, Star, Shield, ArrowRight, Image as ImageIcon, ChevronDown, ChevronUp, Sparkles, Brush } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  { icon: Sparkles, title: 'Mirror-Like Finish', description: 'Our multi-stage polishing process restores your floors to a brilliant, reflective shine that lasts for years.' },
  { icon: Brush, title: 'Multi-Stage Process', description: 'We use progressive grit levels and specialised compounds to achieve the perfect level of gloss for your floor type.' },
  { icon: Shield, title: 'Surface Protection', description: 'Polishing not only beautifies but also creates a protective layer that resists scratches, stains, and wear.' },
  { icon: Star, title: 'All Hard Floor Types', description: 'Concrete, marble, granite, terrazzo, vinyl, and polished cement. We tailor the process to each material.' },
];

const pricingPlans = [
  { name: 'Single Room', price: '$159', duration: '2-3 hours', features: ['Up to 20 sqm', 'Multi-stage polishing', 'Surface preparation', 'Progressive buffing', 'Protective coat applied', 'Edge detailing'] },
  { name: 'Multiple Rooms', price: '$279', duration: '3-4 hours', features: ['Up to 50 sqm', 'Everything in Single plan', 'Hallway included', 'Consistent shine throughout', 'Higher gloss option', 'Sealer recommendation'] },
  { name: 'Full Property', price: '$429', duration: '4+ hours', features: ['50+ sqm', 'Everything above', 'All hard floors', 'Diamond polishing option', 'Premium protective coat', 'Maintenance plan included'] },
];

const faqs = [
  { q: 'What is the difference between polishing and sealing?', a: 'Polishing is the process of mechanically abrading the surface to create a smooth, glossy finish. Sealing applies a protective coating over the surface. Often both are done together: first the floor is polished to the desired shine, then sealed to protect that finish. We offer both as a combined service.' },
  { q: 'How long does a polished floor stay shiny?', a: 'With proper care, a professionally polished floor can maintain its shine for 1-3 years. High-traffic areas may need more frequent maintenance polishing. We provide aftercare instructions and can schedule periodic maintenance polishes.' },
  { q: 'Can you polish damaged or scratched floors?', a: 'Yes, the polishing process actually removes a thin layer of the surface, which can eliminate light scratches, scuff marks, and minor surface damage. For deeper gouges, we may need to do additional repair work before polishing.' },
  { q: 'Is the polishing process noisy or disruptive?', a: 'Our polishing machines do produce noise, but it is comparable to a vacuum cleaner. For residential properties, we can schedule during daytime hours. For commercial properties, we offer after-hours service to avoid disrupting your business.' },
];

const testimonials = [
  { name: 'Rachel N.', location: 'Melbourne VIC', text: 'Marble foyer looks great. The polish brought back a shine I forgot was there.', rating: 5 },
  { name: 'Tony B.', location: 'Sydney NSW', text: 'Concrete showroom floors now look like glass. Clients always comment on them.', rating: 5 },
  { name: 'Linda W.', location: 'Brisbane QLD', text: 'Terrazzo floors look better than when the house was built. Good shine.', rating: 5 },
];

const galleryItems = [
  { label: 'Marble Floor Before' },
  { label: 'Marble Floor After' },
  { label: 'Concrete Before' },
  { label: 'Concrete After' },
  { label: 'Terrazzo Before' },
  { label: 'Terrazzo After' },
];

export default function PolishingPage() {
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
                <Gem className="w-8 h-8" />
              </div>
              <span className="text-primary-200 text-sm font-semibold uppercase tracking-wider">Floor Polishing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Brilliant Shine,<br />Lasting Finish
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Professional floor polishing for marble, concrete, terrazzo, and more. Starting from $159.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book?service=polishing" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Book Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#pricing" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Pricing
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-primary-200 text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 2-4 hours</span>
              <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> From $159</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Protective finish</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50" />
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Professional Floor Polishing?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">Professional polishing achieves a level of shine and smoothness that DIY products cannot match, while also protecting your floor investment.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Polishing Process</h2>
            <p className="text-neutral-600 text-lg">Multi-stage polishing for a flawless, lasting finish</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { room: 'Surface Preparation', items: ['Floor condition assessment', 'Deep clean & degrease', 'Existing coating removal', 'Crack & chip repair', 'Coarse grinding (if needed)', 'Dust extraction'] },
              { room: 'Polishing Stages', items: ['Progressive grit refinement', 'Medium-grit polishing', 'Fine-grit polishing', 'Ultra-fine honing', 'Buffing to desired gloss', 'Edge & corner detailing'] },
              { room: 'Protection & Finish', items: ['Protective sealant applied', 'Even coat distribution', 'Curing time management', 'Final buff & shine', 'Quality inspection', 'Maintenance instructions'] },
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
            <p className="text-neutral-600 text-lg">Based on area size and desired finish level.</p>
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
                <Link href="/book?service=polishing" className="btn-primary w-full text-center">
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
            <p className="text-neutral-600 text-lg">The shine transformation speaks for itself</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Floors Today</h2>
          <p className="text-xl text-neutral-300 mb-8">Professional polishing brings back the brilliance your floors deserve. Get that mirror-like finish.</p>
          <Link href="/book?service=polishing" className="btn bg-primary-600 hover:bg-primary-700 text-lg px-10 py-4 inline-flex">
            Book Floor Polishing <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> All hard floors</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Multi-stage process</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Protective coating included</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
