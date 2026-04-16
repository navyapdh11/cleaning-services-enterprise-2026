import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trust bar */}
        <div className="flex flex-wrap gap-4 items-center justify-center mb-8 pb-8 border-b border-neutral-800">
          <span className="flex items-center gap-1.5 text-sm text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-green-500" /> ABN 12 345 678 901
          </span>
          <span className="flex items-center gap-1.5 text-sm text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-green-500" /> $20M Public Liability
          </span>
          <span className="text-sm text-neutral-400">All prices AUD incl. GST</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CleanPro Enterprise</h3>
            <p className="text-neutral-400">Professional cleaning for homes and offices across Australia.</p>
            <div className="flex gap-4 mt-4">
              <Facebook className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/services/regular-cleaning" className="hover:text-white">Regular Cleaning</Link></li>
              <li><Link href="/services/commercial-cleaning" className="hover:text-white">Commercial Cleaning</Link></li>
              <li><Link href="/services/end-of-lease" className="hover:text-white">End of Lease</Link></li>
              <li><Link href="/services/deep-cleaning" className="hover:text-white">Deep Cleaning</Link></li>
              <li><Link href="/services/carpet-cleaning" className="hover:text-white">Carpet Cleaning</Link></li>
              <li><Link href="/services" className="hover:text-white">All Services →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Sydney, NSW, Australia</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> 1300 123 456</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> hello@cleanpro.au</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} CleanPro Enterprise. All rights reserved. ABN 12 345 678 901</p>
          <p className="mt-1">
            <Link href="/privacy" className="hover:text-neutral-300">Privacy</Link>
            {' · '}
            <Link href="/terms" className="hover:text-neutral-300">Terms</Link>
            {' · '}Served with care across Australia 🇦🇺
          </p>
        </div>
      </div>
    </footer>
  );
}
