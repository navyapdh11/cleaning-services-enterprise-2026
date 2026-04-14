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
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Bell,
  Download,
  UserPlus,
  Star,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
  { icon: Users, label: 'CRM', href: '/admin/crm' },
  { icon: UserCheck, label: 'Cleaners', href: '/admin/cleaners' },
];

const CUSTOMERS = [
  { id: 'CUST-001', name: 'Emma Thompson', email: 'emma@email.com', phone: '0412 345 678', address: '12 Bondi Rd, Bondi', suburb: 'Bondi', joinDate: '2025-06-15', totalBookings: 12, totalSpent: 2800, lastBooking: '2026-04-14', rating: 5, notes: 'Prefers eco-friendly products' },
  { id: 'CUST-002', name: 'James Wilson', email: 'james@email.com', phone: '0423 456 789', address: '45 Manly St, Manly', suburb: 'Manly', joinDate: '2025-08-22', totalBookings: 8, totalSpent: 2400, lastBooking: '2026-04-14', rating: 4, notes: 'End of lease regular' },
  { id: 'CUST-003', name: 'Sarah Chen', email: 'sarah@email.com', phone: '0434 567 890', address: '78 George St, Surry Hills', suburb: 'Surry Hills', joinDate: '2025-09-10', totalBookings: 15, totalSpent: 1800, lastBooking: '2026-04-15', rating: 5, notes: 'Weekly recurring customer' },
  { id: 'CUST-004', name: 'Michael Brown', email: 'michael@email.com', phone: '0445 678 901', address: '100 Pitt St, Sydney', suburb: 'Sydney CBD', joinDate: '2025-07-05', totalBookings: 6, totalSpent: 1200, lastBooking: '2026-04-15', rating: 4, notes: 'Office cleaning contract' },
  { id: 'CUST-005', name: 'Lisa Anderson', email: 'lisa@email.com', phone: '0456 789 012', address: '23 King St, Newtown', suburb: 'Newtown', joinDate: '2025-11-18', totalBookings: 4, totalSpent: 600, lastBooking: '2026-04-16', rating: 5, notes: '' },
  { id: 'CUST-006', name: 'David Park', email: 'david@email.com', phone: '0467 890 123', address: '56 Oxford St, Paddington', suburb: 'Paddington', joinDate: '2026-01-03', totalBookings: 3, totalSpent: 300, lastBooking: '2026-04-16', rating: 4, notes: '' },
  { id: 'CUST-007', name: 'Rachel Green', email: 'rachel@email.com', phone: '0478 901 234', address: '89 Harris St, Pyrmont', suburb: 'Pyrmont', joinDate: '2025-10-25', totalBookings: 9, totalSpent: 2520, lastBooking: '2026-04-17', rating: 5, notes: 'VIP customer - priority booking' },
  { id: 'CUST-008', name: 'Tom Harris', email: 'tom@email.com', phone: '0489 012 345', address: '12 Victoria Rd, Drummoyne', suburb: 'Drummoyne', joinDate: '2025-12-08', totalBookings: 2, totalSpent: 240, lastBooking: '2026-04-17', rating: 3, notes: 'Cancelled last booking' },
  { id: 'CUST-009', name: 'Amy White', email: 'amy@email.com', phone: '0490 123 456', address: '34 Military Rd, Neutral Bay', suburb: 'Neutral Bay', joinDate: '2026-02-14', totalBookings: 5, totalSpent: 1750, lastBooking: '2026-04-18', rating: 5, notes: 'End of lease cleaning' },
  { id: 'CUST-010', name: 'Chris Lee', email: 'chris@email.com', phone: '0401 234 567', address: '67 Pacific Hwy, Chatswood', suburb: 'Chatswood', joinDate: '2025-05-20', totalBookings: 20, totalSpent: 4000, lastBooking: '2026-04-18', rating: 5, notes: 'Top customer - monthly contract' },
];

