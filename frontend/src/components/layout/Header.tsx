'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles, Shield, Clock, Star, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';
import { DynamicMenu } from '@/components/menu/DynamicMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">CleanPro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-neutral-600 hover:text-primary-600 transition-colors">Services</Link>
            <Link href="/about" className="text-neutral-600 hover:text-primary-600 transition-colors">About</Link>
            <Link href="/pricing" className="text-neutral-600 hover:text-primary-600 transition-colors">Pricing</Link>
            <Link href="/contact" className="text-neutral-600 hover:text-primary-600 transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <DynamicMenu />
                <Link href="/dashboard" className="btn-primary">Dashboard</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary">Sign In</Link>
                <Link href="/register" className="btn-primary">Get Started</Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-neutral-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link href="/services" className="block py-2 text-neutral-600">Services</Link>
              <Link href="/about" className="block py-2 text-neutral-600">About</Link>
              <Link href="/pricing" className="block py-2 text-neutral-600">Pricing</Link>
              <Link href="/contact" className="block py-2 text-neutral-600">Contact</Link>
              {isAuthenticated ? (
                <Link href="/dashboard" className="block btn-primary w-full text-center">Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="block btn-secondary w-full text-center">Sign In</Link>
                  <Link href="/register" className="block btn-primary w-full text-center">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
