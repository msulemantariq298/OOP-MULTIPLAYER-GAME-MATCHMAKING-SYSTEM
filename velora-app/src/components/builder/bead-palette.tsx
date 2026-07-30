'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useBuilderStore } from '@/stores/builder-store';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, generateId } from '@/lib/utils';
import { Bead } from '@/types';

const MOCK_BEADS: Bead[] = [
  { id: 'b1', name: 'Ruby', price: 15, color: '#e0115f', category: 'Gemstones', material: 'Gemstone' },
  { id: 'b2', name: 'Sapphire', price: 18, color: '#0f52ba', category: 'Gemstones', material: 'Gemstone' },
  { id: 'b3', name: 'Emerald', price: 20, color: '#50c878', category: 'Gemstones', material: 'Gemstone' },
  { id: 'b4', name: 'Amethyst', price: 12, color: '#9966cc', category: 'Gemstones', material: 'Gemstone' },
  { id: 'b5', name: 'Topaz', price: 14, color: '#ffc87c', category: 'Gemstones', material: 'Gemstone' },
  { id: 'b6', name: 'Opal', price: 22, color: '#a8c3bc', category: 'Gemstones', material: 'Gemstone' },
  { id: 'b7', name: 'Garnet', price: 10, color: '#733635', category: 'Gemstones', material: 'Gemstone' },
  { id: 'b8', name: 'Aquamarine', price: 16, color: '#7fffd4', category: 'Gemstones', material: 'Gemstone' },
  
  { id: 'b9', name: 'Gold Bead', price: 25, color: '#ffd700', category: 'Metals', material: 'Gold' },
  { id: 'b10', name: 'Silver Bead', price: 15, color: '#c0c0c0', category: 'Metals', material: 'Silver' },
  { id: 'b11', name: 'Rose Gold', price: 20, color: '#b76e79', category: 'Metals', material: 'Gold' },
  { id: 'b12', name: 'Platinum', price: 25, color: '#e5e4e2', category: 'Metals', material: 'Platinum' },
  { id: 'b13', name: 'Copper', price: 5, color: '#b87333', category: 'Metals', material: 'Copper' },
  { id: 'b14', name: 'Bronze', price: 5, color: '#cd7f32', category: 'Metals', material: 'Bronze' },
  
  { id: 'b15', name: 'Murano Blue', price: 8, color: '#2b547e', category: 'Glass', material: 'Glass' },
  { id: 'b16', name: 'Crystal Clear', price: 6, color: '#ffffff', category: 'Glass', material: 'Glass' },
  { id: 'b17', name: 'Amber Glass', price: 7, color: '#ffbf00', category: 'Glass', material: 'Glass' },
  { id: 'b18', name: 'Jade Green', price: 9, color: '#00a86b', category: 'Glass', material: 'Glass' },
  { id: 'b19', name: 'Ocean Teal', price: 8, color: '#008080', category: 'Glass', material: 'Glass' },
  
  { id: 'b20', name: 'Swarovski Clear', price: 12, color: '#f5f5f5', category: 'Crystal', material: 'Crystal' },
  { id: 'b21', name: 'Diamond Cut', price: 18, color: '#e0ffff', category: 'Crystal', material: 'Crystal' },
  { id: 'b22', name: 'Aurora Borealis', price: 15, color: '#ab82ff', category: 'Crystal', material: 'Crystal' },
  { id: 'b23', name: 'Midnight Crystal', price: 14, color: '#191970', category: 'Crystal', material: 'Crystal' },
  
  { id: 'b24', name: 'Heart Charm', price: 10, color: '#ffb6c1', category: 'Charms', material: 'Silver' },
  { id: 'b25', name: 'Star Charm', price: 10, color: '#fafad2', category: 'Charms', material: 'Silver' },
  { id: 'b26', name: 'Moon Charm', price: 10, color: '#f8f8ff', category: 'Charms', material: 'Silver' },
  { id: 'b27', name: 'Infinity Charm', price: 12, color: '#c0c0c0', category: 'Charms', material: 'Silver' },
  { id: 'b28', name: 'Crown Charm', price: 15, color: '#ffd700', category: 'Charms', material: 'Gold' },
  { id: 'b29', name: 'Butterfly Charm', price: 12, color: '#dda0dd', category: 'Charms', material: 'Silver' },
  { id: 'b30', name: 'Anchor Charm', price: 10, color: '#708090', category: 'Charms', material: 'Silver' },
  { id: 'b31', name: 'Feather Charm', price: 11, color: '#f0f8ff', category: 'Charms', material: 'Silver' },
  
  { id: 'b32', name: 'Gold Spacer', price: 5, color: '#ffd700', category: 'Spacers', material: 'Gold' },
  { id: 'b33', name: 'Silver Spacer', price: 3, color: '#c0c0c0', category: 'Spacers', material: 'Silver' },
  { id: 'b34', name: 'Diamond Spacer', price: 8, color: '#e0ffff', category: 'Spacers', material: 'Crystal' },
  { id: 'b35', name: 'Rope Spacer', price: 4, color: '#cd7f32', category: 'Spacers', material: 'Bronze' },
];

const CATEGORIES = ['All', 'Gemstones', 'Metals', 'Glass', 'Crystal', 'Charms', 'Spacers'];

export function BeadPalette() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { addBead } = useBuilderStore();

  const filteredBeads = MOCK_BEADS.filter((bead) => {
    const matchesSearch = bead.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || bead.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddBead = (bead: Bead) => {
    addBead(bead);
  };

  return (
    <div className="w-80 flex flex-col bg-[#0a0a0a] border-r border-white/10 h-full overflow-hidden">
      <div className="p-4 border-b border-white/10 space-y-4">
        <h2 className="text-lg font-medium text-white tracking-wide font-serif">Bead Library</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search beads..." 
            className="pl-9 bg-[#111111] border-white/20 text-white placeholder:text-white/40 h-9 rounded-md"
          />
        </div>
        <div className="w-full overflow-x-auto pb-2 scrollbar-none">
          <div className="flex space-x-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs transition-colors whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-[#c9a96e] text-black font-medium" 
                    : "bg-[#1a1a1a] text-white/70 hover:bg-[#222222] hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredBeads.map((bead) => (
            <div 
              key={bead.id} 
              onClick={() => handleAddBead(bead)}
              className="group cursor-pointer p-3 rounded-lg border border-white/10 bg-[#111111] hover:border-[#c9a96e]/50 hover:bg-[#1a1a1a] transition-all flex flex-col items-center gap-2"
            >
              <div 
                className="w-12 h-12 rounded-full shadow-inner flex items-center justify-center transform group-hover:scale-110 transition-transform"
                style={{ 
                  backgroundColor: bead.color,
                  boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.4)`
                }}
              />
              <div className="text-center w-full">
                <p className="text-sm text-white/90 truncate font-medium">{bead.name}</p>
                <p className="text-xs text-[#c9a96e] mt-0.5">${bead.price}</p>
              </div>
            </div>
          ))}
          {filteredBeads.length === 0 && (
            <div className="col-span-2 text-center py-8 text-white/50 text-sm">
              No beads found matching your criteria.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
