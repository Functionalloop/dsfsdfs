import React, { useState, useEffect } from 'react';
import { 
  Search, ListFilter, SlidersHorizontal, ArrowUpDown, 
  MapPin, Star, Heart, Image as ImageIcon, Loader2
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Activity {
  id: number;
  title: string;
  rating: number;
  reviews: number;
  location: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ActivitySearch() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('Paragliding');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${API_URL}/api/activities`);
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const filtered = activities.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col gap-10">
        
        {/* Search header area */}
        <section className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Activity Search</h1>
          
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 font-medium"
              />
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-[#65a30d]/50 transition-colors text-gray-600 font-medium whitespace-nowrap shadow-sm">
                <ListFilter className="w-4 h-4" />
                Group by
              </button>
              <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-[#65a30d]/50 transition-colors text-gray-600 font-medium whitespace-nowrap shadow-sm">
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-[#65a30d]/50 transition-colors text-gray-600 font-medium whitespace-nowrap shadow-sm">
                <ArrowUpDown className="w-4 h-4" />
                Sort by
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-500 text-sm">Results for:</span>
            <span className="px-4 py-1.5 rounded-full border border-[#ecfccb] text-[#4d7c0f] bg-[#f7fee7] text-sm font-semibold">{searchQuery}</span>
          </div>
        </section>

        {/* Results List */}
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900">Results ({filtered.length})</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-[#65a30d] animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-medium">No activities found</p>
              <p className="text-sm mt-1">Try adjusting your search query.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filtered.map((activity) => (
                <div key={activity.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row border border-gray-100 group">
                  <div className="relative w-full md:w-[380px] h-[280px] md:h-auto flex-shrink-0 overflow-hidden bg-gray-100">
                    {activity.imageUrl ? (
                      <img 
                        src={activity.imageUrl} 
                        alt={activity.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    <button className="absolute top-4 right-4 bg-white/90 p-2.5 rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight">{activity.title}</h3>
                      <div className="flex items-center gap-1.5 bg-orange-50 px-2.5 py-1 rounded text-sm font-semibold text-gray-800 flex-shrink-0">
                        <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                        {activity.rating} ({activity.reviews})
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-gray-500 text-[15px] font-medium mb-4">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {activity.description}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="text-[28px] font-bold text-[#65a30d] tracking-tight">
                        ${activity.price} <span className="text-gray-500 text-[15px] font-normal tracking-normal">/ person</span>
                      </div>
                      <button className="bg-[#65a30d] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4d7c0f] transition-colors shadow-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-center mt-8">
            <button className="bg-white border-2 border-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm">
              Load More Results
            </button>
          </div>
        </section>

      </main>
      
      </>
  );
}
