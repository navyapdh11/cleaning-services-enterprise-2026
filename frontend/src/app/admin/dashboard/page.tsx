'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Search,
  Menu,
  X,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const revenueData = [
  { month: 'Jan', revenue: 12000, bookings: 45 },
  { month: 'Feb', revenue: 15000, bookings: 52 },
  { month: 'Mar', revenue: 18000, bookings: 61 },
  { month: 'Apr', revenue: 22000, bookings: 74 },
  { month: 'May', revenue: 25000, bookings: 82 },
  { month: 'Jun', revenue: 28000, bookings: 91 },
];

const serviceDistribution = [
  { name: 'Standard', value: 35, color: '#3B82F6' },
  { name: 'Deep Clean', value: 25, color: '#8B5CF6' },
  { name: 'End of Lease', value: 20, color: '#10B981' },
  { name: 'Office', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 8, color: '#6B7280' },
];

const weeklyBookings = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 18 },
  { day: 'Wed', count: 15 },
  { day: 'Thu', count: 22 },
  { day: 'Fri', count: 20 },
  { day: 'Sat', count: 28 },
  { day: 'Sun', count: 8 },
];

const recentBookings = [
  { id: 'BK-001', customer: 'Emma Thompson', service: 'Deep Cleaning', date: '2026-04-14', time: '09:00', status: 'confirmed', amount: 250 },
  { id: 'BK-002', customer: 'James Wilson', service: 'End of Lease', date: '2026-04-14', time: '10:00', status: 'pending', amount: 350 },
  { id: 'BK-003', customer: 'Sarah Chen', service: 'Standard', date: '2026-04-15', time: '08:00', status: 'confirmed', amount: 120 },
  { id: 'BK-004', customer: 'Michael Brown', service: 'Office Cleaning', date: '2026-04-15', time: '14:00', status: 'completed', amount: 200 },
  { id: 'BK-005', customer: 'Lisa Anderson', service: 'Carpet Cleaning', date: '2026-04-16', time: '11:00', status: 'confirmed', amount: 150 },
];

const SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
  { icon: Users, label: 'CRM', href: '/admin/crm' },
  { icon: UserCheck, label: 'Cleaners', href: '/admin/cleaners' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2">
            {SIDEBAR_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  link.href === '/admin/dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  12.5%
                </span>
              </div>
              <h3 className="text-2xl font-bold">$28,000</h3>
              <p className="text-gray-500">Monthly Revenue</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  8.2%
                </span>
              </div>
              <h3 className="text-2xl font-bold">345</h3>
              <p className="text-gray-500">Total Bookings</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  15.3%
                </span>
              </div>
              <h3 className="text-2xl font-bold">1,248</h3>
              <p className="text-gray-500">Total Customers</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-orange-600" />
                </div>
                <span className="flex items-center text-red-600 text-sm font-medium">
                  <ArrowDownRight className="w-4 h-4" />
                  2.1%
                </span>
              </div>
              <h3 className="text-2xl font-bold">24</h3>
              <p className="text-gray-500">Active Cleaners</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Trend */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Revenue Trend</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Service Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Service Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Bookings Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Weekly Bookings</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
              <Link href="/admin/bookings" className="text-blue-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="px-6 py-4 font-medium">Booking ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Service</th>
                    <th className="px-6 py-4 font-medium">Date/Time</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{booking.id}</td>
                      <td className="px-6 py-4">{booking.customer}</td>
                      <td className="px-6 py-4">{booking.service}</td>
                      <td className="px-6 py-4">{booking.date} {booking.time}</td>
                      <td className="px-6 py-4 font-semibold">${booking.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/bookings?status=pending" className="p-4 border rounded-xl hover:bg-gray-50 transition-all text-center">
                <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <span className="font-medium">Pending Bookings</span>
                <span className="block text-sm text-gray-500">5 awaiting</span>
              </Link>
              <Link href="/admin/cleaners" className="p-4 border rounded-xl hover:bg-gray-50 transition-all text-center">
                <UserCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <span className="font-medium">Assign Cleaner</span>
                <span className="block text-sm text-gray-500">3 unassigned</span>
              </Link>
              <Link href="/admin/crm" className="p-4 border rounded-xl hover:bg-gray-50 transition-all text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <span className="font-medium">View Customers</span>
                <span className="block text-sm text-gray-500">1,248 total</span>
              </Link>
              <Link href="/admin/bookings" className="p-4 border rounded-xl hover:bg-gray-50 transition-all text-center">
                <CheckCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <span className="font-medium">Completed Today</span>
                <span className="block text-sm text-gray-500">12 done</span>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
