import React, { useState } from 'react';
import { Search, Trash2, ExternalLink, Heart, MapPin, Calendar, DollarSign } from 'lucide-react';

interface BookmarkItem {
  id: string;
  user: string;
  userEmail: string;
  tripTitle: string;
  destination: string;
  savedDate: string;
  price: string;
  image: string;
  avatar: string;
}

const mockBookmarks: BookmarkItem[] = [
  { id: '1', user: 'Sarah Chen', userEmail: 'sarah@email.com', tripTitle: 'Romantic Paris Getaway', destination: 'Paris, France', savedDate: '2026-05-08', price: '$2,500', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=300', avatar: 'SC' },
  { id: '2', user: 'Alex Morgan', userEmail: 'alex@email.com', tripTitle: 'Tokyo Cultural Immersion', destination: 'Tokyo, Japan', savedDate: '2026-05-07', price: '$3,800', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=300', avatar: 'AM' },
  { id: '3', user: 'Maria Garcia', userEmail: 'maria@email.com', tripTitle: 'Bali Wellness Retreat', destination: 'Bali, Indonesia', savedDate: '2026-05-06', price: '$1,800', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=300', avatar: 'MG' },
  { id: '4', user: 'David Lee', userEmail: 'david@email.com', tripTitle: 'Swiss Alps Adventure', destination: 'Switzerland', savedDate: '2026-05-05', price: '$4,100', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=300', avatar: 'DL' },
  { id: '5', user: 'Emma Brown', userEmail: 'emma@email.com', tripTitle: 'Santorini Romance', destination: 'Santorini, Greece', savedDate: '2026-05-04', price: '$3,200', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=300', avatar: 'EB' },
  { id: '6', user: 'Raj Patel', userEmail: 'raj@email.com', tripTitle: 'Maldives Paradise', destination: 'Maldives', savedDate: '2026-05-03', price: '$5,500', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=300', avatar: 'RP' },
];

export default function AdminBookmarks() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockBookmarks.filter(b =>
    b.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.tripTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by user
  const grouped = filtered.reduce((acc, b) => {
    if (!acc[b.user]) acc[b.user] = [];
    acc[b.user].push(b);
    return acc;
  }, {} as Record<string, BookmarkItem[]>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Bookmarks & Savings</h1>
          <p className="text-slate-400 mt-1">View and manage user-saved trips and wishlists.</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          <span><strong className="text-white">{mockBookmarks.length}</strong> total saves</span>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input type="text" placeholder="Search by user, trip, or destination..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 h-10 pl-10 pr-4 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-500/50 outline-none transition-all" />
      </div>

      {/* Grouped Bookmarks */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([user, items]) => (
          <div key={user} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400">
                {items[0].avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{user}</p>
                <p className="text-xs text-slate-500">{items[0].userEmail} · {items.length} saved trips</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {items.map(b => (
                <div key={b.id} className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden group hover:border-slate-600 transition-all">
                  <div className="h-28 relative overflow-hidden">
                    <img src={b.image} alt={b.tripTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-900/80 text-red-400 hover:bg-red-500/20 transition-all backdrop-blur-sm">
                      <Heart className="w-3.5 h-3.5 fill-red-400" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{b.tripTitle}</h4>
                    <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{b.destination}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{b.price}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Saved {new Date(b.savedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <div className="flex gap-1">
                        <button className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"><ExternalLink className="w-3 h-3" /></button>
                        <button className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
