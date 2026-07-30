'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

const MOCK_WISHLIST = [
  { id: 1, name: 'Eternity Diamond Ring', price: 2500, image: 'https://images.unsplash.com/photo-1605100804763-247f66126e28?w=400&q=80' },
  { id: 2, name: 'Sapphire Drop Earrings', price: 1200, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80' },
  { id: 3, name: 'Rose Gold Bangle', price: 850, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80' },
  { id: 4, name: 'Pearl Pendant Necklace', price: 650, image: 'https://images.unsplash.com/photo-1599643478514-4a4e06b9868f?w=400&q=80' },
];

export default function WishlistPage() {
  const handleRemove = () => {
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = () => {
    toast.success('Added to cart');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">My Wishlist</h1>
        <p className="text-[#a0a0a0]">Pieces you've saved for later</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_WISHLIST.map((item) => (
          <Card key={item.id} className="bg-[#0a0a0a] border-white/10 overflow-hidden group">
            <div className="relative aspect-square bg-[#111]">
              <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <button 
                onClick={handleRemove}
                className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-medium text-lg mb-1 truncate">{item.name}</h3>
                <p className="text-[#c9a96e] font-semibold">{formatPrice(item.price)}</p>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
