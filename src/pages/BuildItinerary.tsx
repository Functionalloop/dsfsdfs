import React, { useState } from 'react';
import { GripVertical, Trash2, Calendar, Banknote, MapPinPlusInside } from 'lucide-react';

type ActivityType = 'Flight' | 'Stay' | 'Tour' | 'Dining';

interface Stop {
  id: string;
  title: string;
  activityType: ActivityType;
  details: string;
  dateRange: string;
  budget: string;
}

export default function BuildItinerary() {
  const [stops, setStops] = useState<Stop[]>([
    {
      id: '1',
      title: 'Stop 1: Paris - Arrival & Flight',
      activityType: 'Flight',
      details: 'Flight AF123, leaving JFK at 18:00, arriving CDG at 07:30. Confirmation: #XY98Z.',
      dateRange: 'Oct 12 - Oct 13',
      budget: '1200.00',
    },
    {
      id: '2',
      title: 'Stop 2: Paris - Luxury Stay',
      activityType: 'Stay',
      details: 'Le Meurice Hotel. Check-in at 15:00. Executive Suite requested.',
      dateRange: 'Oct 13 - Oct 18',
      budget: '3500.00',
    }
  ]);

  const addStop = () => {
    const newId = (stops.length + 1).toString();
    setStops([
      ...stops,
      {
        id: newId,
        title: `Stop ${newId}: New Destination`,
        activityType: 'Tour',
        details: '',
        dateRange: '',
        budget: '',
      }
    ]);
  };

  const removeStop = (id: string) => {
    setStops(stops.filter(stop => stop.id !== id));
  };

  const setActivityType = (id: string, type: ActivityType) => {
    setStops(stops.map(stop => stop.id === id ? { ...stop, activityType: type } : stop));
  };

  return (
    <>
      
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Build Itinerary</h1>
          <p className="text-gray-600 text-lg">
            Structure your trip by adding distinct sections for travel, accommodation, and activities.
          </p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {stops.map((stop) => (
            <div 
              key={stop.id} 
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <GripVertical className="text-gray-400 cursor-move hover:text-gray-600 w-5 h-5" />
                  <h2 className="text-xl font-bold text-gray-900">{stop.title}</h2>
                </div>
                <button 
                  onClick={() => removeStop(stop.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-50"
                  type="button"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Details & Information</label>
                  <span className="text-sm text-gray-700 block mb-2 font-medium">Activity Type</span>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {(['Flight', 'Stay', 'Tour', 'Dining'] as ActivityType[]).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActivityType(stop.id, type)}
                        className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                          stop.activityType === type 
                            ? 'bg-[#65a30d] border-[#65a30d] text-white' 
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  
                  <textarea 
                    className="w-full rounded-xl border border-gray-300 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] bg-white text-gray-900 p-3.5 text-[15px] placeholder-gray-400 transition-colors outline-none min-h-[100px] resize-y"
                    placeholder="e.g., Flight AF123, leaving JFK at 18:00, arriving CDG at 07:30. Confirmation: #XY98Z."
                    rows={3}
                    defaultValue={stop.details}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Date Range</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        className="w-full rounded-xl border border-gray-300 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] bg-white text-gray-900 pl-11 pr-4 py-3 text-[15px] placeholder-gray-400 transition-colors outline-none" 
                        placeholder="Oct 12 - Oct 13" 
                        defaultValue={stop.dateRange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Budget (USD)</label>
                    <div className="relative">
                      <Banknote className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="number" 
                        className="w-full rounded-xl border border-gray-300 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] bg-white text-gray-900 pl-11 pr-4 py-3 text-[15px] placeholder-gray-400 transition-colors outline-none" 
                        placeholder="Set budget for this stop (e.g. 1200.00)" 
                        defaultValue={stop.budget}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Section Button */}
          <div className="pt-2 flex justify-center">
            <button 
              type="button" 
              onClick={addStop}
              className="inline-flex items-center justify-center h-12 px-6 rounded-full border-2 border-dashed border-gray-300 hover:border-[#65a30d] hover:text-[#4d7c0f] hover:bg-[#65a30d]/5 text-gray-500 font-semibold transition-all group w-full md:w-auto"
            >
              <MapPinPlusInside className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Add another Stop (City/Activity)
            </button>
          </div>

          {/* Form Actions */}
          <div className="pt-10 flex flex-col sm:flex-row justify-center md:justify-end items-center gap-4 border-t border-gray-200 mt-12">
            <button 
              type="button" 
              className="w-full sm:w-auto h-12 px-6 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 transition-colors"
            >
              Save as Draft
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-auto h-12 px-8 rounded-lg bg-[#65a30d] text-white font-semibold hover:bg-[#4d7c0f] transition-colors shadow-sm hover:shadow-md"
            >
              Complete Itinerary
            </button>
          </div>
        </form>
      </main>
      
      </>
  );
}
