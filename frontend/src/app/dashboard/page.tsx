'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { dashboardApi } from '@/lib/api';
import { useAuthStore } from '@/lib/authStore';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, DollarSign, TrendingUp, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { CHART_COLORS_PRIMARY, CHART_COLORS_STATUS } from '@/lib/chartColors';

interface DashboardOverview {
  overview: {
    totalUsers: number;
    totalBookings: number;
    totalRevenue: number;
    activeBookings: number;
    monthlyBookings: number;
    monthlyRevenue: number;
  };
  bookingsByStatus: { status: string; count: number }[];
  servicesByPopularity: { name: string; count: number }[];
  recentReviews: {
    id: string;
    rating: number;
    customer: { firstName: string; lastName: string };
    booking: { service: { name: string } };
  }[];
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.getOverview()
      .then(({ data }) => {
        setData(data.data);
        setError(null);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error && 'response' in err
          ? (err as { response?: { data?: { error?: { message?: string } } } }).response?.data?.error?.message || err.message
          : 'Failed to load dashboard data';
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading dashboard">
        <div className="animate-pulse text-neutral-400">Loading dashboard...</div>
        <span className="sr-only">Loading dashboard data, please wait</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="alert">
        <div className="card text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            <span className="text-red-600 text-2xl font-bold">!</span>
          </div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">Failed to Load Dashboard</h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              dashboardApi.getOverview()
                .then(({ data }) => { setData(data.data); setError(null); })
                .catch((err: unknown) => {
                  const message = err instanceof Error && 'response' in err
                    ? (err as { response?: { data?: { error?: { message?: string } } } }).response?.data?.error?.message || err.message
                    : 'Failed to load dashboard data';
                  setError(message);
                })
                .finally(() => setLoading(false));
            }}
            className="btn-primary"
            aria-label="Retry loading dashboard data"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-label="No data available">
        <div className="animate-pulse text-neutral-400">No data available.</div>
        <span className="sr-only">No dashboard data is currently available</span>
      </div>
    );
  }

  const { overview, bookingsByStatus, servicesByPopularity, recentReviews } = data;

  const statCards: Array<{ label: string; value: string | number; icon: React.ElementType; color: string; bg: string }> = [
    { label: 'Total Users', value: overview.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Bookings', value: overview.totalBookings, icon: Calendar, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Revenue', value: `$${overview.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Active Bookings', value: overview.activeBookings, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-neutral-600 mt-1">Hi {user?.firstName}, here is your overview.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
              role="region"
              aria-label={`${stat.label}: ${stat.value}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`} aria-hidden="true">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-neutral-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Bookings by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsByStatus} aria-label="Bar chart showing bookings by status">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={CHART_COLORS_STATUS.info} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart aria-label="Pie chart showing popular services">
                <Pie data={servicesByPopularity} cx="50%" cy="50%" outerRadius={100} dataKey="count" label={({ name }) => name}>
                  {servicesByPopularity.map((_, i) => <Cell key={i} fill={CHART_COLORS_PRIMARY[i % CHART_COLORS_PRIMARY.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <section className="card" aria-label="Recent reviews">
          <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {recentReviews.map((r) => (
              <div key={r.id} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                <div className="flex gap-0.5" aria-label={`Rating: ${r.rating} out of 5 stars`} role="img">
                  {Array(r.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <div>
                  <p className="font-medium">{r.customer.firstName} {r.customer.lastName}</p>
                  <p className="text-neutral-600 text-sm">for {r.booking.service.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
