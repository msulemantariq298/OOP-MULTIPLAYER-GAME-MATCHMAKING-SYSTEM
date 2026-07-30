'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_ADDRESSES = [
  { id: 1, type: 'Home', isDefault: true, name: 'Eleanor Vance', street: '123 Luxury Lane, Apt 4B', city: 'New York', state: 'NY', zip: '10001', country: 'United States', phone: '+1 (555) 123-4567' },
  { id: 2, type: 'Office', isDefault: false, name: 'Eleanor Vance', street: '456 Business Blvd, Suite 200', city: 'San Francisco', state: 'CA', zip: '94107', country: 'United States', phone: '+1 (555) 987-6543' },
];

export default function AddressesPage() {
  const handleDelete = () => toast.success('Address removed');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">My Addresses</h1>
          <p className="text-[#a0a0a0]">Manage your shipping and billing addresses</p>
        </div>
        <Button className="bg-[#c9a96e] hover:bg-[#b89a5f] text-black w-full sm:w-auto flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_ADDRESSES.map((addr) => (
          <Card key={addr.id} className={`bg-[#0a0a0a] border p-6 flex flex-col ${addr.isDefault ? 'border-[#c9a96e]/50' : 'border-white/10'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#c9a96e]" />
                <h3 className="font-medium text-lg">{addr.type}</h3>
              </div>
              {addr.isDefault && (
                <Badge className="bg-[#c9a96e]/20 text-[#c9a96e] border-0 hover:bg-[#c9a96e]/30">Default</Badge>
              )}
            </div>
            
            <div className="space-y-1 text-sm text-[#a0a0a0] flex-1 mb-6">
              <p className="text-white font-medium text-base mb-2">{addr.name}</p>
              <p>{addr.street}</p>
              <p>{addr.city}, {addr.state} {addr.zip}</p>
              <p>{addr.country}</p>
              <p className="pt-2">Phone: {addr.phone}</p>
            </div>
            
            <div className="flex gap-3 mt-auto">
              <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5 text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4" /> Edit
              </Button>
              <Button variant="outline" onClick={handleDelete} className="px-4 border-white/10 hover:bg-red-500/10 hover:text-red-500 text-white transition-colors">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
