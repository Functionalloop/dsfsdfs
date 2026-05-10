import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Users, Map, Mountain, BarChart3,
  Bookmark, CalendarCheck, Settings, LogOut, ChevronLeft,
  ChevronRight, Bell, Search, PlaneTakeoff, Menu, X
} from 'lucide-react';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/users', icon: Users, label: 'User Management' },
  { path: '/admin/trips', icon: PlaneTakeoff, label: 'Trip Management' },
  { path: '/admin/activities', icon: Mountain, label: 'Activities' },
  { path: '/admin/destinations', icon: Map, label: 'Destinations' },
  { path: '/admin/bookings', icon: CalendarCheck, label: 'Bookings' },
  { path: '/admin/bookmarks', icon: Bookmark, label: 'Bookmarks' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="px-5 py-6 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
            <PlaneTakeoff className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">Traveloop</h1>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">Admin Panel</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-7 h-7 rounded-md bg-slate-700/50 items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path, item.exact);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="px-3 py-4 border-t border-slate-700/50">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all mb-1"
        >
          <Map className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Back to Site</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-slate-900 border-r border-slate-800 fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10">
            <div className="absolute top-4 right-4">
              <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
        {/* Top Bar */}
        <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center relative">
              <Search className="absolute left-3 text-slate-500 w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-72 h-9 pl-10 pr-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
            </button>
            <div className="h-8 w-px bg-slate-700" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
                {currentUser?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-200">{currentUser?.email || 'Admin'}</p>
                <p className="text-[11px] text-slate-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
