'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const MOCK_COUPONS = [
  { id: '1', code: 'SUMMER20', type: '%', value: 20, minOrder: 100, maxUses: 500, used: 342, expires: '2026-08-31', status: 'Active' },
  { id: '2', code: 'WELCOME10', type: '$', value: 10, minOrder: 50, maxUses: null, used: 1250, expires: null, status: 'Active' },
  { id: '3', code: 'VIPGOLD', type: '%', value: 30, minOrder: 500, maxUses: 100, used: 98, expires: '2026-12-31', status: 'Active' },
  { id: '4', code: 'WINTERSALE', type: '%', value: 25, minOrder: 150, maxUses: 1000, used: 1000, expires: '2026-02-28', status: 'Expired' },
  { id: '5', code: 'FREESHIP', type: 'Free Shipping', value: null, minOrder: 75, maxUses: null, used: 450, expires: null, status: 'Disabled' },
];

export default function CouponsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Coupons</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">Manage discount codes and promotions</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985d] text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222] bg-[#111]">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-md">Code</th>
                <th className="px-4 py-3 font-medium">Discount</th>
                <th className="px-4 py-3 font-medium">Min Order</th>
                <th className="px-4 py-3 font-medium">Usage</th>
                <th className="px-4 py-3 font-medium">Expires</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium rounded-tr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_COUPONS.map((coupon) => (
                <tr key={coupon.id} className="border-b border-[#222] hover:bg-[#111] transition-colors group">
                  <td className="px-4 py-3">
                    <span className="font-mono text-white bg-[#222] px-2 py-1 rounded">{coupon.code}</span>
                  </td>
                  <td className="px-4 py-3 text-white">
                    {coupon.type === 'Free Shipping' ? 'Free Shipping' : `${coupon.value}${coupon.type}`}
                  </td>
                  <td className="px-4 py-3 text-[#a0a0a0]">${coupon.minOrder}</td>
                  <td className="px-4 py-3 text-[#a0a0a0]">
                    {coupon.used} / {coupon.maxUses || '∞'}
                  </td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{coupon.expires || 'Never'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                      ${coupon.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                        coupon.status === 'Expired' ? 'bg-red-500/10 text-red-500' :
                        'bg-gray-500/10 text-gray-400'
                      }
                    `}>
                      {coupon.status}
                    </span>
                  </td>
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
              <h2 className="text-lg font-medium text-white">Create Coupon</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">Coupon Code</label>
                <input type="text" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white font-mono uppercase focus:border-[#c9a96e] outline-none" placeholder="e.g. SUMMER20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Discount Type</label>
                  <select className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none focus:border-[#c9a96e]">
                    <option>Percentage (%)</option>
                    <option>Fixed Amount ($)</option>
                    <option>Free Shipping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Value</label>
                  <input type="number" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none focus:border-[#c9a96e]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Min Order Amount</label>
                  <input type="number" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none focus:border-[#c9a96e]" />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Max Uses (optional)</label>
                  <input type="number" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none focus:border-[#c9a96e]" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">Expiry Date (optional)</label>
                <input type="date" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white outline-none focus:border-[#c9a96e]" />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="active" defaultChecked className="accent-[#c9a96e] w-4 h-4 rounded" />
                <label htmlFor="active" className="text-sm text-white">Active immediately</label>
              </div>
            </div>
            <div className="p-6 border-t border-[#333] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-[#333] text-white rounded hover:bg-[#111]">Cancel</button>
              <button className="px-4 py-2 bg-[#c9a96e] text-black font-medium rounded hover:bg-[#b8985d]">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
