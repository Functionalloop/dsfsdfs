import React, { useState } from 'react';
import { 
  Globe, ChevronDown, Settings, Edit2,
  Footprints, Camera, Leaf, SlidersHorizontal, Check, 
  Calendar, History, Bookmark, Save, Trash2, X, AlertTriangle
} from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Wanderlust',
    email: 'alex@traveloop.com',
    bio: 'Adventure Enthusiast & Digital Nomad | Exploring 45 countries and counting.',
    language: 'en',
  });
  const [savedData, setSavedData] = useState({ ...formData });

  const handleSave = () => {
    setSavedData({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...savedData });
    setIsEditing(false);
  };

  return (
    <>
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
        
        {/* User Profile Header */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80" 
              alt={formData.name}
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
            <button className="absolute bottom-2 right-2 bg-[#65a30d] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-[#4d7c0f] hover:-translate-y-0.5 transition-all outline-none border-2 border-white">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="flex-grow">
                {isEditing ? (
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#65a30d] focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#65a30d] focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
                      <textarea 
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#65a30d] focus:border-transparent outline-none resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Language Preference</label>
                      <select 
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#65a30d] focus:border-transparent outline-none appearance-none cursor-pointer"
                      >
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                        <option value="hi">हिन्दी</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-[#65a30d] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#4d7c0f] transition-colors text-sm"
                      >
                        <Save className="w-4 h-4" /> Save Changes
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="flex items-center gap-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{formData.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{formData.email}</p>
                    <p className="text-[15px] text-gray-600 mt-1.5">{formData.bio}</p>
                  </div>
                )}
              </div>
              {!isEditing && (
                <div className="flex flex-col sm:flex-row gap-3 self-center md:self-start">
                  <button className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 h-11 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                    <Globe className="w-5 h-5 text-gray-500" />
                    {formData.language === 'en' ? 'EN' : formData.language.toUpperCase()}
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 h-11 px-5 rounded-xl font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    <Settings className="w-5 h-5 text-gray-500" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
            
            {!isEditing && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                <div className="bg-[#ecfccb] text-[#4d7c0f] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Footprints className="w-4 h-4" /> Adventure
                </div>
                <div className="bg-[#ecfccb] text-[#4d7c0f] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Photography
                </div>
                <div className="bg-[#ecfccb] text-[#4d7c0f] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Leaf className="w-4 h-4" /> Eco-friendly
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Travel Preferences */}
        <section className="bg-[#f3f4f6] p-8 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <SlidersHorizontal className="w-6 h-6 text-[#65a30d]" />
              Travel Preferences
            </h2>
            <button className="text-[#65a30d] font-medium hover:underline text-sm">Edit Preferences</button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Sustainable Travel', active: true },
              { label: 'Luxury Stays', active: false },
              { label: 'Local Cuisine', active: true },
              { label: 'Solo Travel', active: false },
              { label: 'Off-the-beaten-path', active: true },
            ].map((pref) => (
              <button 
                key={pref.label}
                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors ${
                  pref.active 
                    ? 'bg-[#4d7c0f] text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {pref.active && <Check className="w-4 h-4" />}
                {pref.label}
              </button>
            ))}
          </div>
        </section>

        {/* Preplanned Trips */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <Calendar className="w-6 h-6 text-[#65a30d]" />
              Preplanned Trips
            </h2>
            <button className="text-[#65a30d] font-medium hover:underline text-sm">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Paris Getaway', img: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&q=80', dates: 'Oct 15 - Oct 20', badge: 'In 14 days', desc: 'A romantic weekend exploring art, culture, and culinary delights in the heart of France.' },
              { title: 'Kyoto Autumn', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80', dates: 'Nov 05 - Nov 18', badge: 'In 2 months', desc: 'Experiencing the stunning fall foliage, ancient temples, and traditional tea ceremonies.' },
              { title: 'Swiss Alps Hike', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80', dates: 'TBD', badge: 'Draft', desc: 'Planning an intensive hiking expedition through the picturesque mountains of Switzerland.' },
            ].map((trip) => (
              <div key={trip.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border border-gray-100">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={trip.img} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                    {trip.badge}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h3>
                  <p className="text-gray-600 text-[15px] mb-6 line-clamp-2">{trip.desc}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="text-gray-500 text-sm font-medium flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {trip.dates}
                    </div>
                    <button className="bg-[#65a30d] text-white h-10 px-5 rounded-lg text-sm font-semibold hover:bg-[#4d7c0f] hover:-translate-y-0.5 transition-all shadow-sm">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Trips */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <History className="w-6 h-6 text-[#65a30d]" />
              Previous Trips
            </h2>
            <button className="text-[#65a30d] font-medium hover:underline text-sm">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Santorini Escape', img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80', desc: 'A relaxing week enjoying the Mediterranean sun, fresh seafood, and stunning sunsets.' },
              { title: 'Costa Rica Eco-Tour', img: 'https://images.unsplash.com/photo-1518182170546-076616fdcd80?auto=format&fit=crop&q=80', desc: 'Zip-lining through cloud forests and discovering incredible wildlife biodiversity.' },
            ].map((trip) => (
              <div key={trip.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border border-gray-100">
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500">
                  <img src={trip.img} alt={trip.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{trip.title}</h3>
                  <p className="text-gray-600 text-[15px] mb-6 line-clamp-2">{trip.desc}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="text-gray-500 text-sm font-medium flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Completed
                    </div>
                    <button className="border border-gray-300 text-gray-700 h-10 px-5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saved Destinations */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <Bookmark className="w-6 h-6 text-[#65a30d]" />
              Saved Destinations
            </h2>
            <button className="text-[#65a30d] font-medium hover:underline text-sm">View All</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Amalfi Coast, Italy', img: 'https://images.unsplash.com/photo-1533596954316-c98ec8524317?auto=format&fit=crop&q=80' },
              { title: 'Ubud, Bali', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80' },
              { title: 'Reykjavik, Iceland', img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80' },
              { title: 'Patagonia, Chile', img: 'https://images.unsplash.com/photo-1526392060635-9d60198d3de3?auto=format&fit=crop&q=80' }
            ].map((dest, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100">
                  <img src={dest.img} alt={dest.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#65a30d] shadow-sm hover:bg-white transition-colors">
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <h4 className="font-semibold text-gray-900 text-[15px]">{dest.title}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="border border-red-200 rounded-2xl p-6 bg-red-50/30">
          <h2 className="text-lg font-bold text-red-700 flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h2>
          <p className="text-sm text-red-600/70 mb-4">
            Deleting your account will permanently remove all your trips, notes, and saved destinations. This action cannot be undone.
          </p>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
        </section>

      </main>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delete Account</h3>
                <p className="text-sm text-gray-500">This action is irreversible.</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              All your trips, itineraries, notes, bookmarks, and profile data will be permanently deleted. Are you sure you want to proceed?
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => { /* would call auth.currentUser.delete() */ setShowDeleteModal(false); }}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
