'use client';

import { useState } from 'react';
import { Search, UserCircle, MoreHorizontal, Mail, Eye, Ban } from 'lucide-react';

const MOCK_CUSTOMERS = Array.from({ length: 15 }).map((_, i) => ({
  id: `CUST-${5000 + i}`,
  name: `Customer Name ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  orders: Math.floor(Math.random() * 20),
  totalSpent: (Math.random() * 2000).toFixed(2),
  joined: `2025-${(i % 12) + 1}-15`,
  status: i % 8 === 0 ? 'Inactive' : 'Active',
}));

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Customers</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">View and manage customer accounts</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search customers by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md bg-[#111111] border border-[#333] rounded-md py-2 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a96e]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222] bg-[#111]">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-md">Customer</th>
                <th className="px-4 py-3 font-medium">Orders</th>
                <th className="px-4 py-3 font-medium">Total Spent</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium rounded-tr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="border-b border-[#222] hover:bg-[#111] transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
                        <UserCircle size={20} className="text-[#666]" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{customer.name}</p>
                        <p className="text-xs text-[#a0a0a0]">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{customer.orders}</td>
                  <td className="px-4 py-3 text-white font-medium">${customer.totalSpent}</td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{customer.joined}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                      ${customer.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'}
                    `}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setSelectedCustomer(customer)} className="p-1.5 text-gray-400 hover:text-white hover:bg-[#222] rounded" title="View Profile"><Eye size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#222] rounded" title="Email Customer"><Mail size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded" title="Disable Account"><Ban size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#0a0a0a] border border-[#333] rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-[#333] flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#c9a96e] flex items-center justify-center">
                  <UserCircle size={32} className="text-[#c9a96e]" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-white">{selectedCustomer.name}</h2>
                  <p className="text-sm text-[#a0a0a0]">{selectedCustomer.email}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider
                    ${selectedCustomer.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'}
                  `}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[#666] uppercase tracking-wider mb-1">Customer ID</p>
                <p className="text-sm text-white">{selectedCustomer.id}</p>
              </div>
              <div>
                <p className="text-xs text-[#666] uppercase tracking-wider mb-1">Joined Date</p>
                <p className="text-sm text-white">{selectedCustomer.joined}</p>
              </div>
              <div>
                <p className="text-xs text-[#666] uppercase tracking-wider mb-1">Total Orders</p>
                <p className="text-sm text-white">{selectedCustomer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-[#666] uppercase tracking-wider mb-1">Total Spent</p>
                <p className="text-sm text-[#c9a96e] font-medium">${selectedCustomer.totalSpent}</p>
              </div>
            </div>
            <div className="p-6 border-t border-[#333] bg-[#111] rounded-b-xl">
              <h3 className="text-sm font-medium text-white mb-4">Recent Activity</h3>
              <p className="text-sm text-[#a0a0a0] italic">No recent activity to show.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
