'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Waves, Clock, DollarSign, CheckCircle, Star, Shield, ArrowRight, Image as ImageIcon, ChevronDown, ChevronUp, Wind, Droplets } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  { icon: Wind, title: 'Hot Water Extraction', description: 'Industrial steam systems heat water to high temperatures, killing bacteria, dust mites, and allergens deep within carpet fibres.' },
  { icon: Droplets, title: 'Fast Drying Time', description: 'Our powerful extraction removes up to 95% of moisture during cleaning. Carpets typically dry within 2-4 hours.' },
  { icon: Shield, title: 'Safe for Families & Pets', description: 'We use eco-friendly, non-toxic cleaning solutions that are safe for children, pets, and sensitive individuals.' },
  { icon: Star, title: 'Stain Treatment Included', description: 'Common stains from food, drinks, and mud are treated as part of the standard service. Stubborn stains addressed separately.' },
];

const pricingPlans = [
  { name: '1-2 Rooms', price: '$99', duration: '1-1.5 hours', features: ['Hot water extraction', 'Pre-treatment spray', 'Common stain removal', 'Deodorising treatment', 'Traffic lane cleaning'] },
  { name: '3-4 Rooms', price: '$169', duration: '1.5-2 hours', features: ['Everything in 1-2 Rooms', 'Additional rooms', 'Stair carpet cleaning', 'Spot treatment on tough stains', 'Fabric protection option'] },
  { name: 'Whole House', price: '$249', duration: '2+ hours', features: ['Everything in 3-4 Rooms', 'All carpeted areas', 'Hallway & landing cleaning', 'Full deodorising', 'Scotchgard protection available', 'Priority scheduling'] },
];

const faqs = [
  { q: 'How long do carpets take to dry after steam cleaning?', a: 'With our high-power extraction equipment, carpets typically dry within 2-4 hours depending on humidity, airflow, and carpet thickness. We recommend opening windows and using fans to speed up the process. Most carpets are walkable within an hour.' },
  { q: 'Can you remove all stains?', a: 'We can remove most common stains including food, beverages, mud, and pet accidents. Some permanent stains from dyes, bleach, or long-standing damage may not fully remove, but we will always do our best. We will advise you honestly about results before starting.' },
  { q: 'Is steam cleaning safe for all carpet types?', a: 'Hot water extraction is safe for most synthetic and wool carpets. However, some delicate natural fibre carpets (like jute or sisal) may require a different method. We will assess your carpet type and recommend the best approach.' },
  { q: 'How often should carpets be professionally cleaned?', a: 'We recommend professional steam cleaning every 6-12 months for residential properties. High-traffic areas, homes with pets, or allergy sufferers may benefit from cleaning every 3-6 months. Regular vacuuming between services is essential.' },
];

const testimonials = [
  { name: 'Christine L.', location: 'Sydney NSW', text: 'My carpets look brand new. The pet odour is completely gone and they dried in just 3 hours. Amazing service.', rating: 5 },
  { name: 'Paul D.', location: 'Melbourne VIC', text: 'Had a red wine stain I thought was permanent. CleanPro removed it completely. The steam cleaning process was impressive to watch.', rating: 5 },
  { name: 'Rebecca F.', location: 'Adelaide SA', text: 'As an allergy sufferer, the difference in air quality after carpet cleaning is remarkable. Sleeping so much better.', rating: 5 },
];

const galleryItems = [
  { label: 'High Traffic Area Before' },
  { label: 'High Traffic Area After' },
  { label: 'Stain Before' },
  { label: 'Stain After' },
  { label: 'Full Room Before' },
  { label: 'Full Room After' },
];

export default function CarpetCleaningPage() {
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
                <Waves className="w-8 h-8" />
              </div>
              <span className="text-primary-200 text-sm font-semibold uppercase tracking-wider">Carpet Steam Cleaning</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Deep Clean Carpets,<br />Fresh Results
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Industrial hot water extraction removes dirt, allergens, and odours. Starting from $99.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book?service=carpet-cleaning" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Book Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#pricing" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Pricing
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-primary-200 text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 1-2 hours</span>
              <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> From $99</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Eco-friendly solutions</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50" />
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Steam Clean Your Carpets?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">Regular vacuuming only removes surface dirt. Steam cleaning extracts embedded dirt, allergens, and bacteria from deep within carpet fibres.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Steam Cleaning Process</h2>
            <p className="text-neutral-600 text-lg">A systematic approach for the deepest clean possible</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { room: 'Step 1: Preparation', items: ['Room inspection & furniture moved', 'Thorough vacuuming', 'Traffic lane identification', 'Stain assessment & tagging', 'Pre-spray application', 'Dwell time for pre-treatment'] },
              { room: 'Step 2: Steam Cleaning', items: ['Hot water extraction (up to 120C)', 'Deep fibre agitation', 'Rinse cycle with clean water', 'Powerful moisture extraction', 'Traffic lane double-pass', 'Edge cleaning along walls'] },
              { room: 'Step 3: Finishing', items: ['Grooming of carpet pile', 'Deodorising application', 'Final inspection walkthrough', 'Stain treatment notes', 'Drying advice provided', 'Furniture replaced carefully'] },
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
            <p className="text-neutral-600 text-lg">Priced by the number of rooms. No hidden charges.</p>
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
                <Link href="/book?service=carpet-cleaning" className="btn-primary w-full text-center">
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
            <p className="text-neutral-600 text-lg">The transformation is remarkable</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Breathe Easier in a Cleaner Home</h2>
          <p className="text-xl text-neutral-300 mb-8">Professional carpet steam cleaning removes allergens, odours, and years of embedded dirt.</p>
          <Link href="/book?service=carpet-cleaning" className="btn bg-primary-600 hover:bg-primary-700 text-lg px-10 py-4 inline-flex">
            Book Carpet Cleaning <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Hot water extraction</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Safe for pets & kids</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Fast drying</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
