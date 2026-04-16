'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Building2, Clock, DollarSign, CheckCircle, Star, Shield, ArrowRight, Image as ImageIcon, ChevronDown, ChevronUp, Users, Sparkles, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  { icon: Shield, title: 'Fully Insured', description: 'Full liability insurance on every job.' },
  { icon: Users, title: 'Single Point of Contact', description: 'One account manager handles your schedule and requests.' },
  { icon: Clock, title: 'After-Hours Available', description: 'Clean outside business hours. Evening and weekend slots.' },
  { icon: FileText, title: 'Compliance Documentation', description: 'Cleaning logs, safety sheets, and compliance reports for audits.' },
];

const pricingPlans = [
  { name: 'Small Office', price: '$149', perVisit: '/visit', duration: '3-4 hours', features: ['Up to 200 sqm', 'Desks & workstations dusted', 'Kitchen & break room clean', 'Bathroom sanitisation', 'Floors vacuumed & mopped', 'Bins emptied'] },
  { name: 'Medium Office', price: '$249', perVisit: '/visit', duration: '4-5 hours', features: ['Up to 500 sqm', 'Everything in Small Office', 'Reception area cleaning', 'Meeting rooms sanitised', 'Window sills & glass surfaces', 'Carpet spot treatment'] },
  { name: 'Large Facility', price: '$399', perVisit: '/visit', duration: '5+ hours', features: ['500+ sqm', 'Everything in Medium Office', 'Multiple bathroom blocks', 'Lobby & common areas', 'Parking area sweep', 'Custom task list available'] },
];

const faqs = [
  { q: 'Do you clean outside of business hours?', a: 'Yes, the majority of our commercial cleaning is performed after hours (6pm-8am) or on weekends to avoid disrupting your business operations. We can also clean during off-peak hours if your building has 24/7 operations.' },
  { q: 'What industries do you serve?', a: 'We serve offices, medical centres, schools, childcare centres, retail spaces, warehouses, strata buildings, and industrial facilities. Each industry has specific cleaning requirements and we are experienced in meeting them.' },
  { q: 'Can you work with our existing cleaning schedule?', a: 'Absolutely. We are flexible and can align with your building management requirements, strata regulations, or internal facility management schedules. Our account manager will coordinate everything.' },
  { q: 'Do you provide your own equipment and products?', a: 'Yes, our team arrives fully equipped with commercial-grade cleaning equipment and eco-friendly products. We also carry MSDS documentation for all chemicals used on-site, as required by workplace health and safety regulations.' },
];

const testimonials = [
  { name: 'Karen B.', location: 'Facility Manager, Melbourne', text: 'CleanPro handles our 3-floor office. The after-hours team is professional and staff never complain.', rating: 5 },
  { name: 'Dr. James P.', location: 'Medical Centre, Sydney', text: 'They know the hygiene standards a medical environment needs. Good work every time.', rating: 5 },
  { name: 'Lisa T.', location: 'Retail Store Manager, Perth', text: 'Our store looks good every morning. The evening crew is thorough and careful with our stock.', rating: 5 },
];

const galleryItems = [
  { label: 'Office Before' },
  { label: 'Office After' },
  { label: 'Reception Before' },
  { label: 'Reception After' },
  { label: 'Kitchen Before' },
  { label: 'Kitchen After' },
];

export default function CommercialCleaningPage() {
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
                <Building2 className="w-8 h-8" />
              </div>
              <span className="text-primary-200 text-sm font-semibold uppercase tracking-wider">Commercial & Office Cleaning</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Professional Spaces,<br />Professionally Cleaned
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Tailored cleaning programs for offices, retail, medical, and industrial spaces. Starting from $149 per visit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book?service=commercial-cleaning" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Get a Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#pricing" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Pricing
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-primary-200 text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 3-5 hours</span>
              <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> From $149</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Fully insured</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50" />
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Business</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">We understand the unique demands of commercial spaces and deliver cleaning programs that meet your operational needs.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Commercial Cleaning Checklist</h2>
            <p className="text-neutral-600 text-lg">Every visit covers your entire workspace to the highest standard</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { room: 'Work Areas', items: ['Desk surfaces dusted & wiped', 'Chairs cleaned & arranged', 'Computer screens dusted (dry)', 'Phone sanitised', 'Floor vacuumed & mopped', 'Bins emptied & relined'] },
              { room: 'Common Areas', items: ['Reception desk polished', 'Waiting area furniture cleaned', 'Glass doors & partitions wiped', 'Light switches sanitised', 'Floors vacuumed & mopped', 'Plants watered (if requested)'] },
              { room: 'Kitchen & Bathrooms', items: ['Countertops sanitised', 'Microwave interior cleaned', 'Sink & taps polished', 'Toilets fully sanitised', 'Mirrors streak-free', 'Restocked paper products'] },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Commercial Pricing</h2>
            <p className="text-neutral-600 text-lg">Pricing based on space size. Custom quotes available for larger facilities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`card ${i === 1 ? 'border-primary-400 ring-2 ring-primary-200' : 'hover:shadow-lg'} transition-all`}>
                {i === 1 && <span className="inline-block bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">Most Popular</span>}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-primary-600">{plan.price}</span>
                  <span className="text-neutral-500">{plan.perVisit}</span>
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
                <Link href="/book?service=commercial-cleaning" className="btn-primary w-full text-center">
                  Get a Quote
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
            <p className="text-neutral-600 text-lg">Professional results in professional environments</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Commercial Clients Say</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Keep Your Workspace Impeccable</h2>
          <p className="text-xl text-neutral-300 mb-8">Get a customised cleaning plan for your business. Free site assessment included.</p>
          <Link href="/book?service=commercial-cleaning" className="btn bg-primary-600 hover:bg-primary-700 text-lg px-10 py-4 inline-flex">
            Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Free site assessment</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> After-hours service</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Compliance documentation</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
