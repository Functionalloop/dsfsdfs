import React, { useState } from 'react';
import { 
  Search, Users, Filter, ArrowUpDown, 
  FileText, Shirt, Smartphone, Bath, Plus, 
  RotateCcw, Share2 
} from 'lucide-react';

interface CheckItem {
  id: string;
  label: string;
  checked: boolean;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: CheckItem[];
}

export default function PackingChecklist() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'docs',
      title: 'Documents',
      icon: <FileText className="w-6 h-6 text-[#65a30d]" />,
      items: [
        { id: 'p1', label: 'Passport', checked: true },
        { id: 'p2', label: 'Flight Tickets (printed)', checked: true },
        { id: 'p3', label: 'Travel Insurance', checked: true },
        { id: 'p4', label: 'Hotel booking confirmation', checked: false },
      ]
    },
    {
      id: 'clothes',
      title: 'Clothing',
      icon: <Shirt className="w-6 h-6 text-[#65a30d]" />,
      items: [
        { id: 'c1', label: 'Casual Shirts (x4)', checked: true },
        { id: 'c2', label: 'Trousers / Jeans (x2)', checked: false },
        { id: 'c3', label: 'Comfortable walking shoes', checked: false },
        { id: 'c4', label: 'Light jacket / windbreaker', checked: false },
      ]
    },
    {
      id: 'elec',
      title: 'Electronics',
      icon: <Smartphone className="w-6 h-6 text-[#65a30d]" />,
      items: [
        { id: 'e1', label: 'Phone charger', checked: false },
        { id: 'e2', label: 'Universal power adapter', checked: true },
        { id: 'e3', label: 'Earphones / Headphones', checked: false },
      ]
    },
    {
      id: 'wash',
      title: 'Toiletries',
      icon: <Bath className="w-6 h-6 text-[#65a30d]" />,
      items: [
        { id: 't1', label: 'Toothbrush & Paste', checked: false },
        { id: 't2', label: 'Deodorant', checked: false },
        { id: 't3', label: 'Travel-sized Shampoo', checked: false },
        { id: 't4', label: 'Sunscreen', checked: false },
      ]
    }
  ]);

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === itemId ? { ...item, checked: !item.checked } : item
          )
        };
      }
      return cat;
    }));
  };

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const packedItems = categories.reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0);
  const progress = Math.round((packedItems / totalItems) * 100) || 0;

  return (
    <>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Packing Checklist</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl">Trip: Paris & Rome Adventure</p>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search item..." 
                className="w-full h-12 pl-12 pr-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="h-12 px-6 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" /> Group by
              </button>
              <button className="h-12 px-6 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="h-12 px-6 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" /> Sort by...
              </button>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-2">
            <span className="font-semibold text-sm text-gray-900">Progress: {packedItems}/{totalItems} items packed</span>
            <span className="font-bold text-sm text-[#4d7c0f]">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#4d7c0f] rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          
          {categories.map((category) => {
            const packedInCategory = category.items.filter(i => i.checked).length;
            
            return (
              <div key={category.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    {category.icon} {category.title}
                  </h2>
                  <span className="text-xs font-semibold text-gray-400">{packedInCategory}/{category.items.length}</span>
                </div>
                
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox" 
                          checked={item.checked}
                          onChange={() => toggleItem(category.id, item.id)}
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#65a30d]/30 focus:ring-offset-2 checked:border-[#65a30d] checked:bg-[#65a30d] transition-colors cursor-pointer"
                        />
                        <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      </div>
                      <span className={`text-[15px] font-medium transition-colors ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700 group-hover:text-[#65a30d]'}`}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Add New Category Card */}
          <button className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 hover:text-[#65a30d] hover:border-[#65a30d] hover:bg-[#f7fee7]/50 transition-all min-h-[240px] group">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 group-hover:bg-[#ecfccb] group-hover:border-[#ecfccb] transition-colors shadow-sm">
              <Plus className="w-6 h-6 text-current" />
            </div>
            <span className="font-bold text-lg">Add Category</span>
          </button>
          
        </div>

        {/* Bottom Action Bar */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-8 border-t border-gray-200">
          <button className="w-full sm:w-auto h-12 px-6 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Reset all
          </button>
          <button className="w-full sm:w-auto h-12 px-6 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" /> Share Checklist
          </button>
          <button className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#65a30d] text-white font-semibold text-sm hover:bg-[#4d7c0f] transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add item to checklist
          </button>
        </div>

      </main>
      
      </>
  );
}
