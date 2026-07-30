'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const MOCK_ORDERS = [
  { id: 'ORD-1092', date: 'Oct 24, 2023', status: 'Delivered', total: 1450, items: 3 },
  { id: 'ORD-1093', date: 'Nov 12, 2023', status: 'Processing', total: 850, items: 1 },
  { id: 'ORD-1094', date: 'Dec 05, 2023', status: 'Shipped', total: 2100, items: 2 },
  { id: 'ORD-1095', date: 'Jan 15, 2024', status: 'Cancelled', total: 420, items: 1 },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState('All');
  
  const filteredOrders = filter === 'All' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(o => o.status === filter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Processing': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Shipped': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">My Orders</h1>
        <p className="text-[#a0a0a0]">Track and manage your recent purchases</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              filter === tab 
                ? 'bg-[#c9a96e] text-black font-medium' 
                : 'bg-[#111] text-[#a0a0a0] hover:bg-[#1a1a1a]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <Card className="bg-[#0a0a0a] border-white/10 p-12 flex flex-col items-center justify-center text-center">
          <Package className="w-16 h-16 text-[#333] mb-4" />
          <h3 className="text-xl font-medium mb-2">No orders found</h3>
          <p className="text-[#a0a0a0] mb-6">You don't have any orders with this status.</p>
          <Button className="bg-[#c9a96e] hover:bg-[#b89a5f] text-black">
            Continue Shopping
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-[#0a0a0a] border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:border-white/20">
              <div className="space-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{order.id}</h3>
                  <Badge variant="outline" className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-[#a0a0a0]">Placed on {order.date}</p>
                <p className="text-sm text-[#a0a0a0]">{order.items} {order.items === 1 ? 'item' : 'items'} • Total: <span className="text-white font-medium">{formatPrice(order.total)}</span></p>
              </div>
              
              <Link href={`/orders/${order.id}`}>
                <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white w-full sm:w-auto flex items-center gap-2">
                  View Details <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
