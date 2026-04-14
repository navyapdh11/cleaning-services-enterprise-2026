'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  Trash2,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Menu,
  X,
  Bell,
  UserPlus,
  Download,
  Award,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
  { icon: Users, label: 'CRM', href: '/admin/crm' },
  { icon: UserCheck, label: 'Cleaners', href: '/admin/cleaners' },
];

const CLEANERS = [
  { id: 'CLR-001', name: 'Sarah Mitchell', email: 'sarah.m@cleanpro.com.au', phone: '0412 345 678', suburb: 'Bondi', rating: 4.9, totalJobs: 342, hourlyRate: 35, status: 'active', specialties: ['Deep Cleaning', 'Standard'], joinedDate: '2024-03-15', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], currentBooking: 'BK-001', nextAvailable: '2026-04-15' },
  { id: 'CLR-002', name: 'James Kim', email: 'james.k@cleanpro.com.au', phone: '0423 456 789', suburb: 'Manly', rating: 4.8, totalJobs: 256, hourlyRate: 32, status: 'active', specialties: ['End of Lease', 'Office'], joinedDate: '2024-06-20', availability: ['Mon', 'Wed', 'Fri', 'Sat'], currentBooking: 'BK-004', nextAvailable: '2026-04-16' },
  { id: 'CLR-003', name: 'Maria Lopez', email: 'maria.l@cleanpro.com.au', phone: '0434 567 890', suburb: 'Surry Hills', rating: 5.0, totalJobs: 189, hourlyRate: 38, status: 'active', specialties: ['Standard', 'Deep Cleaning'], joinedDate: '2024-08-10', availability: ['Tue', 'Thu', 'Sat', 'Sun'], currentBooking: 'BK-003', nextAvailable: '2026-04-16' },
  { id: 'CLR-004', name: 'John Davis', email: 'john.d@cleanpro.com.au', phone: '0445 678 901', suburb: 'Newtown', rating: 4.7, totalJobs: 128, hourlyRate: 30, status: 'active', specialties: ['Carpet Cleaning', 'Pressure Washing'], joinedDate: '2025-01-05', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], currentBooking: null, nextAvailable: '2026-04-14' },
  { id: 'CLR-005', name: 'Anna Smith', email: 'anna.s@cleanpro.com.au', phone: '0456 789 012', suburb: 'Pyrmont', rating: 4.9, totalJobs: 201, hourlyRate: 36, status: 'active', specialties: ['Standard', 'Window Cleaning'], joinedDate: '2024-09-22', availability: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'], currentBooking: null, nextAvailable: '2026-04-14' },
  { id: 'CLR-006', name: 'Peter Wong', email: 'peter.w@cleanpro.com.au', phone: '0467 890 123', suburb: 'Chatswood', rating: 4.6, totalJobs: 95, hourlyRate: 28, status: 'on-leave', specialties: ['Office', 'Carpet Cleaning'], joinedDate: '2025-04-18', availability: [], currentBooking: null, nextAvailable: '2026-04-25' },
  { id: 'CLR-007', name: 'Emma Taylor', email: 'emma.t@cleanpro.com.au', phone: '0478 901 234', suburb: 'Parramatta', rating: 4.8, totalJobs: 167, hourlyRate: 34, status: 'active', specialties: ['Deep Cleaning', 'End of Lease'], joinedDate: '2024-11-30', availability: ['Mon', 'Tue', 'Thu', 'Fri'], currentBooking: null, nextAvailable: '2026-04-14' },
  { id: 'CLR-008', name: 'David Nguyen', email: 'david.n@cleanpro.com.au', phone: '0489 012 345', suburb: 'Strathfield', rating: 4.5, totalJobs: 78, hourlyRate: 28, status: 'active', specialties: ['Standard', 'Garden Maintenance'], joinedDate: '2025-06-15', availability: ['Mon', 'Wed', 'Fri', 'Sat', 'Sun'], currentBooking: null, nextAvailable: '2026-04-15' },
];

const performanceData = CLEANERS.slice(0, 6).map((c) => ({
  name: c.name.split(' ')[0],
  jobs: c.totalJobs,
  rating: c.rating * 20,
}));

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  'on-leave': 'bg-yellow-100 text-yellow-700',
  inactive: 'bg-red-100 text-red-700',
};

