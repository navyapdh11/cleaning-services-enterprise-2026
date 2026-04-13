'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { servicesApi, bookingsApi } from '@/lib/api';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingAddress, setBookingAddress] = useState('');

  useEffect(() => {
    servicesApi.getAll().then(({ data }) => { setServices(data.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleBook = async () => {
    if (!selectedService || !bookingDate || !bookingAddress) return toast.error('Please fill all fields');
    try {
      await bookingsApi.create({ serviceId: selectedService.id, date: bookingDate, address: bookingAddress });
      toast.success('Booking created!');
      setSelectedService(null);
      setBookingDate('');
      setBookingAddress('');
    } catch (err: any) { toast.error(err.response?.data?.error?.message || 'Booking failed'); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse">Loading services...</div></div>;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Cleaning Services</h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">Professional cleaning solutions for every need. Book instantly with transparent pricing.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? services.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card hover:shadow-lg transition-all cursor-pointer group" onClick={() => setSelectedService(s)}>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600">{s.name}</h3>
              <p className="text-neutral-600 mb-4">{s.description}</p>
              <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {s.duration} min</span>
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {s.basePrice}</span>
              </div>
              <div className="flex flex-wrap gap-2">{s.features?.map((f: string, j: number) => <span key={j} className="badge badge-info">{f}</span>)}</div>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-12 text-neutral-500">No services available yet. Check back soon!</div>
          )}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedService(null)}>
          <div className="card w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Book {selectedService.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date & Time</label>
                <input type="datetime-local" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input value={bookingAddress} onChange={(e) => setBookingAddress(e.target.value)} className="input" placeholder="123 Main St, City" />
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <span className="text-neutral-600">Total Price</span>
                <span className="text-2xl font-bold text-primary-600">${selectedService.basePrice}</span>
              </div>
              <button onClick={handleBook} className="btn-primary w-full">Confirm Booking <ArrowRight className="ml-2 w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
