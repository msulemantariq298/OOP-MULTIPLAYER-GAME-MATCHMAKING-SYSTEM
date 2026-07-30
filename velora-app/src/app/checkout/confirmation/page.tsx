'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Package, Calendar, ArrowRight } from 'lucide-react';
import { generateId } from '@/lib/utils';

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOrderNumber(`ORD-${generateId().toUpperCase().substring(0, 8)}`);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 10);
  const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-[85vh] bg-[#0a0a0a] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a96e]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-2xl w-full bg-[#111111] border border-white/10 rounded-2xl p-8 md:p-12 relative z-10 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-700">
        
        <div className="w-24 h-24 mx-auto bg-[#c9a96e]/10 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 border-2 border-[#c9a96e] rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" />
          <div className="w-16 h-16 bg-[#c9a96e] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(201,169,110,0.5)]">
            <Check size={32} className="text-black" strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-4xl font-serif tracking-widest mb-4">Order Confirmed!</h1>
        <p className="text-white/60 mb-2">Thank you for your purchase from Velora.</p>
        <p className="text-sm text-white/40 mb-10">We've sent a confirmation email with your order details.</p>

        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5 mb-10 text-left space-y-6">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/10">
              <Package size={20} className="text-[#c9a96e]" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Order Number</p>
              <p className="font-mono text-lg">{orderNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/10">
              <Calendar size={20} className="text-[#c9a96e]" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Estimated Delivery</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/profile/orders" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-none tracking-widest">
              View Orders
            </Button>
          </Link>
          <Link href="/shop" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#c9a96e] hover:bg-[#b8985d] text-black px-8 py-6 rounded-none tracking-widest uppercase">
              Continue Shopping <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
