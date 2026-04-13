import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CleanPro Enterprise</h3>
            <p className="text-neutral-400">Premium cleaning services for residential and commercial spaces.</p>
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
              <li><Link href="/services/residential" className="hover:text-white">Residential</Link></li>
              <li><Link href="/services/commercial" className="hover:text-white">Commercial</Link></li>
              <li><Link href="/services/deep-clean" className="hover:text-white">Deep Clean</Link></li>
              <li><Link href="/services/move-in-out" className="hover:text-white">Move In/Out</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 123 Clean Street, Suite 100</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@cleanpro.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          © {new Date().getFullYear()} CleanPro Enterprise. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
