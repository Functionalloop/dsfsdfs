import React, { useState } from 'react';
import {
  Search, MapPin, Eye,
  ChevronLeft, ChevronRight, Download
} from 'lucide-react';

interface Booking {
  id: string;
  user: string;
  email: string;
  trip: string;
  destination: string;
  date: string;
  amount: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  avatar: string;
}

const mockBookings: Booking[] = [
  { id: 'BK-001', user: 'Sarah Chen', email: 'sarah@email.com', trip: 'Romantic Paris Getaway', destination: 'Paris', date: '2026-05-08', amount: '$2,500', status: 'confirmed', avatar: 'SC' },
  { id: 'BK-002', user: 'Alex Morgan', email: 'alex@email.com', trip: 'Tokyo Cultural Immersion', destination: 'Tokyo', date: '2026-05-07', amount: '$3,800', status: 'completed', avatar: 'AM' },
  { id: 'BK-003', user: 'James Wilson', email: 'james@email.com', trip: 'Bali Wellness Retreat', destination: 'Bali', date: '2026-05-06', amount: '$1,800', status: 'pending', avatar: 'JW' },
  { id: 'BK-004', user: 'Maria Garcia', email: 'maria@email.com', trip: 'Rome Ancient Tour', destination: 'Rome', date: '2026-05-05', amount: '$2,200', status: 'confirmed', avatar: 'MG' },
  { id: 'BK-005', user: 'David Lee', email: 'david@email.com', trip: 'NYC City Explorer', destination: 'New York', date: '2026-05-04', amount: '$2,800', status: 'cancelled', avatar: 'DL' },
  { id: 'BK-006', user: 'Emma Brown', email: 'emma@email.com', trip: 'Santorini Romance', destination: 'Santorini', date: '2026-05-03', amount: '$3,200', status: 'confirmed', avatar: 'EB' },
  { id: 'BK-007', user: 'Raj Patel', email: 'raj@email.com', trip: 'Swiss Alps Adventure', destination: 'Switzerland', date: '2026-05-02', amount: '$4,100', status: 'completed', avatar: 'RP' },
  { id: 'BK-008', user: 'Lisa Tanaka', email: 'lisa@email.com', trip: 'Maldives Paradise', destination: 'Maldives', date: '2026-05-01', amount: '$5,500', status: 'pending', avatar: 'LT' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function AdminBookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockBookings.filter(b => {
    const matchesSearch = b.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.trip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockBookings.length,
    revenue: '$25,900',
    confirmed: mockBookings.filter(b => b.status === 'confirmed').length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Booking History</h1>
          <p className="text-slate-400 mt-1">Track and manage all platform bookings.</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-all flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.total, color: 'text-cyan-400' },
          { label: 'Total Revenue', value: stats.revenue, color: 'text-emerald-400' },
          { label: 'Confirmed', value: stats.confirmed, color: 'text-violet-400' },
          { label: 'Pending', value: stats.pending, color: 'text-amber-400' },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input type="text" placeholder="Search bookings..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 h-10 pl-10 pr-4 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 outline-none transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                statusFilter === s ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Booking ID</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Trip</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-cyan-400">{b.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-cyan-400">{b.avatar}</div>
                      <div>
                        <p className="text-sm font-medium text-white">{b.user}</p>
                        <p className="text-xs text-slate-500">{b.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm text-slate-300">{b.trip}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{b.destination}</p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-sm text-slate-400">
                    {new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{b.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${statusColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-md text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-sm text-slate-500">Showing {filtered.length} of {mockBookings.length} bookings</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">1</button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium text-slate-500 hover:text-white hover:bg-slate-800">2</button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