export default function AdminCleaners() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCleaner, setSelectedCleaner] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCleaners = CLEANERS
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.suburb.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a];
      const bVal = b[sortBy as keyof typeof b];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleViewDetails = (cleanerId: string) => {
    setSelectedCleaner(cleanerId);
    setShowDetails(true);
  };

  const selectedCleanerData = CLEANERS.find((c) => c.id === selectedCleaner);

  const stats = {
    total: CLEANERS.length,
    active: CLEANERS.filter((c) => c.status === 'active').length,
    onLeave: CLEANERS.filter((c) => c.status === 'on-leave').length,
    available: CLEANERS.filter((c) => c.status === 'active' && !c.currentBooking).length,
    avgRating: (CLEANERS.reduce((sum, c) => sum + c.rating, 0) / CLEANERS.length).toFixed(1),
    totalJobs: CLEANERS.reduce((sum, c) => sum + c.totalJobs, 0),
  };

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
                  link.href === '/admin/cleaners'
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
            <h1 className="text-xl font-bold">Cleaner Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <UserCheck className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Active</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">On Leave</p>
                  <p className="text-2xl font-bold">{stats.onLeave}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="text-2xl font-bold">{stats.available}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Avg Rating</p>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Jobs</p>
                  <p className="text-2xl font-bold">{stats.totalJobs}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Cleaner Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jobs" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Jobs Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cleaners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Add Cleaner
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-all">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Cleaners Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b bg-gray-50">
                    <th className="px-4 py-4 font-medium cursor-pointer hover:text-gray-700" onClick={() => handleSort('id')}>
                      <div className="flex items-center gap-1">
                        ID {sortBy === 'id' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium cursor-pointer hover:text-gray-700" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-1">
                        Cleaner {sortBy === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium">Contact</th>
                    <th className="px-4 py-4 font-medium">Location</th>
                    <th className="px-4 py-4 font-medium">Specialties</th>
                    <th className="px-4 py-4 font-medium cursor-pointer hover:text-gray-700" onClick={() => handleSort('rating')}>
                      <div className="flex items-center gap-1">
                        Rating {sortBy === 'rating' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium cursor-pointer hover:text-gray-700" onClick={() => handleSort('totalJobs')}>
                      <div className="flex items-center gap-1">
                        Jobs {sortBy === 'totalJobs' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium">Current Booking</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCleaners.map((cleaner) => (
                    <tr key={cleaner.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium">{cleaner.id}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                            {cleaner.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{cleaner.name}</p>
                            <p className="text-sm text-gray-500">${cleaner.hourlyRate}/hr</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {cleaner.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3 text-gray-400" />
                            {cleaner.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {cleaner.suburb}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {cleaner.specialties.map((s) => (
                            <span key={s} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{cleaner.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold">{cleaner.totalJobs}</td>
                      <td className="px-4 py-4">
                        {cleaner.currentBooking ? (
                          <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            {cleaner.currentBooking}
                          </span>
                        ) : (
                          <span className="text-sm text-green-600">Available</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[cleaner.status]}`}>
                          {cleaner.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewDetails(cleaner.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-red-100 rounded text-red-500" title="Remove">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Availability Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Availability Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Cleaner</th>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <th key={day} className="py-3 px-2 text-center">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CLEANERS.filter((c) => c.status === 'active').map((cleaner) => (
                    <tr key={cleaner.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{cleaner.name}</td>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <td key={day} className="py-3 px-2 text-center">
                          {cleaner.availability.includes(day) ? (
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Cleaner Details Modal */}
      {showDetails && selectedCleanerData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-lg font-bold">Cleaner Details</h3>
              <button onClick={() => setShowDetails(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Cleaner Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedCleanerData.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold">{selectedCleanerData.name}</h4>
                  <p className="text-gray-500">{selectedCleanerData.id} &middot; {selectedCleanerData.suburb}</p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{selectedCleanerData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{selectedCleanerData.phone}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <p className="text-xl font-bold">{selectedCleanerData.rating}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Total Jobs</p>
                  <p className="text-xl font-bold">{selectedCleanerData.totalJobs}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Hourly Rate</p>
                  <p className="text-xl font-bold">${selectedCleanerData.hourlyRate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[selectedCleanerData.status]}`}>
                    {selectedCleanerData.status}
                  </span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h5 className="font-semibold mb-2">Specialties</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedCleanerData.specialties.map((s) => (
                    <span key={s} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h5 className="font-semibold mb-2">Availability</h5>
                <div className="flex flex-wrap gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <span
                      key={day}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCleanerData.availability.includes(day)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Assignment */}
              <div className="mb-6">
                <h5 className="font-semibold mb-2">Current Assignment</h5>
                {selectedCleanerData.currentBooking ? (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="font-medium">Booking: {selectedCleanerData.currentBooking}</p>
                    <p className="text-sm text-gray-500">Next available: {selectedCleanerData.nextAvailable}</p>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Available for assignment
                    </p>
                    <p className="text-sm text-gray-500">From: {selectedCleanerData.nextAvailable}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t flex gap-3 justify-end sticky bottom-0 bg-white">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Cleaner
              </button>
              <Link href="/admin/bookings" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Assign Booking
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Add Cleaner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold">Add New Cleaner</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@cleanpro.com.au" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="04XX XXX XXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suburb</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Bondi" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialties</label>
                <select multiple className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Standard Cleaning</option>
                  <option>Deep Cleaning</option>
                  <option>End of Lease</option>
                  <option>Office Cleaning</option>
                  <option>Carpet Cleaning</option>
                  <option>Window Cleaning</option>
                  <option>Pressure Washing</option>
                  <option>Garden Maintenance</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t flex gap-3 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add Cleaner
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
