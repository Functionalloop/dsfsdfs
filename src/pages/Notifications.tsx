import React, { useState } from 'react';
import { Check, CheckCircle2, PlaneTakeoff, ShieldCheck, CalendarCheck, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Trips', 'Community', 'System'];

  return (
    <>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-16 py-12 md:py-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated on your upcoming adventures and community activity.</p>
          </div>
          <button className="text-[#4d7c0f] font-semibold text-sm hover:text-[#3f6212] transition-colors flex items-center gap-2 self-start md:self-auto">
            <Check className="w-5 h-5" />
            Mark all as read
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 mb-8 pb-1 gap-6 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-semibold text-sm pb-2 px-1 whitespace-nowrap transition-colors ${
                activeTab === tab 
                  ? 'text-[#4d7c0f] border-b-2 border-[#4d7c0f]' 
                  : 'text-gray-500 hover:text-[#4d7c0f]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex flex-col gap-4">
          
          {/* Unread Notification 1 (Trip) */}
          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200 relative group">
            <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-[#65a30d]"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ecfccb] flex items-center justify-center flex-shrink-0 text-[#4d7c0f]">
                <PlaneTakeoff className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-base text-gray-900 pr-6">Trip Update: Paris & Rome Adventure</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-2">Your flight out of JFK has a gate change to Terminal 4, Gate B22. Departure time remains unchanged.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400">2 minutes ago</span>
                  <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-semibold text-[#4d7c0f] border border-[#4d7c0f] px-3 py-1.5 rounded hover:bg-[#ecfccb] transition-colors">View Trip</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unread Notification 2 (Community) */}
          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200 relative group">
            <div className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-[#65a30d]"></div>
            <div className="flex items-start gap-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" 
                alt="Sarah Jenkins" 
                className="w-12 h-12 rounded-full object-cover border border-gray-100 flex-shrink-0"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-base text-gray-900 pr-6">Sarah Jenkins liked your itinerary</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-2">"Hidden Gems of Kyoto: A 5-Day Guide" received a like.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400">3 hours ago</span>
                  <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-semibold text-[#4d7c0f] hover:bg-gray-50 px-3 py-1.5 rounded transition-colors">View Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Read Notification (System) */}
          <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-200 relative group hover:bg-white transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-base text-gray-900 pr-6">System Update Completed</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-2">We've updated our privacy policy and terms of service. No immediate action is required on your part.</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400">Yesterday</span>
                  <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-semibold text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded transition-colors">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Read Notification (Trip) */}
          <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-200 relative group hover:bg-white transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-base text-gray-900 pr-6">Booking Confirmed: The Alpine Lodge</h3>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-2">Your reservation for 3 nights (Oct 12 - Oct 15) is fully confirmed. Pack warm!</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400">Oct 2, 2023</span>
                  <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-semibold text-[#4d7c0f] border border-[#4d7c0f] px-3 py-1.5 rounded hover:bg-[#ecfccb] transition-colors">View Booking</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </main>
      
      </>
  );
}
