import React, { useState } from 'react';
import { 
  MapPin, Calendar, Clock, DollarSign, Copy, Share2, 
  Twitter, Facebook, Link2, Check, ArrowDown, PlaneLanding, 
  Bed, Building, Mountain, Utensils, Globe, Users
} from 'lucide-react';

// Mock shared itinerary data (in production, fetched via itineraryId param)
const sharedTrip = {
  title: 'Tokyo Exploration',
  author: 'Alex Wanderlust',
  authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&q=80',
  coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80',
  dateRange: 'Oct 12 - Oct 18, 2025',
  totalDays: 7,
  totalCost: '$2,450',
  cities: ['Tokyo', 'Kyoto', 'Osaka'],
  days: [
    {
      day: 1,
      date: 'Oct 12',
      city: 'Tokyo',
      activities: [
        { title: 'Arrival & Airport Transfer', desc: 'Private transfer to downtown hotel.', type: 'Transport', time: '10:00 AM', cost: 45, icon: 'plane' },
        { title: 'Hotel Check-in', desc: 'Grand Plaza Hotel, City Center.', type: 'Accommodation', time: '1:00 PM', cost: 0, icon: 'bed' },
        { title: 'City Museum Tour', desc: 'Guided walking tour of historical artifacts.', type: 'Activity', time: '3:30 PM', cost: 25, icon: 'building' },
      ]
    },
    {
      day: 2,
      date: 'Oct 13',
      city: 'Tokyo',
      activities: [
        { title: 'Mountain Hiking Trail', desc: 'Guided half-day hike through the national park.', type: 'Adventure', time: '8:00 AM', cost: 15, icon: 'mountain' },
        { title: 'Lunch at Peak View', desc: 'Local cuisine with a scenic mountain view.', type: 'Dining', time: '1:30 PM', cost: 35, icon: 'utensils' },
      ]
    },
    {
      day: 3,
      date: 'Oct 14',
      city: 'Kyoto',
      activities: [
        { title: 'Bullet Train to Kyoto', desc: 'Shinkansen from Tokyo Station.', type: 'Transport', time: '7:30 AM', cost: 120, icon: 'plane' },
        { title: 'Fushimi Inari Shrine', desc: 'Walk through thousands of vermillion torii gates.', type: 'Activity', time: '11:00 AM', cost: 0, icon: 'building' },
        { title: 'Traditional Kaiseki Dinner', desc: 'Multi-course seasonal dinner at a ryokan.', type: 'Dining', time: '7:00 PM', cost: 85, icon: 'utensils' },
      ]
    },
  ]
};

const iconMap: Record<string, React.ElementType> = {
  plane: PlaneLanding, bed: Bed, building: Building, mountain: Mountain, utensils: Utensils
};

export default function SharedItinerary() {
  const [copied, setCopied] = useState(false);
  const [tripCopied, setTripCopied] = useState(false);

  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTrip = () => {
    setTripCopied(true);
    setTimeout(() => setTripCopied(false), 3000);
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=Check out this amazing trip: ${sharedTrip.title}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=Check out this trip itinerary: ${sharedTrip.title} ${shareUrl}`, '_blank');
  };

  return (
    <>
      <main className="flex-grow w-full">

        {/* Hero Cover */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={sharedTrip.coverImage} alt={sharedTrip.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <img src={sharedTrip.authorAvatar} alt={sharedTrip.author} className="w-10 h-10 rounded-full border-2 border-white" />
              <div>
                <p className="text-white/80 text-sm">Shared by</p>
                <p className="text-white font-semibold">{sharedTrip.author}</p>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{sharedTrip.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {sharedTrip.dateRange}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {sharedTrip.cities.join(' → ')}</span>
              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> {sharedTrip.totalCost} total</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#65a30d]" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Public Itinerary</p>
                <p className="text-xs text-gray-500">Anyone with the link can view this trip</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={handleCopyTrip}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  tripCopied 
                    ? 'bg-[#65a30d] text-white' 
                    : 'bg-[#65a30d] text-white hover:bg-[#4d7c0f]'
                } shadow-sm`}
              >
                {tripCopied ? <><Check className="w-4 h-4" /> Copied to Your Trips!</> : <><Copy className="w-4 h-4" /> Copy Trip</>}
              </button>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleShareTwitter}
                  className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleShareFacebook}
                  className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleShareWhatsApp}
                  className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                  title="Share on WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleCopyLink}
                  className={`p-2.5 rounded-xl transition-colors ${
                    copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Trip Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Duration', value: `${sharedTrip.totalDays} days`, icon: Calendar },
              { label: 'Cities', value: sharedTrip.cities.length.toString(), icon: MapPin },
              { label: 'Total Budget', value: sharedTrip.totalCost, icon: DollarSign },
              { label: 'Activities', value: sharedTrip.days.reduce((sum, d) => sum + d.activities.length, 0).toString(), icon: Users },
            ].map(card => (
              <div key={card.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-[#ecfccb] flex items-center justify-center mb-3">
                  <card.icon className="w-4 h-4 text-[#4d7c0f]" />
                </div>
                <p className="text-xs text-gray-500 font-medium">{card.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-0.5">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Day-by-Day Itinerary */}
          <div className="space-y-8">
            {sharedTrip.days.map((day, dayIndex) => (
              <div key={day.day} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Day Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#65a30d] text-white px-3 py-1 rounded-full text-sm font-bold">Day {day.day}</span>
                    <span className="text-gray-700 font-semibold">{day.date}</span>
                    <span className="text-gray-500 text-sm flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {day.city}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#4d7c0f]">
                    ${day.activities.reduce((sum, a) => sum + a.cost, 0).toFixed(2)}
                  </span>
                </div>

                {/* Activities */}
                <div className="p-6 space-y-4">
                  {day.activities.map((activity, actIndex) => {
                    const IconComponent = iconMap[activity.icon] || Building;
                    return (
                      <React.Fragment key={actIndex}>
                        <div className="flex items-start gap-4">
                          <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                            activity.type === 'Activity' || activity.type === 'Adventure' 
                              ? 'bg-[#ecfccb]/60 text-[#65a30d]' 
                              : activity.type === 'Transport' 
                                ? 'bg-blue-100 text-blue-600' 
                                : activity.type === 'Dining' 
                                  ? 'bg-amber-100 text-amber-600'
                                  : 'bg-gray-100 text-gray-500'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-500 mt-0.5">{activity.desc}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded">{activity.type}</span>
                              <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {activity.time}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className={`font-bold ${activity.cost > 0 ? 'text-[#4d7c0f]' : 'text-gray-400'}`}>
                              {activity.cost > 0 ? `$${activity.cost.toFixed(2)}` : 'Free'}
                            </span>
                          </div>
                        </div>
                        {actIndex < day.activities.length - 1 && (
                          <div className="flex justify-center text-gray-200">
                            <ArrowDown className="w-5 h-5" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Inspired by this trip?</p>
            <button 
              onClick={handleCopyTrip}
              className="inline-flex items-center gap-2 bg-[#65a30d] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#4d7c0f] transition-all shadow-lg hover:-translate-y-0.5"
            >
              <Copy className="w-5 h-5" /> Copy This Trip to My Account
            </button>
          </div>

        </div>
      </main>
    </>
  );
}
