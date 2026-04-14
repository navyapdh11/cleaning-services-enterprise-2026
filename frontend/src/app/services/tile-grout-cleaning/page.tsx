'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Grid3x3, Clock, DollarSign, CheckCircle, Star, Shield, ArrowRight, Image as ImageIcon, ChevronDown, ChevronUp, Sparkles, Droplets } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const features = [
  { icon: Droplets, title: 'Deep Grout Restoration', description: 'Our specialised equipment and cleaning solutions penetrate deep into grout lines, removing years of embedded dirt and discolouration.' },
  { icon: Sparkles, title: 'Colour Sealing Option', description: 'After cleaning, we can recolour and seal your grout lines for a like-new finish that resists future staining.' },
  { icon: Shield, title: 'All Tile Types', description: 'Ceramic, porcelain, natural stone, terracotta, and mosaic tiles. We adjust our technique for each material.' },
  { icon: Star, title: 'Hygienic Results', description: 'Removing mould, mildew, and bacteria from grout lines creates a healthier environment for your family.' },
];

const pricingPlans = [
  { name: 'Bathroom', price: '$119', duration: '1.5-2 hours', features: ['Floor tiles cleaned', 'Wall tiles cleaned', 'Grout deep cleaned', 'Mould & mildew treatment', 'Silicone inspection', 'Eco-friendly products'] },
  { name: 'Kitchen + Bathroom', price: '$189', duration: '2-3 hours', features: ['Everything in Bathroom plan', 'Kitchen floor tiles', 'Splashback cleaning', 'Grout stain treatment', 'Sealer application advice', 'Before & after photos'] },
  { name: 'Whole Floor', price: '$289', duration: '3+ hours', features: ['All tiled areas', 'Everything above plans', 'Living area tiles', 'Hallway & entry tiles', 'Grout sealing available', 'Colour sealing consultation'] },
];

const faqs = [
  { q: 'Can you restore discoloured grout to its original colour?', a: 'In many cases, yes. Our deep cleaning process can restore grout close to its original colour. For severely stained or damaged grout, we offer colour sealing which applies a new coloured sealant over the existing grout, giving it a brand-new appearance that is also stain-resistant.' },
  { q: 'Is tile and grout cleaning safe for all tiles?', a: 'Yes, we adjust our cleaning method based on the tile type. Porcelain and ceramic tiles can handle more aggressive cleaning, while natural stone (marble, travertine, slate) requires gentler pH-neutral solutions. We always assess your tiles before starting.' },
  { q: 'How often should tile and grout be professionally cleaned?', a: 'We recommend professional cleaning every 12-18 months for residential areas. High-traffic areas like kitchen floors and bathroom walls may benefit from cleaning every 6-12 months. Regular mopping and wiping between services will extend the results.' },
  { q: 'Do you also reseal tiles after cleaning?', a: 'Yes, we offer tile and grout sealing as an add-on service. After deep cleaning, we can apply a penetrating sealer to protect against future staining. For grout, we also offer colour sealing which both protects and refreshes the appearance.' },
];

const testimonials = [
  { name: 'Maria G.', location: 'Sydney NSW', text: 'My bathroom tiles look like they just got installed. The grout went from dark grey back to white. Absolutely incredible work.', rating: 5 },
  { name: 'Peter W.', location: 'Melbourne VIC', text: 'The kitchen floor tiles have not looked this good since we moved in 8 years ago. The grout cleaning made such a huge difference.', rating: 5 },
  { name: 'Jenny K.', location: 'Brisbane QLD', text: 'We had mould in the bathroom grout that we could not shift. CleanPro removed it all and the colour sealing made it look brand new.', rating: 5 },
];

const galleryItems = [
  { label: 'Grout Before' },
  { label: 'Grout After' },
  { label: 'Floor Tiles Before' },
  { label: 'Floor Tiles After' },
  { label: 'Wall Tiles Before' },
  { label: 'Wall Tiles After' },
];

export default function TileGroutCleaningPage() {
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
                <Grid3x3 className="w-8 h-8" />
              </div>
              <span className="text-primary-200 text-sm font-semibold uppercase tracking-wider">Tile & Grout Cleaning</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Restore Your Tiles<br />to Like-New
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl">
              Deep grout cleaning and tile restoration for bathrooms, kitchens, and floors. Starting from $119.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book?service=tile-grout-cleaning" className="btn bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3">
                Book Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#pricing" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3">
                View Pricing
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-primary-200 text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 2-3 hours</span>
              <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> From $119</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> All tile types</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50" />
      </section>

      {/* Features */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Tile & Grout Cleaning?</h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">Grout is porous and absorbs dirt, mould, and bacteria over time. Professional cleaning restores both appearance and hygiene.</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Cleaning Process</h2>
            <p className="text-neutral-600 text-lg">A thorough methodical approach for every tiled surface</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { room: 'Assessment & Prep', items: ['Tile type identification', 'Grout condition assessment', 'Test patch cleaning', 'Furniture & mat removal', 'Area pre-rinse', 'Product selection'] },
              { room: 'Deep Cleaning', items: ['Grout line agitation', 'High-pressure grout extraction', 'Tile surface scrubbing', 'Mould & mildew treatment', 'Acid rinse (if needed)', 'Neutralisation wash'] },
              { room: 'Finishing & Protection', items: ['Final inspection', 'Grout colour assessment', 'Sealer application (optional)', 'Silicone replacement quote', 'Care advice provided', 'Before & after documentation'] },
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
            <p className="text-neutral-600 text-lg">Priced by area. Add colour sealing for an extra refresh.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`card ${i === 1 ? 'border-primary-400 ring-2 ring-primary-200' : 'hover:shadow-lg'} transition-all`}>
                {i === 1 && <span className="inline-block bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">Best Value</span>}
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
                <Link href="/book?service=tile-grout-cleaning" className="btn-primary w-full text-center">
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
            <p className="text-neutral-600 text-lg">The grout transformation is remarkable</p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bring Your Tiles Back to Life</h2>
          <p className="text-xl text-neutral-300 mb-8">Professional tile and grout cleaning can save you the cost of re-tiling. See the difference for yourself.</p>
          <Link href="/book?service=tile-grout-cleaning" className="btn bg-primary-600 hover:bg-primary-700 text-lg px-10 py-4 inline-flex">
            Book Tile & Grout Clean <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <div className="flex flex-wrap gap-6 justify-center mt-8 text-neutral-400">
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> All tile types</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Colour sealing available</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Mould removal included</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
