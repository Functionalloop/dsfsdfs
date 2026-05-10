import React, { useState } from 'react';
import { 
  List, Calendar as CalendarIcon, Search, ChevronDown, Filter, ArrowUpDown,
  MapPin, PlaneLanding, Bed, Building, ArrowDown, Mountain, Utensils,
  Clock, FileText, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

type ViewMode = 'list' | 'calendar';

// Mock data for both views
const itineraryData = {
  title: 'Tokyo Exploration',
  city: 'Tokyo, Japan',
  days: [
    {
      day: 1,
      date: '2025-10-12',
      dateLabel: 'Oct 12, Sun',
      activities: [
        { title: 'Arrival & Airport Transfer', desc: 'Private transfer to downtown hotel.', type: 'Transport', time: '10:00 AM', cost: 45, icon: PlaneLanding, iconBg: 'bg-blue-100 text-blue-600' },
        { title: 'Hotel Check-in', desc: 'Grand Plaza Hotel, City Center.', type: 'Accommodation', time: '1:00 PM', cost: 0, icon: Bed, iconBg: 'bg-gray-200 text-gray-500' },
        { title: 'City Museum Tour', desc: 'Guided walking tour of historical artifacts.', type: 'Activity', time: '3:30 PM', cost: 25, icon: Building, iconBg: 'bg-[#ecfccb]/60 text-[#65a30d]' },
      ]
    },
    {
      day: 2,
      date: '2025-10-13',
      dateLabel: 'Oct 13, Mon',
      activities: [
        { title: 'Mountain Hiking Trail', desc: 'Guided half-day hike through the national park.', type: 'Adventure', time: '8:00 AM', cost: 15, icon: Mountain, iconBg: 'bg-[#ecfccb]/60 text-[#65a30d]' },
        { title: 'Lunch at Peak View', desc: 'Local cuisine with a scenic mountain view.', type: 'Dining', time: '1:30 PM', cost: 35, icon: Utensils, iconBg: 'bg-gray-200 text-gray-500' },
      ]
    },
    {
      day: 3,
      date: '2025-10-14',
      dateLabel: 'Oct 14, Tue',
      activities: [
        { title: 'Senso-ji Temple', desc: 'Visit Tokyo\'s oldest Buddhist temple.', type: 'Activity', time: '9:00 AM', cost: 0, icon: Building, iconBg: 'bg-[#ecfccb]/60 text-[#65a30d]' },
        { title: 'Ramen Street Lunch', desc: 'Explore Tokyo Station\'s ramen alley.', type: 'Dining', time: '12:30 PM', cost: 20, icon: Utensils, iconBg: 'bg-amber-100 text-amber-600' },
      ]
    },
    {
      day: 4,
      date: '2025-10-15',
      dateLabel: 'Oct 15, Wed',
      activities: [
        { title: 'Shibuya & Harajuku', desc: 'Shopping and street fashion exploration.', type: 'Activity', time: '10:00 AM', cost: 50, icon: Building, iconBg: 'bg-[#ecfccb]/60 text-[#65a30d]' },
      ]
    },
    {
      day: 5,
      date: '2025-10-16',
      dateLabel: 'Oct 16, Thu',
      activities: [
        { title: 'Day Trip to Kamakura', desc: 'Great Buddha and bamboo groves.', type: 'Adventure', time: '8:30 AM', cost: 30, icon: Mountain, iconBg: 'bg-[#ecfccb]/60 text-[#65a30d]' },
      ]
    },
  ]
};

// Build a week calendar grid for the calendar view
const getCalendarWeeks = () => {
  // Oct 2025: starts on Wednesday
  const daysInMonth = 31;
  const startDayOfWeek = 3; // Wednesday (0=Sun)
  const weeks: (number | null)[][] = [];
  let current: (number | null)[] = Array(startDayOfWeek).fill(null);
  
  for (let d = 1; d <= daysInMonth; d++) {
    current.push(d);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }
  return weeks;
};

const calendarWeeks = getCalendarWeeks();
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Map date numbers to activities
const dateActivityMap: Record<number, typeof itineraryData.days[0]> = {};
itineraryData.days.forEach(d => {
  const dayNum = parseInt(d.date.split('-')[2]);
  dateActivityMap[dayNum] = d;
});

export default function ItineraryView() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <>
      <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-4 md:px-16 py-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Itinerary: {itineraryData.title}</h1>
          
          <div className="flex bg-gray-100 p-1 rounded-lg self-center sm:self-auto shrink-0">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md font-semibold text-sm transition-all ${
                viewMode === 'list' ? 'bg-white text-[#65a30d] shadow-sm' : 'text-gray-500 hover:bg-black/5'
              }`}
            >
              <List className="w-5 h-5" /> List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md font-semibold text-sm transition-all ${
                viewMode === 'calendar' ? 'bg-white text-[#65a30d] shadow-sm' : 'text-gray-500 hover:bg-black/5'
              }`}
            >
              <CalendarIcon className="w-5 h-5" /> Calendar
            </button>
            <Link to="/packing" className="flex items-center gap-2 px-4 py-1.5 rounded-md text-gray-500 hover:bg-black/5 transition-colors font-semibold text-sm">
              <List className="w-5 h-5" /> Checklist
            </Link>
            <Link to="/notes" className="flex items-center gap-2 px-4 py-1.5 rounded-md text-gray-500 hover:bg-black/5 transition-colors font-semibold text-sm">
              <FileText className="w-5 h-5" /> Notes
            </Link>
            <Link to="/timeline" className="flex items-center gap-2 px-4 py-1.5 rounded-md text-gray-500 hover:bg-black/5 transition-colors font-semibold text-sm">
              <CalendarIcon className="w-5 h-5" /> Timeline
            </Link>
            <Link to="/invoice" className="flex items-center gap-2 px-4 py-1.5 rounded-md text-gray-500 hover:bg-black/5 transition-colors font-semibold text-sm">
              <List className="w-5 h-5" /> Budget
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search itinerary..." 
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 bg-white focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] text-base transition-colors outline-none placeholder:text-gray-500"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto shrink-0">
              <button className="h-12 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2 font-semibold text-sm">
                Group by <ChevronDown className="w-5 h-5" />
              </button>
              <button className="h-12 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2 font-semibold text-sm">
                Filter <Filter className="w-5 h-5" />
              </button>
              <Link to="/shared/demo" className="h-12 px-4 py-2 border border-[#65a30d] rounded-lg bg-[#65a30d]/5 text-[#4d7c0f] hover:bg-[#65a30d]/10 transition-colors flex items-center gap-2 font-semibold text-sm">
                <Share2 className="w-4 h-4" /> Share
              </Link>
            </div>
          </div>
        </div>

        {/* ===================== LIST VIEW ===================== */}
        {viewMode === 'list' && (
          <div className="flex flex-col gap-8 w-full bg-gray-50/50 p-4 rounded-xl">
            <div className="flex items-center gap-4 py-4">
              <MapPin className="text-[#65a30d] w-6 h-6" />
              <h2 className="text-2xl font-semibold text-gray-900">{itineraryData.city}</h2>
            </div>

            {/* Column Headers */}
            <div className="hidden md:grid grid-cols-[100px_1fr_200px] gap-6 px-6 pb-2 border-b border-gray-200 text-sm font-semibold text-gray-500">
              <div>Day</div>
              <div>Physical Activity</div>
              <div className="text-right">Expense</div>
            </div>

            {itineraryData.days.map((day) => (
              <React.Fragment key={day.day}>
                <div className="flex flex-col md:grid md:grid-cols-[100px_1fr_200px] gap-6 items-start mb-8">
                  {/* Day Label */}
                  <div className="w-full md:w-auto pt-2">
                    <div className="inline-flex items-center justify-center bg-gray-200/50 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm border border-gray-300">
                      <span>Day {String(day.day).padStart(2, '0')}</span>
                    </div>
                  </div>
                  
                  {/* Activities */}
                  <div className="flex flex-col w-full gap-2 relative">
                    {day.activities.map((act, i) => (
                      <React.Fragment key={i}>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4 w-full">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${act.iconBg}`}>
                              <act.icon className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col w-full">
                              <div className="flex justify-between items-start w-full gap-2">
                                <h3 className="font-semibold text-lg leading-snug text-gray-900">{act.title}</h3>
                                <div className="md:hidden font-bold text-base text-[#4d7c0f] shrink-0">
                                  ${act.cost.toFixed(2)}
                                </div>
                              </div>
                              <p className="text-base text-gray-500 mt-1">{act.desc}</p>
                              <div className="flex gap-2 mt-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                                  act.type === 'Activity' || act.type === 'Adventure' ? 'bg-[#ecfccb] text-[#4d7c0f]' : 'bg-gray-100 text-gray-600'
                                }`}>{act.type}</span>
                                <span className="inline-flex px-2 py-1 bg-gray-100/80 text-gray-500 text-xs font-semibold rounded items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" /> {act.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {i < day.activities.length - 1 && (
                          <div className="justify-center py-2 text-gray-300 hidden md:flex">
                            <ArrowDown className="w-6 h-6" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Expenses Column */}
                  <div className="hidden md:flex flex-col w-full gap-2 pt-0.5">
                    {day.activities.map((act, i) => (
                      <React.Fragment key={i}>
                        <div className={`h-[80px] bg-white border border-gray-200 rounded-lg flex items-center justify-end px-4 shadow-sm ${act.cost === 0 ? 'opacity-50' : ''}`}>
                          <span className={`font-bold text-lg ${act.cost > 0 ? 'text-[#4d7c0f]' : 'text-gray-500'}`}>
                            ${act.cost.toFixed(2)}
                          </span>
                        </div>
                        {i < day.activities.length - 1 && <div className="h-10" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-200 my-4 w-full" />
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ===================== CALENDAR VIEW ===================== */}
        {viewMode === 'calendar' && (
          <div className="w-full space-y-6">
            {/* Calendar Month Header */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">October 2025</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-[#65a30d]" />
                  <span>{itineraryData.city}</span>
                </div>
              </div>

              {/* Day Name Headers */}
              <div className="grid grid-cols-7 border-b border-gray-100">
                {dayNames.map(d => (
                  <div key={d} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              {calendarWeeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 border-b border-gray-50 last:border-b-0">
                  {week.map((dayNum, di) => {
                    const dayData = dayNum ? dateActivityMap[dayNum] : null;
                    const isTrip = !!dayData;

                    return (
                      <div 
                        key={di} 
                        className={`min-h-[100px] p-2 border-r border-gray-50 last:border-r-0 ${
                          isTrip ? 'bg-[#ecfccb]/20' : dayNum ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        {dayNum && (
                          <>
                            <span className={`text-sm font-semibold ${
                              isTrip ? 'text-[#4d7c0f]' : 'text-gray-700'
                            }`}>
                              {dayNum}
                            </span>
                            {dayData && (
                              <div className="mt-1.5 space-y-1">
                                {dayData.activities.map((act, ai) => (
                                  <div 
                                    key={ai} 
                                    className={`text-[10px] px-1.5 py-1 rounded truncate font-medium ${
                                      act.type === 'Activity' || act.type === 'Adventure'
                                        ? 'bg-[#65a30d]/10 text-[#4d7c0f]'
                                        : act.type === 'Transport'
                                          ? 'bg-blue-50 text-blue-600'
                                          : act.type === 'Dining'
                                            ? 'bg-amber-50 text-amber-700'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}
                                    title={`${act.time} — ${act.title}`}
                                  >
                                    {act.title}
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 px-2">
              <span className="text-xs text-gray-500 font-medium">Legend:</span>
              {[
                { label: 'Activity', color: 'bg-[#65a30d]/10 text-[#4d7c0f]' },
                { label: 'Transport', color: 'bg-blue-50 text-blue-600' },
                { label: 'Dining', color: 'bg-amber-50 text-amber-700' },
                { label: 'Accommodation', color: 'bg-gray-100 text-gray-600' },
              ].map(l => (
                <span key={l.label} className={`text-[11px] px-2 py-1 rounded font-medium ${l.color}`}>{l.label}</span>
              ))}
            </div>
          </div>
        )}

      </main>
    </>
  );
}
