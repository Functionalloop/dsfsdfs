import React from 'react';
import { Check, Ticket, IdCard, FileText, UploadCloud } from 'lucide-react';

export default function TripTimeline() {
  return (
    <>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-16 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">Current Trip Timeline</h1>
          <p className="text-base text-gray-600">Track the progress of your upcoming adventure to Kyoto, Japan.</p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative w-full overflow-x-auto pb-12 mb-12">
          <div className="min-w-[800px] relative px-4 pt-4">
            {/* Lines */}
            <div className="absolute top-7 left-0 w-full h-0.5 bg-gray-200 z-0">
              <div className="h-full bg-[#4d7c0f] transition-all duration-1000" style={{ width: '60%' }}></div>
            </div>
            
            {/* Steps Container */}
            <div className="flex justify-between relative w-full z-10">
              {/* Step 1: Completed */}
              <div className="flex flex-col items-center w-40 text-center relative group">
                <div className="bg-[#faf9f9] px-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#4d7c0f] flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-[#4d7c0f] mb-1">Book Flights</h3>
                <p className="font-medium text-xs text-[#4d7c0f]">09 May, 07:30 PM</p>
              </div>

              {/* Step 2: Completed */}
              <div className="flex flex-col items-center w-40 text-center relative group">
                <div className="bg-[#faf9f9] px-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#4d7c0f] flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-[#4d7c0f] mb-1">Reserve Hotel</h3>
                <p className="font-medium text-xs text-[#4d7c0f]">10 May, 08:30 AM</p>
              </div>

              {/* Step 3: Completed */}
              <div className="flex flex-col items-center w-48 text-center relative group">
                <div className="bg-[#faf9f9] px-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#4d7c0f] flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-all">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-[#4d7c0f] mb-1">Finalize Itinerary</h3>
                <p className="font-medium text-xs text-[#4d7c0f]">10 May, 09:00 AM</p>
              </div>

              {/* Step 4: Active */}
              <div className="flex flex-col items-center w-48 text-center relative group">
                <div className="bg-[#faf9f9] px-2 mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-[#4d7c0f] bg-white flex items-center justify-center shadow-md relative">
                    <div className="w-2 h-2 rounded-full bg-[#4d7c0f]"></div>
                    {/* Pulse effect */}
                    <div className="absolute inset-[-2px] rounded-full border-2 border-[#4d7c0f] opacity-30 animate-ping"></div>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Upload Travel Docs</h3>
                <p className="font-medium text-xs text-gray-500">Due: 10 May, 10:00 AM</p>
              </div>

              {/* Step 5: Pending */}
              <div className="flex flex-col items-center w-40 text-center relative group">
                <div className="bg-[#faf9f9] px-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shadow-sm"></div>
                </div>
                <h3 className="font-semibold text-sm text-gray-500 mb-1">Pack Luggage</h3>
                <p className="font-medium text-xs text-gray-400">10 May, 05:00 PM</p>
              </div>

              {/* Step 6: Pending */}
              <div className="flex flex-col items-center w-40 text-center relative group">
                <div className="bg-[#faf9f9] px-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shadow-sm"></div>
                </div>
                <h3 className="font-semibold text-sm text-gray-500 mb-1">Head to Airport</h3>
                <p className="font-medium text-xs text-gray-400">10 May, 05:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed View of Active Step */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80" 
                alt="Travel preparation" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Ticket className="w-5 h-5 text-[#a3e635]" />
                  <span className="font-semibold text-sm text-[#a3e635] uppercase tracking-wider">Kyoto Adventure</span>
                </div>
                <h2 className="text-3xl font-bold">Action Required</h2>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-[#ecfccb] px-3 py-1.5 rounded-full w-fit mb-6">
                <span className="w-2 h-2 rounded-full bg-[#4d7c0f]"></span>
                <span className="font-bold text-xs text-[#3f6212] uppercase tracking-wider">Current Step</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload Travel Documents</h3>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                To ensure a smooth journey, please securely upload copies of your passport, visa (if applicable), and any necessary vaccination certificates. Your guide needs these to finalize local arrangements.
              </p>

              <div className="space-y-4 mb-8">
                {/* Document Item 1 */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ecfccb]/60 flex items-center justify-center text-[#4d7c0f]">
                      <IdCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Passport Copy</h4>
                      <p className="font-medium text-xs text-gray-500 mt-0.5">Required for hotel check-ins</p>
                    </div>
                  </div>
                  <button className="font-semibold text-sm text-[#65a30d] hover:text-[#4d7c0f] hover:underline transition-all">Upload</button>
                </div>

                {/* Document Item 2 */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ecfccb]/60 flex items-center justify-center text-[#4d7c0f]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Travel Insurance</h4>
                      <p className="font-medium text-xs text-gray-500 mt-0.5">Recommended policy docs</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm text-gray-400">Optional</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#4d7c0f] hover:bg-[#3f6212] flex-1 sm:flex-none text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2">
                  <UploadCloud className="w-5 h-5" />
                  Upload All Files
                </button>
                <button className="border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 font-semibold text-sm px-6 py-3 rounded-xl transition-all">
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      </>
  );
}
