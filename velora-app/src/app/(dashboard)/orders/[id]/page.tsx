'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, MapPin, Truck, Package, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const order = {
    id: orderId || 'ORD-1092',
    date: 'Oct 24, 2023',
    status: 'Shipped',
    subtotal: 1350,
    shipping: 25,
    tax: 75,
    total: 1450,
    address: '123 Luxury Lane, Apt 4B, New York, NY 10001, USA',
    trackingNumber: 'TRK987654321',
    items: [
      { id: 1, name: 'Custom Diamond Pendant', price: 850, qty: 1, image: 'https://images.unsplash.com/photo-1599643478514-4a4e06b9868f?w=400&q=80' },
      { id: 2, name: 'Gold Chain Necklace', price: 500, qty: 1, image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80' },
    ]
  };

  const steps = ['Placed', 'Processing', 'Shipped', 'Delivered'];
  const currentStep = steps.indexOf(order.status);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/orders" className="text-sm text-[#a0a0a0] hover:text-white flex items-center gap-1 mb-4 w-fit">
          <ChevronLeft className="w-4 h-4" /> Back to Orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Order {order.id}</h1>
            <p className="text-[#a0a0a0]">Placed on {order.date}</p>
          </div>
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
            Download Invoice
          </Button>
        </div>
      </div>

      {/* Progress timeline */}
      <Card className="bg-[#0a0a0a] border-white/10 p-6 md:p-10">
        <div className="relative flex justify-between items-center max-w-3xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#222] z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#c9a96e] z-0 transition-all duration-500" 
            style={{ width: `${Math.max(0, (currentStep / (steps.length - 1)) * 100)}%` }}
          ></div>
          
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted ? 'bg-[#c9a96e] border-[#c9a96e] text-black' : 'bg-[#111] border-[#333] text-[#666]'
                }`}>
                  {index === 0 && <Package className="w-5 h-5" />}
                  {index === 1 && <Settings className="w-5 h-5" />}
                  {index === 2 && <Truck className="w-5 h-5" />}
                  {index === 3 && <CheckCircle2 className="w-5 h-5" />}
                </div>
                <span className={`text-xs md:text-sm font-medium absolute -bottom-8 whitespace-nowrap ${
                  isCurrent ? 'text-white' : isCompleted ? 'text-[#c9a96e]' : 'text-[#666]'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0a0a0a] border-white/10 p-6">
            <h2 className="text-xl font-medium mb-6">Order Items</h2>
            <div className="space-y-6">
              {order.items.map((item, i) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="w-20 h-20 bg-[#111] rounded-md overflow-hidden relative shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-[#a0a0a0] mt-1">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right font-medium">
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0a0a0a] border-white/10 p-6">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Shipping</span>
                <span>{formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <Separator className="bg-white/10 my-2" />
              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span className="text-[#c9a96e]">{formatPrice(order.total)}</span>
              </div>
            </div>
          </Card>

          <Card className="bg-[#0a0a0a] border-white/10 p-6">
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#c9a96e]" /> Shipping Address
            </h2>
            <p className="text-sm text-[#a0a0a0] leading-relaxed">
              {order.address}
            </p>
          </Card>

          {(order.status === 'Shipped' || order.status === 'Delivered') && (
            <Card className="bg-[#0a0a0a] border-white/10 p-6">
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#c9a96e]" /> Tracking Info
              </h2>
              <p className="text-sm text-white mb-4">Tracking Number: <span className="font-mono text-[#c9a96e]">{order.trackingNumber}</span></p>
              <Button className="w-full bg-white text-black hover:bg-gray-200">
                Track Order
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Temporary icon component since we missed importing Settings
function Settings(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}
