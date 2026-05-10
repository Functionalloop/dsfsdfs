import React, { useState } from 'react';
import {
  TrendingUp, Users, DollarSign, PlaneTakeoff,
  ArrowUpRight, ArrowDownRight, Globe, BarChart3,
  Activity
} from 'lucide-react';

const monthlyData = [
  { month: 'Jan', users: 1200, bookings: 340, revenue: 85000 },
  { month: 'Feb', users: 1400, bookings: 380, revenue: 92000 },
  { month: 'Mar', users: 1800, bookings: 520, revenue: 128000 },
  { month: 'Apr', users: 2100, bookings: 610, revenue: 152000 },
  { month: 'May', users: 2600, bookings: 780, revenue: 198000 },
  { month: 'Jun', users: 3100, bookings: 920, revenue: 235000 },
  { month: 'Jul', users: 3500, bookings: 1050, revenue: 268000 },
  { month: 'Aug', users: 3800, bookings: 1120, revenue: 285000 },
  { month: 'Sep', users: 3400, bookings: 980, revenue: 248000 },
  { month: 'Oct', users: 3200, bookings: 900, revenue: 228000 },
  { month: 'Nov', users: 2900, bookings: 820, revenue: 205000 },
  { month: 'Dec', users: 3600, bookings: 1080, revenue: 275000 },
];

const regionData = [
  { region: 'Europe', percentage: 35, color: '#06b6d4', bookings: 4200 },
  { region: 'Asia Pacific', percentage: 28, color: '#8b5cf6', bookings: 3360 },
  { region: 'Americas', percentage: 22, color: '#f59e0b', bookings: 2640 },
  { region: 'Middle East', percentage: 10, color: '#10b981', bookings: 1200 },
  { region: 'Africa', percentage: 5, color: '#ef4444', bookings: 600 },
];

const topPerformers = [
  { name: 'Paris Getaway', revenue: '$285K', growth: '+18%', bookings: 1248 },
  { name: 'Tokyo Cultural', revenue: '$242K', growth: '+32%', bookings: 1102 },
  { name: 'Bali Retreat', revenue: '$178K', growth: '+12%', bookings: 986 },
  { name: 'Rome Ancient', revenue: '$156K', growth: '+8%', bookings: 874 },
  { name: 'NYC Explorer', revenue: '$134K', growth: '+5%', bookings: 762 },
];

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('1Y');
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Analytics & Performance</h1>
          <p className="text-slate-400 mt-1">Comprehensive insights into platform performance.</p>
        </div>
        <div className="flex gap-2">
          {['7D', '1M', '3M', '1Y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}>{p}</button>
          ))}
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$2.4M', change: '+24%', up: true, icon: DollarSign, color: 'emerald' },
          { label: 'Total Bookings', value: '9,500', change: '+18%', up: true, icon: PlaneTakeoff, color: 'cyan' },
          { label: 'Avg. Booking Value', value: '$252', change: '+6%', up: true, icon: TrendingUp, color: 'violet' },
          { label: 'Active Users', value: '24.5K', change: '-2.1%', up: false, icon: Users, color: 'amber' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                kpi.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                kpi.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                kpi.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                'bg-amber-500/10 text-amber-400'
              }`}>
                <kpi.icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {kpi.change} {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </span>
            </div>
            <p className="text-xs text-slate-500">{kpi.label}</p>
            <p className="text-xl font-bold text-white mt-0.5">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Bar Chart */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" /> Monthly Revenue
          </h3>
          <p className="text-sm text-slate-500">FY 2026</p>
        </div>
        <div className="h-64 flex items-end gap-2 lg:gap-3 px-2">
          {monthlyData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] text-slate-500 font-medium">${(d.revenue / 1000).toFixed(0)}K</span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 transition-all cursor-pointer relative group"
                style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-3 py-2 rounded-lg transition-opacity whitespace-nowrap z-10 shadow-lg">
                  <p className="font-semibold">{d.month} 2026</p>
                  <p className="text-slate-300">{d.bookings} bookings</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution (Pie Chart) */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-violet-400" /> Regional Distribution
          </h3>
          <div className="flex items-center gap-8">
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="20" />
                {(() => {
                  let offset = 0;
                  return regionData.map((r) => {
                    const dashArray = (r.percentage / 100) * 251.33;
                    const el = (
                      <circle key={r.region} cx="50" cy="50" r="40" fill="none" stroke={r.color} strokeWidth="20"
                        strokeDasharray={`${dashArray} ${251.33 - dashArray}`} strokeDashoffset={-offset} />
                    );
                    offset += dashArray;
                    return el;
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">12K</span>
                <span className="text-[10px] text-slate-400">Bookings</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              {regionData.map(r => (
                <div key={r.region} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300">{r.region}</span>
                      <span className="text-xs font-semibold text-white">{r.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${r.percentage}%`, backgroundColor: r.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-emerald-400" /> Top Performing Trips
          </h3>
          <div className="space-y-4">
            {topPerformers.map((trip, i) => (
              <div key={trip.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-all">
                <span className={`text-lg font-bold w-6 text-center ${
                  i === 0 ? 'text-amber-400' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-amber-700' : 'text-slate-600'
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{trip.name}</p>
                  <p className="text-xs text-slate-500">{trip.bookings.toLocaleString()} bookings</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{trip.revenue}</p>
                  <p className="text-xs text-emerald-400 font-semibold">{trip.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Trends Line Chart */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-cyan-400" /> Booking & User Trends
        </h3>
        <div className="h-52 relative">
          <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trendGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="trendGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 80, 120, 160].map(y => (
              <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#1e293b" strokeWidth="1" />
            ))}
            {/* Users trend */}
            <path d="M0,170 L55,155 L110,130 L165,115 L220,90 L275,65 L330,50 L385,40 L440,55 L495,65 L550,75 L600,45" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0,170 L55,155 L110,130 L165,115 L220,90 L275,65 L330,50 L385,40 L440,55 L495,65 L550,75 L600,45 L600,200 L0,200 Z" fill="url(#trendGrad1)" />
            {/* Bookings trend */}
            <path d="M0,180 L55,170 L110,150 L165,140 L220,120 L275,100 L330,85 L385,78 L440,95 L495,105 L550,112 L600,82" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" />
          </svg>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            {monthlyData.map(d => <span key={d.month}>{d.month}</span>)}
          </div>
        </div>
        <div className="flex gap-6 mt-4 justify-center">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-0.5 bg-cyan-400 rounded" />
            <span className="text-slate-400">Users</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-0.5 bg-violet-500 rounded border-dashed" />
            <span className="text-slate-400">Bookings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
