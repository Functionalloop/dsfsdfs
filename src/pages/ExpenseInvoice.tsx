import React from 'react';
import { 
  ArrowLeft, Euro, BarChart3, Bus, Bed, Ticket, 
  Utensils, Download, FileText, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ExpenseInvoice() {
  return (
    <>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-16 py-12 pb-20">
        
        <div className="mb-8">
          <Link to="/itineraries" className="inline-flex items-center text-gray-500 hover:text-[#4d7c0f] transition-colors font-semibold text-sm">
            <ArrowLeft className="w-5 h-5 mr-2" />
            back to My Trips
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Header Invoice Info */}
          <div className="col-span-12 lg:col-span-8 bg-white/85 backdrop-blur-md rounded-2xl p-8 shadow-sm border border-white/30 flex flex-col justify-between">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-8 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trip to Europe Adventure</h1>
                <p className="text-base text-gray-600">Aug 15 - Jun 25, 2025 • 4 cities</p>
                <p className="text-xs text-gray-500 mt-1">visited to towns</p>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="bg-gray-100/80 rounded-xl p-4 w-16 h-16 flex items-center justify-center">
                  <Euro className="w-8 h-8 text-[#4d7c0f]" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Invoice ID</p>
                <p className="text-base font-semibold text-gray-900">INV-xyz-50240</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Generated date</p>
                <p className="text-base font-semibold text-gray-900">May 20, 2025</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Traveler Details</p>
                <p className="text-base font-semibold text-gray-900 leading-relaxed">
                  James<br/>Arjun<br/>Jerry<br/>Cristina
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">Payment status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold tracking-wide">
                  pending
                </span>
              </div>
            </div>
          </div>

          {/* Budget Insights */}
          <div className="col-span-12 lg:col-span-4 bg-[#b6c8e3] rounded-2xl p-8 shadow-sm text-[#091c31]">
            <h2 className="text-2xl font-bold mb-6">Budget Insights</h2>
            
            <div className="flex items-center gap-3 mb-6 bg-white/30 p-4 rounded-xl border border-white/20">
              <BarChart3 className="text-[#336b00] w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#37485f]">Daily Avg. Cost</span>
                <span className="text-base font-bold text-[#091c31]">$325.50 / day</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center mb-8 relative">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="50" fill="transparent" stroke="#cfe1fd" strokeWidth="16" />
                  <circle 
                    cx="64" cy="64" r="50" fill="transparent" stroke="#4d7c0f" 
                    strokeWidth="16" strokeDasharray="314" strokeDashoffset="141" 
                    className="transition-all duration-1000 ease-in-out" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xs text-[#37485f] font-medium">Spent</span>
                  <span className="text-xl font-bold text-[#091c31]">55%</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#37485f]">
                  <span className="flex items-center gap-2"><Bus className="w-4 h-4" /> Transport</span>
                  <span>$4,200</span>
                </div>
                <div className="w-full bg-[#37485f]/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4d7c0f] h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#37485f]">
                  <span className="flex items-center gap-2"><Bed className="w-4 h-4" /> Stay</span>
                  <span>$9,000</span>
                </div>
                <div className="w-full bg-[#37485f]/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4d7c0f] h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#37485f]">
                  <span className="flex items-center gap-2"><Ticket className="w-4 h-4" /> Activities</span>
                  <span>$5,500</span>
                </div>
                <div className="w-full bg-[#37485f]/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4d7c0f] h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#37485f]">
                  <span className="flex items-center gap-2"><Utensils className="w-4 h-4" /> Meals</span>
                  <span>$1,300</span>
                </div>
                <div className="w-full bg-[#37485f]/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4d7c0f] h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div className="pt-4 mt-2 border-t border-[#37485f]/20 flex justify-between items-center text-base">
                <span className="text-[#37485f] font-medium">Remaining:</span>
                <span className="font-bold text-[#336b00]">$9,000</span>
              </div>
            </div>

            <button className="w-full mt-6 py-3 rounded-full border border-[#091c31]/30 text-[#091c31] hover:bg-[#091c31] hover:text-white transition-colors font-semibold text-sm text-center">
              View Full Budget
            </button>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white/85 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-white/30 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 py-5 w-16 text-center">#</th>
                  <th className="p-4 py-5 w-48">Category</th>
                  <th className="p-4 py-5">Description</th>
                  <th className="p-4 py-5 w-32 text-center">Qty/details</th>
                  <th className="p-4 py-5 w-40 text-right">Unit Cost</th>
                  <th className="p-4 py-5 w-40 text-right pr-8">Amount</th>
                </tr>
              </thead>
              <tbody className="text-base text-gray-900 divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 py-6 text-center text-gray-400">1</td>
                  <td className="p-4 py-6 font-semibold">hotel</td>
                  <td className="p-4 py-6">hotel booking paris</td>
                  <td className="p-4 py-6 text-center text-gray-600">3 nights</td>
                  <td className="p-4 py-6 text-right text-gray-500">3000</td>
                  <td className="p-4 py-6 text-right font-semibold pr-8">9000</td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 py-6 text-center text-gray-400">2</td>
                  <td className="p-4 py-6 font-semibold">travel</td>
                  <td className="p-4 py-6">flight bookings (DEL -{'>'} PAR)</td>
                  <td className="p-4 py-6 text-center text-gray-600">1</td>
                  <td className="p-4 py-6 text-right text-gray-500">12000</td>
                  <td className="p-4 py-6 text-right font-semibold pr-8">12000</td>
                </tr>
                <tr className="h-24"><td colSpan={6}></td></tr>
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end p-8 bg-gray-50/50 border-t border-gray-100">
            <div className="w-full max-w-xs space-y-4">
              <div className="flex justify-between items-center text-base text-gray-600">
                <span>Subtotal</span>
                <span>$ 21000</span>
              </div>
              <div className="flex justify-between items-center text-base text-gray-600">
                <span>Tax(5%)</span>
                <span>$ 1050</span>
              </div>
              <div className="flex justify-between items-center text-base text-gray-600 pb-4 border-b border-gray-200">
                <span>Discount</span>
                <span>$ 50</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold text-gray-900 pt-2">
                <span>Grand Total</span>
                <span className="text-[#4d7c0f]">$ 22000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="font-semibold text-sm bg-[#4e5f77] text-white px-8 py-3.5 rounded-full hover:bg-[#37485f] transition-all shadow-sm flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            <button className="font-semibold text-sm text-[#4e5f77] border border-[#4e5f77]/30 bg-white px-8 py-3.5 rounded-full hover:border-[#4e5f77] transition-all flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              Export as PDF
            </button>
          </div>
          <button className="w-full sm:w-auto font-semibold text-sm bg-[#65a30d] text-white px-10 py-3.5 rounded-full hover:bg-[#4d7c0f] hover:scale-[1.02] transition-all shadow-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Mark as paid
          </button>
        </div>

      </main>
      
      </>
  );
}
