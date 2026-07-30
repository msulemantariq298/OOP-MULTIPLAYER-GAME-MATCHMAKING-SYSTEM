'use client';

import { useState } from 'react';
import { Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';

const MOCK_BEADS = Array.from({ length: 15 }).map((_, i) => {
  const materials = ['Gold', 'Silver', 'Rose Gold', 'Platinum', 'Glass', 'Wood'];
  const colors = ['#FFD700', '#C0C0C0', '#B76E79', '#E5E4E2', '#000000', '#8B4513'];
  const cat = i % materials.length;
  return {
    id: `BD-${2000 + i}`,
    name: `${materials[cat]} Bead ${i + 1}`,
    category: materials[cat],
    material: materials[cat],
    price: (5 + i * 2).toFixed(2),
    stock: Math.floor(Math.random() * 500) + 10,
    color: colors[cat]
  };
});

export default function BeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Beads</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">Manage individual beads for custom designs</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985d] text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Add Bead
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search beads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#333] rounded-md py-2 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a96e]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#333] rounded-md text-sm hover:bg-[#1a1a1a] transition-colors text-[#a0a0a0]">
            <Filter size={16} /> Material
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222] bg-[#111]">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-md w-16">Color</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Material</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium rounded-tr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BEADS.map((bead) => (
                <tr key={bead.id} className="border-b border-[#222] hover:bg-[#111] transition-colors group">
                  <td className="px-4 py-3">
                    <div 
                      className="w-6 h-6 rounded-full border border-[#333] shadow-sm"
                      style={{ backgroundColor: bead.color }}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{bead.name}</p>
                    <p className="text-xs text-[#666]">{bead.id}</p>
                  </td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{bead.material}</td>
                  <td className="px-4 py-3 text-white">${bead.price}</td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{bead.stock}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#222] rounded"><Edit size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#0a0a0a] border border-[#333] rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-[#333] flex justify-between items-center">
              <h2 className="text-lg font-medium text-white">Add New Bead</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">Bead Name</label>
                <input type="text" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white focus:border-[#c9a96e] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Material</label>
                  <input type="text" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Color (Hex)</label>
                  <div className="flex gap-2">
                    <input type="color" className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0" defaultValue="#c9a96e" />
                    <input type="text" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none" defaultValue="#c9a96e" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Price</label>
                  <input type="number" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Initial Stock</label>
                  <input type="number" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#333] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-[#333] text-white rounded hover:bg-[#111]">Cancel</button>
              <button className="px-4 py-2 bg-[#c9a96e] text-black font-medium rounded hover:bg-[#b8985d]">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
