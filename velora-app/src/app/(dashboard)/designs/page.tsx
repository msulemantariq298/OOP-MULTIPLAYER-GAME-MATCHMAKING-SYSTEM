'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenTool, Trash2, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

const MOCK_DESIGNS = [
  { id: 'des-1', name: 'Anniversary Bracelet', type: 'Bracelet', date: 'Oct 12, 2023', price: 420 },
  { id: 'des-2', name: 'Minimalist Chain', type: 'Necklace', date: 'Nov 05, 2023', price: 310 },
  { id: 'des-3', name: 'Custom Gemstone Ring', type: 'Ring', date: 'Jan 22, 2024', price: 890 },
];

export default function DesignsPage() {
  const handleDelete = () => {
    toast.success('Design deleted');
  };

  const handleAddToCart = () => {
    toast.success('Added to cart');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">My Designs</h1>
          <p className="text-[#a0a0a0]">Your custom created jewelry pieces</p>
        </div>
        <Link href="/builder">
          <Button className="bg-[#c9a96e] hover:bg-[#b89a5f] text-black w-full sm:w-auto">
            Create New Design
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DESIGNS.map((design) => (
          <Card key={design.id} className="bg-[#0a0a0a] border-white/10 overflow-hidden flex flex-col">
            <div className="aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#050505] relative flex items-center justify-center p-6">
              {/* Placeholder for actual 3D render/canvas thumbnail */}
              <div className="w-full h-full border border-dashed border-white/20 rounded-full opacity-50 flex items-center justify-center">
                <span className="text-white/30 text-sm font-medium tracking-widest uppercase">{design.type}</span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="font-semibold text-lg">{design.name}</h3>
                <p className="text-sm text-[#a0a0a0] mb-2">Created on {design.date}</p>
                <p className="text-[#c9a96e] font-medium">{formatPrice(design.price)}</p>
              </div>
              
              <div className="mt-auto space-y-2">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </Button>
                <div className="flex gap-2">
                  <Link href={`/builder?design=${design.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white flex items-center justify-center gap-2">
                      <PenTool className="w-4 h-4" /> Edit
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleDelete} className="px-3 border-white/10 hover:bg-red-500/10 hover:text-red-500 text-white transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
