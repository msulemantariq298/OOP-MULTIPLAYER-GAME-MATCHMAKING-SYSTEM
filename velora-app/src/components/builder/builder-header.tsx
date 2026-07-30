'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Download, ShoppingBag } from 'lucide-react';
import { useBuilderStore } from '@/stores/builder-store';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function BuilderHeader() {
  const { name, setName, placedBeads, totalPrice, baseType } = useBuilderStore();
  const { addItem } = useCartStore();

  const handleSave = () => {
    toast.success('Design saved to your profile!');
  };

  const handleExport = () => {
    toast.success('Design exported successfully!');
  };

  const handleAddToCart = () => {
    addItem({
      name: name || `Custom ${baseType}`,
      type: 'design',
      price: totalPrice,
      quantity: 1,
      beads: placedBeads,
      image: '/images/custom-placeholder.png'
    });
    
    toast.success('Added to cart!');
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-black border-b border-white/10 z-50 relative">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-white/70 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <Link href="/" className="font-serif text-xl tracking-widest text-white">
          VELORA
        </Link>
      </div>

      <div className="flex-1 max-w-sm mx-8">
        <Input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name your design..."
          className="bg-transparent border-white/20 text-center text-white focus:border-white/50 h-9"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleSave} className="border-white/20 text-white hover:bg-white/10">
          <Save size={16} className="mr-2" /> Save
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport} className="border-white/20 text-white hover:bg-white/10">
          <Download size={16} className="mr-2" /> Export
        </Button>
        <Button size="sm" onClick={handleAddToCart} className="bg-[#c9a96e] hover:bg-[#b8985d] text-black">
          <ShoppingBag size={16} className="mr-2" /> Add to Cart
        </Button>
      </div>
    </header>
  );
}
