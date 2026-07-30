'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Lover of fine jewelry and minimalist designs.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">My Profile</h1>
        <p className="text-[#a0a0a0]">Manage your account details and personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0a0a0a] border-white/10 p-6">
            <h2 className="text-xl font-medium mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#a0a0a0]">Full Name</label>
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="bg-[#111] border-white/10 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#a0a0a0]">Email Address</label>
                  <Input 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="bg-[#111] border-white/10 text-white" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#a0a0a0]">Phone Number</label>
                <Input 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="bg-[#111] border-white/10 text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-[#a0a0a0]">Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md bg-[#111] border-white/10 text-white p-3 text-sm focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e] outline-none"
                />
              </div>
              <Button onClick={handleSave} className="bg-[#c9a96e] hover:bg-[#b89a5f] text-black">
                Save Changes
              </Button>
            </div>
          </Card>

          <Card className="bg-[#0a0a0a] border-white/10 p-6">
            <h2 className="text-xl font-medium mb-6">Change Password</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-[#a0a0a0]">Current Password</label>
                <Input type="password" placeholder="••••••••" className="bg-[#111] border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#a0a0a0]">New Password</label>
                  <Input type="password" placeholder="••••••••" className="bg-[#111] border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[#a0a0a0]">Confirm New Password</label>
                  <Input type="password" placeholder="••••••••" className="bg-[#111] border-white/10 text-white" />
                </div>
              </div>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                Update Password
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0a0a0a] border-white/10 p-6 flex flex-col items-center text-center">
            <Avatar className="w-32 h-32 mb-4 border-4 border-[#111]" />
            <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white mb-6">
              Change Avatar
            </Button>
            <div className="w-full pt-6 border-t border-white/10 text-left space-y-4">
              <h3 className="text-sm font-medium text-[#a0a0a0] uppercase tracking-wider">Account Stats</h3>
              <div className="flex justify-between items-center">
                <span className="text-white">Total Orders</span>
                <span className="text-[#c9a96e] font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Total Spent</span>
                <span className="text-[#c9a96e] font-semibold">$4,520</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Designs Created</span>
                <span className="text-[#c9a96e] font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Reviews Written</span>
                <span className="text-[#c9a96e] font-semibold">3</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
