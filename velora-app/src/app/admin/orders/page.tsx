'use client';

import { useState } from 'react';
import { Search, Filter, ChevronDown, CheckSquare, Square, Eye, XCircle } from 'lucide-react';

const MOCK_ORDERS = Array.from({ length: 15 }).map((_, i) => ({
  id: `ORD-${8000 + i}`,
  customer: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  items: Math.floor(Math.random() * 5) + 1,
  total: (Math.random() * 500 + 50).toFixed(2),
  status: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'][i % 5],
  date: `2026-07-${28 - (i % 7)}`,
}));

const TABS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedOrders(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredOrders = activeTab === 'All' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Orders</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">Manage and track customer orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors
              ${activeTab === tab 
                ? 'bg-[#c9a96e] text-black font-medium' 
                : 'bg-[#111] text-[#a0a0a0] hover:text-white border border-[#333]'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by order number or customer..." 
              className="w-full bg-[#111111] border border-[#333] rounded-md py-2 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a96e]"
            />
          </div>
          {selectedOrders.length > 0 && (
            <button className="px-4 py-2 bg-[#222] border border-[#333] text-white rounded text-sm hover:border-[#c9a96e]">
              Update Status ({selectedOrders.length})
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222] bg-[#111]">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-md w-10">
                  <Square size={16} className="text-[#666]" />
                </th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium rounded-tr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const isSelected = selectedOrders.includes(order.id);
                return (
                  <tr key={order.id} className="border-b border-[#222] hover:bg-[#111] transition-colors group cursor-pointer">
                    <td className="px-4 py-3" onClick={(e) => { e.stopPropagation(); toggleSelect(order.id); }}>
                      {isSelected ? <CheckSquare size={16} className="text-[#c9a96e]" /> : <Square size={16} className="text-[#666]" />}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-white">{order.customer}</p>
                      <p className="text-xs text-[#666]">{order.email}</p>
                    </td>
                    <td className="px-4 py-3 text-[#a0a0a0]">{order.date}</td>
                    <td className="px-4 py-3 text-[#a0a0a0]">{order.items} items</td>
                    <td className="px-4 py-3 text-white font-medium">${order.total}</td>
                    <td className="px-4 py-3">
                      <div className="relative inline-block">
                        <select className={`appearance-none bg-transparent pl-3 pr-8 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider outline-none cursor-pointer border
                          ${order.status === 'Processing' ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10' :
                            order.status === 'Shipped' ? 'border-blue-500/30 text-blue-500 bg-blue-500/10' :
                            order.status === 'Delivered' ? 'border-green-500/30 text-green-500 bg-green-500/10' :
                            order.status === 'Cancelled' ? 'border-red-500/30 text-red-500 bg-red-500/10' :
                            'border-gray-500/30 text-gray-400 bg-gray-500/10'
                          }
                        `} defaultValue={order.status} onClick={e => e.stopPropagation()}>
                          <option value="Pending" className="bg-[#111] text-white">Pending</option>
                          <option value="Processing" className="bg-[#111] text-white">Processing</option>
                          <option value="Shipped" className="bg-[#111] text-white">Shipped</option>
                          <option value="Delivered" className="bg-[#111] text-white">Delivered</option>
                          <option value="Cancelled" className="bg-[#111] text-white">Cancelled</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-[#c9a96e] hover:bg-[#222] rounded" title="View Details"><Eye size={16} /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded" title="Cancel Order"><XCircle size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
