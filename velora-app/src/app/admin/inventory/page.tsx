'use client';

import { useState } from 'react';
import { Search, AlertTriangle, PackageOpen, XOctagon, DollarSign, Filter, RefreshCcw } from 'lucide-react';

const MOCK_INVENTORY = Array.from({ length: 20 }).map((_, i) => {
  const stock = Math.floor(Math.random() * 100);
  const reorder = 20;
  let status = 'In Stock';
  if (stock === 0) status = 'Out of Stock';
  else if (stock < 10) status = 'Critical';
  else if (stock <= reorder) status = 'Low';
  
  return {
    id: `INV-${3000 + i}`,
    name: `Item ${i + 1}`,
    type: i % 3 === 0 ? 'Bead' : 'Product',
    stock,
    reorder,
    lastRestocked: `2026-07-${28 - (i % 15)}`,
    status,
    value: (Math.random() * 50 + 10).toFixed(2)
  };
});

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState('');

  const handleEdit = (id: string, current: number) => {
    setEditingId(id);
    setEditVal(current.toString());
  };

  const saveEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Inventory Management</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">Track and manage your stock levels</p>
        </div>
        <button className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985d] text-black px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <RefreshCcw size={16} /> Bulk Reorder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: '1,248', icon: PackageOpen, color: 'text-blue-500' },
          { label: 'Low Stock', value: '24', icon: AlertTriangle, color: 'text-yellow-500' },
          { label: 'Out of Stock', value: '5', icon: XOctagon, color: 'text-red-500' },
          { label: 'Total Value', value: '$84,520', icon: DollarSign, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-[#222] rounded-xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-[#111] border border-[#333] flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[#a0a0a0] text-sm">{stat.label}</p>
              <h3 className="text-xl font-bold mt-1 text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#333] rounded-md py-2 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a96e]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#333] rounded-md text-sm hover:bg-[#1a1a1a] transition-colors text-[#a0a0a0]">
            <Filter size={16} /> Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222] bg-[#111]">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-md">Item</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Current Stock</th>
                <th className="px-4 py-3 font-medium">Reorder Level</th>
                <th className="px-4 py-3 font-medium">Last Restocked</th>
                <th className="px-4 py-3 font-medium rounded-tr-md">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVENTORY.map((item) => (
                <tr key={item.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{item.name}</p>
                    <p className="text-xs text-[#666]">{item.id}</p>
                  </td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{item.type}</td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={editVal}
                          onChange={(e) => setEditVal(e.target.value)}
                          className="w-20 bg-[#111] border border-[#c9a96e] rounded p-1 text-white text-sm outline-none"
                          autoFocus
                          onBlur={saveEdit}
                          onKeyDown={e => e.key === 'Enter' && saveEdit()}
                        />
                      </div>
                    ) : (
                      <span 
                        className="cursor-pointer border-b border-dashed border-[#666] hover:text-white"
                        onClick={() => handleEdit(item.id, item.stock)}
                        title="Click to edit"
                      >
                        {item.stock}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{item.reorder}</td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{item.lastRestocked}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                      ${item.status === 'In Stock' ? 'bg-green-500/10 text-green-500' :
                        item.status === 'Low' ? 'bg-yellow-500/10 text-yellow-500' :
                        item.status === 'Critical' ? 'bg-red-500/10 text-red-500' :
                        'bg-gray-500/10 text-gray-400'
                      }
                    `}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
