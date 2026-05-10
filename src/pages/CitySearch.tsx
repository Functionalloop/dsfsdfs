import React, { useState } from 'react';
import { Search, MapPin, DollarSign, TrendingUp, Plus, Filter, Globe, Star } from 'lucide-react';

interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  costIndex: 'Budget' | 'Moderate' | 'Expensive' | 'Premium';
  popularity: number;
  image: string;
  description: string;
  avgDailyCost: number;
}

const allCities: City[] = [
  { id: '1', name: 'Paris', country: 'France', region: 'Europe', costIndex: 'Premium', popularity: 98, image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&q=80', description: 'The City of Light, famous for art, fashion, and culinary excellence.', avgDailyCost: 250 },
  { id: '2', name: 'Tokyo', country: 'Japan', region: 'Asia Pacific', costIndex: 'Expensive', popularity: 95, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80', description: 'A dazzling mix of ultramodern and traditional culture.', avgDailyCost: 200 },
  { id: '3', name: 'Bali', country: 'Indonesia', region: 'Asia Pacific', costIndex: 'Budget', popularity: 92, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80', description: 'Tropical paradise with ancient temples and lush rice terraces.', avgDailyCost: 60 },
  { id: '4', name: 'Rome', country: 'Italy', region: 'Europe', costIndex: 'Moderate', popularity: 90, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80', description: 'The Eternal City, home to the Colosseum and Vatican.', avgDailyCost: 150 },
  { id: '5', name: 'New York', country: 'United States', region: 'Americas', costIndex: 'Premium', popularity: 96, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80', description: 'The city that never sleeps — Broadway, Central Park, and more.', avgDailyCost: 300 },
  { id: '6', name: 'Bangkok', country: 'Thailand', region: 'Asia Pacific', costIndex: 'Budget', popularity: 88, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80', description: 'Vibrant street life, ornate temples, and incredible food.', avgDailyCost: 45 },
  { id: '7', name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: 'Moderate', popularity: 85, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80', description: 'Stunning coastlines, Table Mountain, and wine country.', avgDailyCost: 100 },
  { id: '8', name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: 'Moderate', popularity: 93, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80', description: 'Gaudí architecture, Mediterranean beaches, and vibrant nightlife.', avgDailyCost: 140 },
  { id: '9', name: 'Marrakech', country: 'Morocco', region: 'Africa', costIndex: 'Budget', popularity: 82, image: 'https://images.unsplash.com/photo-1489493173507-6feea31f12ff?auto=format&fit=crop&q=80', description: 'Historic medinas, Sahara gateway, and aromatic souks.', avgDailyCost: 55 },
  { id: '10', name: 'Reykjavik', country: 'Iceland', region: 'Europe', costIndex: 'Expensive', popularity: 80, image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80', description: 'Northern Lights, geysers, and otherworldly landscapes.', avgDailyCost: 220 },
  { id: '11', name: 'Sydney', country: 'Australia', region: 'Asia Pacific', costIndex: 'Expensive', popularity: 89, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80', description: 'Iconic harbour, beaches, and a world-class culinary scene.', avgDailyCost: 210 },
  { id: '12', name: 'Cusco', country: 'Peru', region: 'Americas', costIndex: 'Budget', popularity: 78, image: 'https://images.unsplash.com/photo-1526392060635-9d60198d3de3?auto=format&fit=crop&q=80', description: 'Gateway to Machu Picchu and the ancient Inca Empire.', avgDailyCost: 40 },
];

const regions = ['All', 'Europe', 'Asia Pacific', 'Americas', 'Africa'];
const costLevels = ['All', 'Budget', 'Moderate', 'Expensive', 'Premium'];

export default function CitySearch() {
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCost, setSelectedCost] = useState('All');
  const [addedCities, setAddedCities] = useState<Set<string>>(new Set());

  const filtered = allCities.filter(city => {
    const matchesQuery = city.name.toLowerCase().includes(query.toLowerCase()) ||
                         city.country.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion;
    const matchesCost = selectedCost === 'All' || city.costIndex === selectedCost;
    return matchesQuery && matchesRegion && matchesCost;
  });

  const toggleCity = (id: string) => {
    setAddedCities(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const costColor = (cost: string) => {
    switch (cost) {
      case 'Budget': return 'bg-emerald-100 text-emerald-700';
      case 'Moderate': return 'bg-amber-100 text-amber-700';
      case 'Expensive': return 'bg-orange-100 text-orange-700';
      case 'Premium': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">City Search</h1>
          <p className="text-gray-600 text-[15px] max-w-2xl">
            Discover cities around the world. Search by name or country, filter by region or cost index, and add cities to your trip.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cities or countries..." 
              className="w-full h-14 pl-12 pr-4 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-14 pl-9 pr-8 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none text-gray-700 font-medium appearance-none cursor-pointer"
              >
                {regions.map(r => <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>)}
              </select>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                value={selectedCost}
                onChange={(e) => setSelectedCost(e.target.value)}
                className="h-14 pl-9 pr-8 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none text-gray-700 font-medium appearance-none cursor-pointer"
              >
                {costLevels.map(c => <option key={c} value={c}>{c === 'All' ? 'All Budgets' : c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 font-medium">{filtered.length} cities found</p>
          {addedCities.size > 0 && (
            <span className="text-sm font-semibold text-[#4d7c0f] bg-[#ecfccb] px-4 py-1.5 rounded-full">
              {addedCities.size} added to trip
            </span>
          )}
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(city => (
            <div key={city.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${costColor(city.costIndex)}`}>
                    {city.costIndex}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-[#65a30d]" />
                  <span className="text-xs font-bold text-gray-800">{city.popularity}%</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {city.country} · {city.region}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{city.description}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#65a30d]" />
                    <span className="text-sm font-semibold text-gray-700">~${city.avgDailyCost}/day</span>
                  </div>
                  <button 
                    onClick={() => toggleCity(city.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      addedCities.has(city.id) 
                        ? 'bg-[#65a30d] text-white shadow-sm' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-[#65a30d] hover:text-[#4d7c0f]'
                    }`}
                  >
                    {addedCities.has(city.id) ? (
                      <>
                        <Star className="w-4 h-4 fill-current" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add to Trip
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No cities found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}

      </main>
    </>
  );
}
