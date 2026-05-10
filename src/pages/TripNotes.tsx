import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Plus, Image as ImageIcon, FileText } from 'lucide-react';

const notesList = [
  {
    id: 1,
    title: "Hotel check-in details - Rome stop",
    content: "Check in after 2pm, room 302, breakfast included (7-10am). Ask for a late checkout on the final day. Need to confirm the airport shuttle timing with the front desk.",
    date: "Day 3: June 14 2025",
    hasImage: true,
    hasFile: true,
  },
  {
    id: 2,
    title: "Colosseum Tour Confirmation",
    content: "Tickets booked for 10:00 AM. Meet guide at the Arch of Constantine. Bring water and wear comfortable shoes. Entry code is XT-9482.",
    date: "Day 4: June 15 2025",
    hasImage: false,
    hasFile: true,
  },
  {
    id: 3,
    title: "Restaurant recommendations from Sarah",
    content: "Trattoria Da Enzo for dinner (must reserve!), Gelateria dei Gracchi for afternoon treats near the Vatican. Avoid places with picture menus.",
    date: "Pre-trip Planning",
    hasImage: false,
    hasFile: false,
  },
  {
    id: 4,
    title: "Train tickets Paris to Rome",
    content: "TGV Lyria departing Gare de Lyon at 07:15. Carriage 4, Seats 51 and 52. E-tickets downloaded to phone.",
    date: "Day 3: June 14 2025",
    hasImage: false,
    hasFile: true,
  }
];

export default function TripNotes() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <>
      
      <main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 gap-8">
        
        {/* Header & Search */}
        <div className="w-full max-w-3xl flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Trip Notes</h1>
          <p className="text-lg text-gray-600 mb-2">Capture your thoughts, details, and memories for Trip: Paris & Rome Adventure.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/80 p-4 rounded-xl border border-gray-200">
            <div className="relative w-full sm:w-2/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search notes..." 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] bg-white text-base outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-semibold text-sm bg-white">
                <Filter className="w-5 h-5" /> Filter
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-semibold text-sm bg-white">
                <ArrowUpDown className="w-5 h-5" /> Sort
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Add Note Action */}
        <div className="w-full max-w-3xl flex justify-between items-center">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
            {['All', 'By Day', 'By Stop'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
                  activeFilter === filter 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-200/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-[#65a30d] text-white hover:bg-[#4d7c0f] font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm">
            <Plus className="w-5 h-5" /> Add Note
          </button>
        </div>

        {/* Notes List */}
        <div className="w-full max-w-3xl flex flex-col gap-4">
          {notesList.map((note) => (
            <div key={note.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between cursor-pointer group">
              <div className="flex-grow flex flex-col gap-1.5 pr-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#65a30d] transition-colors leading-snug">
                  {note.title}
                </h3>
                <p className="text-base text-gray-600 line-clamp-2">
                  {note.content}
                </p>
                <span className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">
                  {note.date}
                </span>
              </div>
              <div className="flex gap-3 text-gray-500 shrink-0 mt-3 sm:mt-0">
                {note.hasImage && (
                  <div className="p-2.5 bg-gray-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                )}
                {note.hasFile && (
                  <div className="p-2.5 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </main>
      
      </>
  );
}
