'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Heart, Share2, ChevronRight, Minus, Plus, Truck, RotateCcw, ShieldCheck } from 'lucide-react';

const MOCK_PRODUCTS = [
  { 
    id: '1', 
    name: 'Obsidian Night Bracelet', 
    price: 120, 
    rating: 4.8, 
    reviews: 124,
    description: 'A striking statement piece crafted with genuine obsidian stones and accented with sterling silver details. Perfect for adding a touch of dark elegance to any ensemble. Each stone is carefully hand-selected for its deep, flawless color and energetic properties.',
    details: [
      'Genuine natural obsidian stones (8mm)',
      '925 Sterling Silver accents',
      'Durable elastic core',
      'Handcrafted in our studio'
    ]
  },
  // Fallback for others
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = MOCK_PRODUCTS.find(p => p.id === id) || { ...MOCK_PRODUCTS[0], name: 'Velora Signature Piece' };

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#c9a96e] truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white/5 border border-white/10 relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent absolute inset-0"></div>
              <div className="w-64 h-64 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-gray-500">Main Product Image</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <button key={i} className={`aspect-square bg-white/5 border flex items-center justify-center ${i === 1 ? 'border-[#c9a96e]' : 'border-white/10 hover:border-white/30'}`}>
                   <span className="text-[10px] text-gray-600">Thumb {i}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-medium">${product.price}</span>
              <div className="h-4 w-[1px] bg-white/20"></div>
              <div className="flex items-center gap-2">
                <div className="flex text-[#c9a96e]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-700'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-gray-400 font-light leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-6 mb-8 pb-8 border-b border-white/10">
              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">Size</span>
                  <button className="text-xs text-gray-500 underline hover:text-white">Size Guide</button>
                </div>
                <div className="flex gap-3">
                  {['S', 'M', 'L'].map(size => (
                    <button key={size} className={`w-12 h-12 border flex items-center justify-center transition-colors ${size === 'M' ? 'border-[#c9a96e] text-[#c9a96e]' : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="text-sm font-medium block mb-3">Quantity</span>
                <div className="flex items-center border border-white/20 w-32 h-12">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="flex-1 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 bg-white text-black h-14 font-medium tracking-wide hover:bg-[#c9a96e] transition-colors duration-300">
                Add to Cart
              </button>
              <button className="w-full sm:w-14 h-14 border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-14 h-14 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-white/5 bg-white/[0.02] p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-5 h-5 text-[#c9a96e]" />
                <span className="text-xs text-gray-400">Free global shipping on orders over $200</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#c9a96e]" />
                <span className="text-xs text-gray-400">Lifetime warranty on craftsmanship</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#c9a96e]" />
                <span className="text-xs text-gray-400">30-day hassle-free returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto">
            {['description', 'materials', 'shipping'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium uppercase tracking-wider whitespace-nowrap transition-colors relative ${activeTab === tab ? 'text-[#c9a96e]' : 'text-gray-500 hover:text-white'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c9a96e]"></div>}
              </button>
            ))}
          </div>

          <div className="min-h-[200px] text-gray-400 font-light leading-relaxed max-w-3xl">
            {activeTab === 'description' && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <p>{product.description}</p>
                <ul className="list-disc pl-5 space-y-2 mt-6">
                  {product.details?.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'materials' && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <p>We source only the finest materials for our creations. Our gold is 18k solid or heavy vermeil, and all stones are ethically sourced and hand-cut by master lapidaries.</p>
                <p>Avoid exposing your jewelry to harsh chemicals, perfumes, or water to maintain its luster. Store in the provided velvet pouch when not in use.</p>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <p>Standard Shipping: 3-5 business days (Free over $200)</p>
                <p>Express Shipping: 1-2 business days ($15 flat rate)</p>
                <p>International delivery available to most countries. Duties and taxes calculated at checkout.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
