'use client';

import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Copy, Trash2, Image as ImageIcon } from 'lucide-react';

const MOCK_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `PRD-${1000 + i}`,
  name: `Luxury Product ${i + 1}`,
  category: ['Necklaces', 'Bracelets', 'Rings', 'Earrings'][i % 4],
  price: (150 + i * 45).toFixed(2),
  stock: Math.floor(Math.random() * 50) + 1,
  status: i % 5 === 0 ? 'Draft' : 'Active',
  rating: (4 + Math.random()).toFixed(1),
}));

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Products</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">Manage your jewelry catalog</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985d] text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#333] rounded-md py-2 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a96e]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#333] rounded-md text-sm hover:bg-[#1a1a1a] transition-colors text-[#a0a0a0]">
            <Filter size={16} /> Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222] bg-[#111]">
              <tr>
                <th className="px-4 py-3 font-medium rounded-tl-md">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium rounded-tr-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="border-b border-[#222] hover:bg-[#111] transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-[#222] to-[#111] flex items-center justify-center border border-[#333]">
                        <ImageIcon size={16} className="text-[#666]" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-xs text-[#666]">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{product.category}</td>
                  <td className="px-4 py-3 text-white">${product.price}</td>
                  <td className="px-4 py-3 text-[#a0a0a0]">{product.stock}</td>
                  <td className="px-4 py-3 text-[#a0a0a0]">★ {product.rating}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                      ${product.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'}
                    `}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#222] rounded"><Edit size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-[#222] rounded"><Copy size={16} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-[#222] rounded"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-[#666]">
          <p>Showing 1 to 12 of 48 entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-[#111] border border-[#333] rounded hover:bg-[#222] text-white">Prev</button>
            <button className="px-3 py-1 bg-[#c9a96e] text-black rounded font-medium">1</button>
            <button className="px-3 py-1 bg-[#111] border border-[#333] rounded hover:bg-[#222] text-white">2</button>
            <button className="px-3 py-1 bg-[#111] border border-[#333] rounded hover:bg-[#222] text-white">3</button>
            <button className="px-3 py-1 bg-[#111] border border-[#333] rounded hover:bg-[#222] text-white">Next</button>
          </div>
        </div>
      </div>

      {/* Add Product Modal (Simple rendering) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#0a0a0a] border border-[#333] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0a0a0a] p-6 border-b border-[#333] flex justify-between items-center z-10">
              <h2 className="text-lg font-medium text-white">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">Product Name</label>
                <input type="text" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white focus:border-[#c9a96e] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Price</label>
                  <input type="number" className="w-full bg-[#111] border border-[#333] rounded p-2 text-white focus:border-[#c9a96e] outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0a0] mb-1">Category</label>
                  <select className="w-full bg-[#111] border border-[#333] rounded p-2 text-white focus:border-[#c9a96e] outline-none">
                    <option>Necklaces</option>
                    <option>Bracelets</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">Description</label>
                <textarea rows={4} className="w-full bg-[#111] border border-[#333] rounded p-2 text-white focus:border-[#c9a96e] outline-none"></textarea>
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#0a0a0a] p-6 border-t border-[#333] flex justify-end gap-3 z-10">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-[#333] text-white rounded hover:bg-[#111]">Cancel</button>
              <button className="px-4 py-2 bg-[#c9a96e] text-black font-medium rounded hover:bg-[#b8985d]">Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