const BOOKING_HISTORY: Record<string, { date: string; service: string; amount: number; status: string }[]> = {
  'CUST-001': [
    { date: '2026-04-14', service: 'Deep Cleaning', amount: 250, status: 'confirmed' },
    { date: '2026-03-28', service: 'Standard', amount: 120, status: 'completed' },
    { date: '2026-03-14', service: 'Deep Cleaning', amount: 250, status: 'completed' },
  ],
  'CUST-003': [
    { date: '2026-04-15', service: 'Standard', amount: 120, status: 'confirmed' },
    { date: '2026-04-08', service: 'Standard', amount: 120, status: 'completed' },
    { date: '2026-04-01', service: 'Standard', amount: 120, status: 'completed' },
  ],
};

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminCRM() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredCustomers = CUSTOMERS
    .filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.suburb.toLowerCase().includes(searchTerm.toLowerCase())
    )
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

  const handleViewDetails = (customerId: string) => {
    setSelectedCustomer(customerId);
    setShowDetails(true);
  };

  const selectedCustomerData = CUSTOMERS.find((c) => c.id === selectedCustomer);
  const customerBookings = selectedCustomer ? BOOKING_HISTORY[selectedCustomer] || [] : [];

  const totalCustomers = CUSTOMERS.length;
  const totalRevenue = CUSTOMERS.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgBookings = (CUSTOMERS.reduce((sum, c) => sum + c.totalBookings, 0) / totalCustomers).toFixed(1);
  const avgRating = (CUSTOMERS.reduce((sum, c) => sum + c.rating, 0) / totalCustomers).toFixed(1);

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
                  link.href === '/admin/crm'
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
            <h1 className="text-xl font-bold">Customer Management (CRM)</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Customers</p>
                  <p className="text-2xl font-bold">{totalCustomers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Avg Bookings</p>
                  <p className="text-2xl font-bold">{avgBookings}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Avg Rating</p>
                  <p className="text-2xl font-bold">{avgRating}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                <UserPlus className="w-4 h-4" />
                Add Customer
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Customers Table */}
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
                        Customer {sortBy === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium">Contact</th>
                    <th className="px-4 py-4 font-medium">Location</th>
                    <th className="px-4 py-4 font-medium cursor-pointer hover:text-gray-700" onClick={() => handleSort('totalBookings')}>
                      <div className="flex items-center gap-1">
                        Bookings {sortBy === 'totalBookings' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium cursor-pointer hover:text-gray-700" onClick={() => handleSort('totalSpent')}>
                      <div className="flex items-center gap-1">
                        Revenue {sortBy === 'totalSpent' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                      </div>
                    </th>
                    <th className="px-4 py-4 font-medium">Rating</th>
                    <th className="px-4 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium">{customer.id}</td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">Since {customer.joinDate}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-3 h-3 text-gray-400" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {customer.suburb}
                        </div>
                      </td>
                      <td className="px-4 py-4">{customer.totalBookings}</td>
                      <td className="px-4 py-4 font-semibold">${customer.totalSpent.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{customer.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleViewDetails(customer.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-red-100 rounded text-red-500" title="Delete">
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
        </main>
      </div>

      {/* Customer Details Modal */}
      {showDetails && selectedCustomerData && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-lg font-bold">Customer Details</h3>
              <button onClick={() => setShowDetails(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Customer Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedCustomerData.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold">{selectedCustomerData.name}</h4>
                  <p className="text-gray-500">{selectedCustomerData.id}</p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{selectedCustomerData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{selectedCustomerData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{selectedCustomerData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>Rating: {selectedCustomerData.rating}/5</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <p className="text-xl font-bold">{selectedCustomerData.totalBookings}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-xl font-bold">${selectedCustomerData.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Last Booking</p>
                  <p className="text-xl font-bold">{selectedCustomerData.lastBooking}</p>
                </div>
              </div>

              {/* Notes */}
              {selectedCustomerData.notes && (
                <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800"><strong>Notes:</strong> {selectedCustomerData.notes}</p>
                </div>
              )}

              {/* Booking History */}
              <h5 className="font-semibold mb-3">Booking History</h5>
              {customerBookings.length > 0 ? (
                <div className="space-y-2">
                  {customerBookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${booking.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[booking.status]}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No booking history available</p>
              )}
            </div>

            <div className="p-6 border-t flex gap-3 justify-end sticky bottom-0 bg-white">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Customer
              </button>
              <Link href="/admin/bookings" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                New Booking
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
