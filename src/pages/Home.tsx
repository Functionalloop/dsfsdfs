import React, { useState, useEffect } from 'react';
import { 
  Search, ChevronDown, SlidersHorizontal, PlusCircle, 
  Calendar, Users, Camera, MapPin, Footprints, Sailboat, 
  Plane, Bed, Plus, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [myTrips, setMyTrips] = useState<any[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'destinations'));
        const fetchedDests: any[] = [];
        querySnapshot.forEach((docSnap) => {
          fetchedDests.push({ id: docSnap.id, ...docSnap.data() });
        });
        setDestinations(fetchedDests.slice(0, 4)); // Show top 4
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoadingRegions(false);
      }
    };
    
    const fetchTrips = async () => {
      try {
        const q = query(
          collection(db, 'itineraries'),
          where('userId', '==', currentUser?.uid || 'anonymous')
        );
        const querySnapshot = await getDocs(q);
        const fetchedTrips: any[] = [];
        querySnapshot.forEach((docSnap) => {
          fetchedTrips.push({ id: docSnap.id, ...docSnap.data() });
        });
        setMyTrips(fetchedTrips.slice(0, 3)); // Show up to 3 trips
      } catch (err) {
        console.error("Failed to fetch trips:", err);
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchDestinations();
    fetchTrips();
  }, [currentUser]);
  return (
    <>
      
      <main className="flex-grow pb-16">
        {/* Hero Section */}
        <section className="relative w-full h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80" 
              alt="Grand canyon landscape at sunset" 
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 drop-shadow-md">
              Discover Your Next Great Adventure
            </h1>
            
            {/* Search Component */}
            <div className="w-full max-w-3xl bg-white rounded-full p-2 flex items-center shadow-lg">
              <div className="flex-grow flex items-center px-4">
                <Search className="text-gray-400 w-5 h-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-800 text-lg placeholder-gray-400 py-3 outline-none"
                />
              </div>
              <div className="hidden sm:flex items-center border-l border-gray-200 pl-4 pr-2 space-x-2">
                <button className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-full transition-colors flex items-center gap-1">
                  Group by <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <button className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-full transition-colors flex items-center gap-1">
                  Filter <SlidersHorizontal className="w-4 h-4 ml-1" />
                </button>
              </div>
              <button className="bg-[#65a30d] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#4d7c0f] transition-colors ml-2 shadow-sm whitespace-nowrap">
                Search
              </button>
            </div>
            
            {/* Plan New Trip Button */}
            <div className="mt-8">
              <Link to="/plan-trip" className="bg-[#4d7c0f] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#3f6212] transition-colors shadow-lg flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Plan New Trip
              </Link>
            </div>
          </div>
        </section>

        {/* Top Regional Selections */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Top Regional Selections</h2>
            <a href="#" className="text-[#65a30d] font-medium hover:underline hidden sm:block">View all regions</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingRegions ? (
              <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#65a30d] animate-spin" />
              </div>
            ) : destinations.length > 0 ? (
              destinations.map(dest => (
                <div key={dest.id} className="group cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-gray-100">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/95 text-[#4d7c0f] px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                      {dest.country}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#65a30d] transition-colors">{dest.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{dest.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center text-gray-500 py-8">
                No destinations available yet.
              </div>
            )}
          </div>
        </section>

        {/* My Trips */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-100 rounded-3xl mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">My Trips</h2>
            <Link to="/itineraries" className="text-[#65a30d] font-medium hover:underline hidden sm:block">View all itineraries</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingTrips ? (
              <div className="col-span-1 md:col-span-3 flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#65a30d] animate-spin" />
              </div>
            ) : myTrips.length > 0 ? (
              myTrips.map(trip => (
                <div key={trip.id} className={`${trip.status === 'Upcoming' ? 'bg-[#65a30d]/10 border-2 border-[#65a30d]/30' : 'bg-white border border-gray-100'} rounded-xl overflow-hidden shadow-sm flex flex-col`}>
                  <div className="relative h-48">
                    <img src={trip.imageUrl || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80'} alt={trip.title} className="w-full h-full object-cover" />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-md ${trip.status === 'Upcoming' ? 'bg-[#65a30d] text-white' : 'bg-white text-gray-800'}`}>
                      {trip.status || 'Upcoming'}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{trip.title}</h3>
                      {trip.status === 'Upcoming' && <span className="text-[#65a30d] font-bold text-sm">Upcoming</span>}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {trip.destination}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 text-center text-gray-500 py-8">
                You haven't planned any trips yet!
              </div>
            )}
          </div>
        </section>

        {/* Recommended & Budget */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recommended */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Recommended For You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                  <img src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80" alt="Iceland Aurora" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[#a3e635] text-sm font-semibold mb-1 shadow-sm">Based on interest: Nature</span>
                    <h3 className="text-white text-2xl font-bold">Reykjavik, Iceland</h3>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
                  <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80" alt="Kyoto Shrine" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[#a3e635] text-sm font-semibold mb-1 shadow-sm">Trending Now</span>
                    <h3 className="text-white text-2xl font-bold">Kyoto, Japan</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Overview */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Overview</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-900">London Trip Budget</span>
                    <span className="text-[#65a30d]">65% Used</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#65a30d] h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-5 border-t border-gray-100">
                  <span className="text-gray-500 font-medium tracking-tight">Total Spent (Dec)</span>
                  <span className="text-gray-900 font-bold text-3xl tracking-tight">$2,450</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#4d7c0f]">
                        <Plane className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-[15px]">Flights</span>
                    </div>
                    <span className="font-semibold">$1,200</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[#4d7c0f]">
                        <Bed className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-[15px]">Stay</span>
                    </div>
                    <span className="font-semibold">$850</span>
                  </div>
                </div>
                
                <button className="w-full py-3 text-[#4d7c0f] font-semibold tracking-wide border-2 border-gray-200 rounded-xl hover:border-[#65a30d] hover:bg-[#65a30d]/5 transition-colors mt-6">
                  View Full Report
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-[#65a30d] text-white px-6 py-4 rounded-full shadow-lg hover:bg-[#4d7c0f] hover:-translate-y-1 transition-all group border border-transparent">
          <Plus className="w-5 h-5" />
          <span className="font-semibold text-[15px]">Plan a trip</span>
        </button>

      </main>
      
      </>
  );
}
