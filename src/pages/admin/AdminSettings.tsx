import React, { useState } from 'react';
import { Save, Globe, Bell, Shield } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Traveloop',
    siteUrl: 'https://traveloop.com',
    currency: 'USD',
    timezone: 'UTC',
    language: 'English',
    emailNotifications: true,
    bookingAlerts: true,
    weeklyReport: true,
    newUserAlert: false,
    maintenanceMode: false,
    registrationOpen: true,
    twoFactorAuth: false,
    maxBookingsPerUser: '50',
    sessionTimeout: '30',
  });

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-all ${value ? 'bg-cyan-500' : 'bg-slate-700'}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all ${value ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Platform Settings</h1>
        <p className="text-slate-400 mt-1">Configure your platform preferences and security settings.</p>
      </div>

      {/* General Settings */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-cyan-400" /> General Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Site Name</label>
            <input type="text" value={settings.siteName}
              onChange={e => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full h-10 px-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:border-cyan-500/50 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Site URL</label>
            <input type="text" value={settings.siteUrl}
              onChange={e => setSettings({ ...settings, siteUrl: e.target.value })}
              className="w-full h-10 px-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:border-cyan-500/50 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Default Currency</label>
            <select value={settings.currency}
              onChange={e => setSettings({ ...settings, currency: e.target.value })}
              className="w-full h-10 px-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:border-cyan-500/50 outline-none transition-all">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Timezone</label>
            <select value={settings.timezone}
              onChange={e => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full h-10 px-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:border-cyan-500/50 outline-none transition-all">
              <option value="UTC">UTC (GMT+0)</option>
              <option value="EST">EST (GMT-5)</option>
              <option value="PST">PST (GMT-8)</option>
              <option value="IST">IST (GMT+5:30)</option>
              <option value="JST">JST (GMT+9)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Default Language</label>
            <select value={settings.language}
              onChange={e => setSettings({ ...settings, language: e.target.value })}
              className="w-full h-10 px-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:border-cyan-500/50 outline-none transition-all">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Japanese</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-violet-400" /> Notification Settings
        </h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive platform updates via email' },
            { key: 'bookingAlerts', label: 'Booking Alerts', desc: 'Get notified for every new booking' },
            { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive weekly analytics summary' },
            { key: 'newUserAlert', label: 'New User Alerts', desc: 'Get notified when a new user registers' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <Toggle
                value={(settings as any)[item.key]}
                onChange={() => setSettings({ ...settings, [item.key]: !(settings as any)[item.key] })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-emerald-400" /> Security & Access
        </h3>
        <div className="space-y-4">
          {[
            { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Temporarily disable public access to the platform' },
            { key: 'registrationOpen', label: 'Open Registration', desc: 'Allow new users to create accounts' },
            { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Require 2FA for admin accounts' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <Toggle
                value={(settings as any)[item.key]}
                onChange={() => setSettings({ ...settings, [item.key]: !(settings as any)[item.key] })}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 pt-5 border-t border-slate-800">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Max Bookings per User</label>
            <input type="number" value={settings.maxBookingsPerUser}
              onChange={e => setSettings({ ...settings, maxBookingsPerUser: e.target.value })}
              className="w-full h-10 px-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:border-cyan-500/50 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Session Timeout (min)</label>
            <input type="number" value={settings.sessionTimeout}
              onChange={e => setSettings({ ...settings, sessionTimeout: e.target.value })}
              className="w-full h-10 px-4 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 focus:border-cyan-500/50 outline-none transition-all" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-2">
        <button className="px-6 py-2.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-sm font-medium hover:bg-slate-700 transition-all">
          Reset to Defaults
        </button>
        <button className="px-6 py-2.5 rounded-lg bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
