'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { menuApi } from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';
import Link from 'next/link';

interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children: MenuItem[];
  order: number;
}

export function DynamicMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuError, setMenuError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await menuApi.getMenu();
        setMenuItems(data.data || []);
        setMenuError(null);
      } catch (error: unknown) {
        const message = error instanceof Error && 'response' in error
          ? (error as { response?: { data?: { error?: { message?: string } } } }).response?.data?.error?.message || error.message
          : 'Failed to load menu';
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[DynamicMenu] Menu fetch failed:', message);
        }
        setMenuError(message);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 text-neutral-600 hover:text-primary-600 transition-colors">
        <span className="font-medium">{user?.firstName || 'Menu'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-50"
          >
            {menuError ? (
              <div className="px-4 py-2 text-red-600 text-sm">Failed to load menu</div>
            ) : menuItems.length > 0 ? (
              menuItems.map((item) => <MenuItem key={item.key} item={item} onClose={() => setIsOpen(false)} />)
            ) : (
              <div className="px-4 py-2 text-neutral-500">No menu items</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);

  if (item.children.length === 0) {
    return item.path ? (
      <Link href={item.path} onClick={onClose} className="flex items-center gap-3 px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition-colors">
        {item.label}
      </Link>
    ) : null;
  }

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full px-4 py-2 text-neutral-700 hover:bg-neutral-100 transition-colors">
        <span>{item.label}</span>
        {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-neutral-50 ml-4">
            {item.children.map((child) => (
              child.path ? <Link key={child.key} href={child.path} onClick={onClose} className="block px-6 py-2 text-sm text-neutral-600 hover:bg-neutral-100">{child.label}</Link> : null
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
