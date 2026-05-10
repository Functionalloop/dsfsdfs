import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight, Heart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function PlanTrip() {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handlePlanTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripName || !destination || !startDate || !endDate) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'itineraries'), {
        title: tripName,
        destination,
        description,
        imageUrl: coverPhoto || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80',
        startDate,
        endDate,
        status: 'Upcoming',
        userId: currentUser?.uid || 'anonymous',
        createdAt: new Date().toISOString()
      });
      navigate('/itineraries');
    } catch (err) {
      console.error("Error creating trip:", err);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      
      <main className="flex-grow pb-24">
        {/* Planning Form Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-gray-100">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Plan a new trip</h1>
            
            <form className="space-y-6" onSubmit={handlePlanTrip}>
              {/* Trip Name */}
              <div>
                <label htmlFor="trip_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Trip Name
                </label>
                <input 
                  type="text" 
                  id="trip_name" 
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="e.g., Summer Europe Adventure" 
                  className="w-full h-14 px-4 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select a Place
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    id="destination" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where do you want to go?" 
                    className="w-full h-14 pl-12 pr-4 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Trip Description */}
              <div>
                <label htmlFor="trip_desc" className="block text-sm font-semibold text-gray-700 mb-2">
                  Trip Description
                </label>
                <textarea 
                  id="trip_desc" 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your trip — what's the theme, who's coming, what are you most excited about?" 
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 placeholder-gray-400 resize-y"
                />
              </div>

              {/* Cover Photo URL (Optional) */}
              <div>
                <label htmlFor="cover_photo" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Photo URL <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input 
                  type="url" 
                  id="cover_photo" 
                  value={coverPhoto}
                  onChange={(e) => setCoverPhoto(e.target.value)}
                  placeholder="https://example.com/image.jpg" 
                  className="w-full h-14 px-4 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 placeholder-gray-400"
                />
              </div>
              
              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="start_date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="date" 
                      id="start_date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 appearance-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="end_date" className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="date" 
                      id="end_date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full h-14 pl-12 pr-4 bg-white rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 appearance-none"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-[#65a30d] text-white font-semibold rounded-xl shadow-sm hover:shadow-md hover:bg-[#4d7c0f] transition-all flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Start Planning</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Suggestions Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Suggestions for Places to Visit / Activities
            </h2>
            <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
              <button className="px-5 py-2.5 bg-[#ecfccb] text-[#4d7c0f] font-semibold text-sm rounded-full whitespace-nowrap transition-colors">
                Trending
              </button>
              <button className="px-5 py-2.5 bg-gray-100 text-gray-600 font-medium text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors">
                Adventure
              </button>
              <button className="px-5 py-2.5 bg-gray-100 text-gray-600 font-medium text-sm rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors">
                Luxury
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Large Featured Item */}
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 group cursor-pointer h-full min-h-[400px]">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&q=80" 
                  alt="Paris sunset" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/30 mb-4 inline-block shadow-sm">
                    City Break
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-3">Paris, France</h3>
                  <p className="text-white/90 text-[15px] max-w-sm line-clamp-3">
                    Experience the city of lights, from iconic landmarks to hidden culinary gems in Montmartre.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side Column 1 */}
            <div className="flex flex-col gap-8">
              {/* Standard Card 1 */}
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-5">
                  <img 
                    src="https://images.unsplash.com/photo-1542646698-c90a194380eb?auto=format&fit=crop&q=80" 
                    alt="Cinque Terre" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md text-gray-400 group-hover:text-red-500 transition-colors z-10">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 block">Coastal</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cinque Terre, Italy</h3>
                <p className="text-gray-600 text-[15px] line-clamp-2">
                  Hike between five picturesque fishing villages on the rugged Italian Riviera coastline.
                </p>
              </div>

              {/* Standard Card 3 */}
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-5">
                  <img 
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80" 
                    alt="Tokyo" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md text-gray-400 group-hover:text-red-500 transition-colors z-10">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 block">Culture</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tokyo, Japan</h3>
                <p className="text-gray-600 text-[15px] line-clamp-2">
                  Immerse yourself in the perfect blend of ultramodern cityscapes and traditional culture.
                </p>
              </div>
            </div>

            {/* Right Side Column 2 */}
            <div className="flex flex-col gap-8">
              {/* Standard Card 2 */}
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-5">
                  <img 
                    src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80" 
                    alt="Swiss Alps" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md text-gray-400 group-hover:text-red-500 transition-colors z-10">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 block">Adventure</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Swiss Alps</h3>
                <p className="text-gray-600 text-[15px] line-clamp-2">
                  Breathtaking alpine trails and crystal-clear mountain lakes await the adventurous soul.
                </p>
              </div>

              {/* Standard Card 4 */}
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-5">
                  <img 
                    src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80" 
                    alt="Maldives" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md text-gray-400 group-hover:text-red-500 transition-colors z-10">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 block">Relaxation</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Maldives</h3>
                <p className="text-gray-600 text-[15px] line-clamp-2">
                  Unwind in ultimate luxury with overwater bungalows and pristine coral reefs.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
      
      </>
  );
}
