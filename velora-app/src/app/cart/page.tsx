'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const router = useRouter();

  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleApplyCoupon = () => {
    alert('Coupon applied!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-white/20" />
        </div>
        <h1 className="text-3xl font-serif tracking-wide mb-4">Your Cart is Empty</h1>
        <p className="text-white/50 mb-8 max-w-md text-center">Looks like you haven't added anything to your cart yet. Explore our collections or create a custom design.</p>
        <Link href="/shop">
          <Button className="bg-[#c9a96e] hover:bg-[#b8985d] text-black px-8 py-6 text-lg rounded-none">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif tracking-wider mb-12">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="hidden md:grid grid-cols-12 text-sm text-white/50 pb-4 border-b border-white/10 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 border-b border-white/10">
                <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                  <div className="w-24 h-24 bg-[#111111] rounded-md overflow-hidden flex items-center justify-center border border-white/5">
                    {item.type === 'design' ? (
                      <div className="w-16 h-16 rounded-full border-2 border-[#c9a96e] border-dashed animate-[spin_20s_linear_infinite]" />
                    ) : (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium tracking-wide">{item.name}</h3>
                    <p className="text-sm text-white/50 mt-1 capitalize">{item.type === 'design' ? 'Custom Design' : 'Ready to Wear'}</p>
                    {item.type === 'design' && item.beads && (
                      <p className="text-xs text-[#c9a96e] mt-2">{item.beads.length} beads included</p>
                    )}
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 text-center text-white/80">
                  {formatPrice(item.price)}
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <div className="flex items-center border border-white/20 rounded-md bg-[#111111]">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                  <span className="text-lg md:text-base">{formatPrice(item.price * item.quantity)}</span>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-white/40 hover:text-red-400 transition-colors p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <Link href="/shop" className="text-white/60 hover:text-white hover:underline text-sm tracking-wide">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-white/10 rounded-lg p-8 sticky top-24">
              <h2 className="text-xl font-serif mb-6 tracking-wide">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span className="text-[#c9a96e]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                <label className="text-xs text-white/50 uppercase tracking-wider">Gift Card or Discount Code</label>
                <div className="flex gap-2">
                  <Input 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code" 
                    className="bg-[#1a1a1a] border-white/20 text-white"
                  />
                  <Button variant="outline" onClick={handleApplyCoupon} className="border-white/20 text-white hover:bg-white/10">
                    Apply
                  </Button>
                </div>
              </div>

              <Button 
                onClick={() => router.push('/checkout')} 
                className="w-full bg-[#c9a96e] hover:bg-[#b8985d] text-black py-6 text-lg rounded-none uppercase tracking-widest font-medium"
              >
                Checkout <ArrowRight size={18} className="ml-2" />
              </Button>

              <div className="mt-6 space-y-4 text-center">
                <p className="text-xs text-white/40">Secure checkout powered by Stripe</p>
                <div className="flex justify-center gap-2">
                  <div className="w-10 h-6 bg-white/10 rounded" />
                  <div className="w-10 h-6 bg-white/10 rounded" />
                  <div className="w-10 h-6 bg-white/10 rounded" />
                  <div className="w-10 h-6 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
