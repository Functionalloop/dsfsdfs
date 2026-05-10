import React, { useState, useEffect } from 'react';
import { 
  Search, ListFilter, SlidersHorizontal, ArrowUpDown, 
  MoreVertical, Calendar, ArrowRight, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Itinerary {
  id: number;
  title: string;
  status: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  description?: string;
  imageUrl: string;
  members?: string[];
  badge?: string;
  badgeType?: string;
  daysAway?: string;
  tag?: string;
}

const mockItineraries: Itinerary[] = [
  {
    id: 1,
    title: 'Summer in Kyoto',
    status: 'Ongoing',
    startDate: 'Jul 15, 2026',
    endDate: 'Jul 28, 2026',
    description: 'Exploring temples, traditional tea houses, and the bamboo forest in Arashiyama.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
    members: ['A', 'J'],
    badge: 'Day 3 of 14',
  },
  {
    id: 2,
    title: 'Swiss Alps Hiking',
    status: 'Upcoming',
    startDate: 'Sep 05, 2026',
    endDate: 'Sep 12, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop',
    daysAway: '42 Days Away',
    tag: 'Adventure',
  },
  {
    id: 3,
    title: 'Weekend in New York',
    status: 'Completed',
    date: 'Dec 10 - Dec 12, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop',
  }
];

interface GroupedItineraries {
  ongoing: Itinerary[];
  upcoming: Itinerary[];
  completed: Itinerary[];
}

export default function Itineraries() {
  const [data, setData] = useState<GroupedItineraries>({ ongoing: [], upcoming: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        // Fetch from Firebase
        const q = query(
          collection(db, 'itineraries'),
          where('userId', '==', currentUser?.uid || 'anonymous')
        );
        const querySnapshot = await getDocs(q);
        const dbTrips: Itinerary[] = [];
        querySnapshot.forEach((doc) => {
          dbTrips.push({ id: doc.id as any, ...doc.data() } as Itinerary);
        });

        if (dbTrips.length === 0) {
          dbTrips.push(...mockItineraries);
        }

        const dbOngoing = dbTrips.filter(t => t.status === 'Ongoing');
        const dbUpcoming = dbTrips.filter(t => t.status === 'Upcoming');
        const dbCompleted = dbTrips.filter(t => t.status === 'Completed');

        setData({
          ongoing: dbOngoing,
          upcoming: dbUpcoming,
          completed: dbCompleted
        });
      } catch (err) {
        console.error('Failed to fetch itineraries:', err);
        const dbOngoing = mockItineraries.filter(t => t.status === 'Ongoing');
        const dbUpcoming = mockItineraries.filter(t => t.status === 'Upcoming');
        const dbCompleted = mockItineraries.filter(t => t.status === 'Completed');
        setData({
          ongoing: dbOngoing,
          upcoming: dbUpcoming,
          completed: dbCompleted
        });
      } finally {
        setLoading(false);
      }
    };
    fetchItineraries();
  }, [currentUser]);

  const filterBySearch = (items: Itinerary[]) =>
    items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return (
      <main className="flex-grow flex items-center justify-center py-32">
        <Loader2 className="w-10 h-10 text-[#65a30d] animate-spin" />
      </main>
    );
  }

  return (
    <>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col gap-12">
        {/* Search and Filter Bar */}
        <section className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Trips</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-200/60">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search trips..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#65a30d]/50 transition-colors text-gray-600 font-medium whitespace-nowrap">
                <ListFilter className="w-4 h-4" />
                Group by
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#65a30d]/50 transition-colors text-gray-600 font-medium whitespace-nowrap">
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#65a30d]/50 transition-colors text-gray-600 font-medium whitespace-nowrap">
                <ArrowUpDown className="w-4 h-4" />
                Sort by
              </button>
            </div>
          </div>
        </section>

        {/* Ongoing */}
        {filterBySearch(data.ongoing).length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#65a30d] rounded-full"></span>
              Ongoing
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterBySearch(data.ongoing).map((trip) => (
                <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col border border-gray-100">
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={trip.imageUrl} 
                      alt={trip.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#65a30d] animate-pulse"></span> 
                      {trip.badge || 'Active'}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">{trip.title}</h3>
                      <button className="text-gray-400 hover:text-[#65a30d] transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mt-1">
                      <Calendar className="w-4 h-4" />
                      {trip.startDate} - {trip.endDate}
                    </div>
                    
                    {trip.description && (
                      <p className="text-[15px] text-gray-600 mt-2 line-clamp-2">{trip.description}</p>
                    )}
                    
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100">
                      <div className="flex -space-x-2">
                        {(trip.members || []).map((m, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold border-2 border-white">{m}</div>
                        ))}
                      </div>
                      <Link to="/itinerary-view" className="text-sm font-semibold text-[#65a30d] hover:text-[#4d7c0f] transition-colors flex items-center gap-1">
                        View Itinerary <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Up-coming */}
        {filterBySearch(data.upcoming).length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Up-coming
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterBySearch(data.upcoming).map((trip) => (
                <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col border border-gray-100">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={trip.imageUrl} 
                      alt={trip.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    {trip.daysAway && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#4d7c0f] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {trip.daysAway}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{trip.title}</h3>
                      <button className="text-gray-400 hover:text-[#65a30d] transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mt-1">
                      <Calendar className="w-4 h-4" />
                      {trip.startDate} - {trip.endDate}
                    </div>
                    
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md font-semibold">{trip.tag}</span>
                      <button className="text-sm font-semibold text-gray-500 hover:text-[#65a30d] transition-colors">
                        Edit Trip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Completed */}
        {filterBySearch(data.completed).length > 0 && (
          <section className="flex flex-col gap-6 opacity-80">
            <h2 className="text-2xl font-semibold text-gray-500 flex items-center gap-3">
              <span className="w-2 h-8 bg-gray-300 rounded-full"></span>
              Completed
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filterBySearch(data.completed).map((trip) => (
                <div key={trip.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col grayscale-[0.3] hover:grayscale-0 transition-all duration-300">
                  <div className="h-36 overflow-hidden bg-gray-100">
                    <img 
                      src={trip.imageUrl} 
                      alt={trip.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-base font-bold text-gray-900 truncate">{trip.title}</h3>
                    <div className="text-xs text-gray-500 font-medium">{trip.date}</div>
                    <button className="text-[#65a30d] text-xs font-bold mt-2 self-start hover:underline">
                      View Memories
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
      
      </>
  );
}
