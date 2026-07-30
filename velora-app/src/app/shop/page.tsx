'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Filter, ChevronDown, Star, X } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Obsidian Night Bracelet', price: 120, rating: 4.8, category: 'Bracelets', material: 'Silver' },
  { id: '2', name: 'Golden Aura Necklace', price: 250, rating: 4.9, category: 'Necklaces', material: 'Gold' },
  { id: '3', name: 'Silver Whisper Anklet', price: 85, rating: 4.7, category: 'Anklets', material: 'Silver' },
  { id: '4', name: 'Rose Quartz Custom', price: 150, rating: 5.0, category: 'Custom', material: 'Rose Gold' },
  { id: '5', name: 'Midnight Onyx Ring', price: 195, rating: 4.6, category: 'Rings', material: 'Silver' },
  { id: '6', name: 'Celestial Pearl Drop', price: 320, rating: 4.9, category: 'Necklaces', material: 'Gold' },
  { id: '7', name: 'Woven Chain Bracelet', price: 110, rating: 4.5, category: 'Bracelets', material: 'Silver' },
  { id: '8', name: 'Diamond Accent Anklet', price: 280, rating: 4.8, category: 'Anklets', material: 'Gold' },
  { id: '9', name: 'Emerald Cut Pendant', price: 450, rating: 5.0, category: 'Necklaces', material: 'Gold' },
  { id: '10', name: 'Minimalist Cuff', price: 95, rating: 4.4, category: 'Bracelets', material: 'Silver' },
  { id: '11', name: 'Vintage Locket', price: 180, rating: 4.7, category: 'Necklaces', material: 'Rose Gold' },
  { id: '12', name: 'Sapphire Station Bracelet', price: 210, rating: 4.9, category: 'Bracelets', material: 'Platinum' },
];

export default function ShopPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter logic mockup
  const filteredProducts = MOCK_PRODUCTS.filter(p => !selectedCategory || p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header & Breadcrumbs */}
        <div className="mb-12">
          <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#c9a96e]">Shop</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Our Collection</h1>
          <p className="text-gray-400 max-w-2xl font-light">
            Discover our meticulously crafted pieces. Each design embodies timeless elegance and contemporary luxury.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between border-y border-white/10 py-4">
            <button 
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Sort by:</span>
              <select 
                className="bg-transparent border-none outline-none text-white appearance-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured" className="bg-black text-white">Featured</option>
                <option value="price-asc" className="bg-black text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-black text-white">Price: High to Low</option>
                <option value="newest" className="bg-black text-white">Newest</option>
              </select>
            </div>
          </div>

          {/* Sidebar Filters */}
          <aside className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-sm lg:static lg:bg-transparent lg:z-auto lg:w-64 flex-shrink-0 transition-opacity duration-300 ${mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}`}>
            <div className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-[#111] p-6 lg:static lg:h-auto lg:w-full lg:bg-transparent lg:p-0 transform transition-transform duration-500 ${mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} overflow-y-auto`}>
              <div className="flex items-center justify-between lg:hidden mb-8">
                <h2 className="text-xl font-medium">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>

              {/* Filter Sections */}
              <div className="space-y-8 divide-y divide-white/10">
                <div className="pt-0">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-medium">Category</h3>
                  <div className="space-y-3">
                    {['All', 'Bracelets', 'Necklaces', 'Anklets', 'Rings'].map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="category"
                          checked={cat === 'All' ? !selectedCategory : selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat === 'All' ? null : cat)}
                          className="w-4 h-4 accent-[#c9a96e] bg-black border-white/20" 
                        />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-medium">Material</h3>
                  <div className="space-y-3">
                    {['Gold', 'Silver', 'Rose Gold', 'Platinum'].map(mat => (
                      <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded-sm accent-[#c9a96e] bg-black border-white/20" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{mat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-medium">Price Range</h3>
                  <div className="px-2">
                    <input type="range" min="0" max="1000" className="w-full accent-[#c9a96e] bg-white/20 h-1 rounded-full outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#c9a96e] [&::-webkit-slider-thumb]:rounded-full cursor-pointer" />
                    <div className="flex justify-between mt-4 text-sm text-gray-400">
                      <span>$0</span>
                      <span>$1000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <p className="text-sm text-gray-400">Showing {filteredProducts.length} results</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Sort by:</span>
                <div className="relative group cursor-pointer flex items-center gap-1 border border-white/20 px-3 py-1.5 hover:border-white/50 transition-colors">
                  <span>Featured</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/shop/${product.id}`} key={product.id} className="group cursor-pointer block">
                  <div className="aspect-[4/5] bg-white/5 border border-white/10 mb-4 relative overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent absolute inset-0"></div>
                    <div className="w-32 h-32 rounded-full border-2 border-white/10 group-hover:scale-105 transition-transform duration-700 relative flex items-center justify-center">
                        <span className="text-white/20 text-xs">View Detail</span>
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      {product.price > 200 && <span className="bg-[#c9a96e] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1">Premium</span>}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/80 backdrop-blur-sm border-t border-white/10 flex gap-2">
                      <button className="flex-1 py-2 bg-white text-black text-sm font-medium hover:bg-[#c9a96e] transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium group-hover:text-[#c9a96e] transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white">${product.price}</span>
                      <div className="flex items-center text-xs text-[#c9a96e]">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="ml-1 text-gray-500">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-16 text-center border-t border-white/10 pt-16">
              <button className="border border-white/30 text-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300 font-medium">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
