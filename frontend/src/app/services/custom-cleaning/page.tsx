'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Sliders, Clock, DollarSign, CheckCircle, Star, Shield, ArrowRight, Image as ImageIcon, ChevronDown, ChevronUp, Palette, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  { icon: Palette, title: 'Fully Customisable', description: 'Tell us exactly what you need and we will build a cleaning plan around your specific requirements, space, and budget.' },
  { icon: Sliders, title: 'Flexible Duration', description: 'From a quick 1-hour refresh to a full-day deep clean. You decide how long and how thorough you want us to be.' },
  { icon: HeartHandshake, title: 'Dedicated Coordinator', description: 'A personal cleaning coordinator manages your custom job, ensuring every detail is covered to your satisfaction.' },
  { icon: Shield, title: 'No Task Too Unique', description: 'Post-renovation cleanup, event preparation, seasonal deep cleans, specialty item care. If you need it cleaned, we can do it.' },
];

const pricingPlans = [
  { name: 'Quick Refresh', price: '$89', duration: '1-2 hours', features: ['1-2 focused tasks', 'Single room or area', 'Targeted cleaning', 'Eco-friendly products', 'Quick turnaround', 'Ideal for spot cleaning'] },
  { name: 'Custom Standard', price: '$159', duration: '2-3 hours', features: ['Multiple tasks defined', 'Multiple rooms', 'Custom checklist created', 'Special requests handled', 'Before & after photos', 'Dedicated coordinator'] },
  { name: 'Custom Premium', price: '$259', duration: '3-5 hours', features: ['Full custom scope', 'Whole property', 'Specialty items included', 'Post-event or post-build', 'Priority scheduling', 'Follow-up visit included'] },
];

const faqs = [
  { q: 'What kinds of custom cleaning jobs do you handle?', a: 'We handle virtually any cleaning need: post-renovation cleanup, pre-event preparation, post-party cleanup, seasonal deep cleans, specialty item cleaning (pianos, antiques, artwork surrounds), outdoor furniture cleaning, storage unit cleaning, and much more. If it needs cleaning, just ask.' },
  { q: 'How does the custom booking process work?', a: 'When you book a custom cleaning, you describe what you need in the booking form. Our cleaning coordinator then contacts you to discuss the details, create a custom checklist, and provide an accurate quote. We confirm everything before the team arrives.' },
  { q: 'Can I combine multiple services into one custom job?', a: 'Absolutely. That is what custom cleaning is all about. Want window cleaning plus carpet steam cleaning plus a kitchen deep clean in one visit? No problem. We will create a combined plan and give you a bundled price.' },
  { q: 'Is custom cleaning more expensive than standard services?', a: 'Not necessarily. For single services, our standard pricing applies. The custom aspect comes in when you need unique combinations or unusual tasks. We always provide a transparent quote upfront so there are no surprises.' },
];

const testimonials = [
  { name: 'Vanessa R.', location: 'Melbourne VIC', text: 'Needed a post-renovation clean that was not a standard service. CleanPro put together a plan and every surface was dust-free.', rating: 5 },
  { name: 'James H.', location: 'Sydney NSW', text: 'Booked before a family gathering. They handled windows to the outdoor area. Guests noticed.', rating: 5 },
  { name: 'Tina L.', location: 'Brisbane QLD', text: 'I pick and choose what I want cleaned. No paying for tasks I do not need. Works well for me.', rating: 5 },
];

const galleryItems = [
  { label: 'Custom Job Before' },
  { label: 'Custom Job After' },
  { label: 'Special Area Before' },
  { label: 'Special Area After' },
  { label: 'Full Space Before' },
  { label: 'Full Space After' },
];

const popularCustomJobs = [
  'Post-renovation cleanup',
  'Pre-event preparation',
  'Post-party cleanup',
  'Seasonal deep clean',
  'Outdoor area refresh',
  'Storage unit cleaning',
  'Specialty item care',
  'End-of-tenancy touch-up',
  'Moving day clean',
  'Allergy-focused clean',
  'Pet area sanitisation',
  'Garage or shed clean-out',
];

export default function CustomCleaningPage() {
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
                <Sliders className="w-8 h-8" />
              </div>
              <span className="text-primary-200 text-sm font-semibold uppercase tracking-wider">Customised Cleaning</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Cleaning,<br />Your Way
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Fully customised cleaning plans built around your unique needs. Any task, any space, any duration. Starting from $89.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book?service=custom-cleaning" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Get a Custom Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#pricing" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Pricing
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-primary-200 text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Flexible duration</span>
              <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> From $89</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Fully customisable</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50" />
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Custom Cleaning?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">Not every cleaning job fits a standard box. Our custom service adapts to your exact needs so you only pay for what you need.</p>
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

      {/* Popular Custom Jobs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Custom Jobs</h2>
            <p className="text-neutral-600 text-lg">Some of the unique cleaning requests we handle regularly</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCustomJobs.map((job, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="card flex items-center gap-3 py-4 px-5 hover:border-primary-300 transition-colors cursor-pointer">
                <CheckCircle className="w-5 h-5 text-primary-600 shrink-0" />
                <span className="text-neutral-700 text-sm font-medium">{job}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Custom Cleaning Works</h2>
            <p className="text-neutral-600 text-lg">A simple process designed to give you exactly what you need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 'Step 1: Describe Your Needs', items: ['Tell us what needs cleaning', 'Specify the areas involved', 'Note any special requirements', 'Share photos if helpful', 'Indicate your preferred date', 'Mention access instructions'] },
              { step: 'Step 2: Get Your Custom Plan', items: ['Coordinator contacts you', 'Detailed needs assessment', 'Custom checklist created', 'Accurate quote provided', 'Schedule confirmed', 'Team briefed on requirements'] },
              { step: 'Step 3: We Deliver', items: ['Team arrives on time', 'Custom checklist followed', 'Quality checks throughout', 'Before & after photos', 'Final walkthrough with you', 'Satisfaction guaranteed'] },
            ].map((room, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card">
                <h3 className="text-xl font-semibold mb-4 text-primary-600">{room.step}</h3>
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
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Pricing</h2>
            <p className="text-neutral-600 text-lg">Choose a starting point and we will customise from there.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`card ${i === 1 ? 'border-primary-400 ring-2 ring-primary-200' : 'hover:shadow-lg'} transition-all`}>
                {i === 1 && <span className="inline-block bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">Most Flexible</span>}
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
                <Link href="/book?service=custom-cleaning" className="btn-primary w-full text-center">
                  Get a Quote
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Difference</h2>
            <p className="text-neutral-600 text-lg">Every custom job delivers remarkable results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card flex flex-col items-center justify-center min-h-[200px] bg-white">
                <ImageIcon className="w-12 h-12 text-neutral-400 mb-3" />
                <span className="text-neutral-500 font-medium">{item.label}</span>
                <span className="text-neutral-400 text-sm mt-1">Gallery image placeholder</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
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
      <section className="py-20 bg-neutral-50">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tell Us What You Need</h2>
          <p className="text-xl text-neutral-300 mb-8">No job is too unusual. Describe your cleaning needs and we will create a plan just for you.</p>
          <Link href="/book?service=custom-cleaning" className="btn bg-primary-600 hover:bg-primary-700 text-lg px-10 py-4 inline-flex">
            Get a Custom Quote <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Any task, any space</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Dedicated coordinator</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Transparent quoting</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
