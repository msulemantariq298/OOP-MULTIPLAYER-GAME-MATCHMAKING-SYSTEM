'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);

  const handleSave = () => {
    toast.success('Preferences saved successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-[#a0a0a0]">Manage your account preferences and settings</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        <Card className="bg-[#0a0a0a] border-white/10 p-6">
          <h2 className="text-xl font-medium mb-6">Notifications</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Email Notifications</h3>
                <p className="text-sm text-[#a0a0a0]">Receive emails about your account activity</p>
              </div>
              <Toggle checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">SMS Notifications</h3>
                <p className="text-sm text-[#a0a0a0]">Get text messages for urgent updates</p>
              </div>
              <Toggle checked={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} />
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Order Updates</h3>
                <p className="text-sm text-[#a0a0a0]">Receive notifications when your order status changes</p>
              </div>
              <Toggle checked={orderUpdates} onChange={() => setOrderUpdates(!orderUpdates)} />
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Promotional Emails</h3>
                <p className="text-sm text-[#a0a0a0]">Receive news, special offers, and event invitations</p>
              </div>
              <Toggle checked={promotions} onChange={() => setPromotions(!promotions)} />
            </div>
          </div>
        </Card>

        <Card className="bg-[#0a0a0a] border-white/10 p-6">
          <h2 className="text-xl font-medium mb-6">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Theme</h3>
              <p className="text-sm text-[#a0a0a0]">Velora signature dark mode is currently active</p>
            </div>
            <div className="px-4 py-2 bg-[#111] rounded border border-[#c9a96e]/30 text-[#c9a96e] text-sm font-medium">
              Dark Luxury
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="bg-[#c9a96e] hover:bg-[#b89a5f] text-black px-8">
            Save Preferences
          </Button>
        </div>

        <Card className="bg-[#0a0a0a] border-red-900/30 p-6 mt-12">
          <h2 className="text-xl font-medium mb-2 text-red-500">Danger Zone</h2>
          <p className="text-sm text-[#a0a0a0] mb-6">Once you delete your account, there is no going back. Please be certain.</p>
          <Button variant="outline" className="border-red-900/50 text-red-500 hover:bg-red-950 hover:text-red-400">
            Delete Account
          </Button>
        </Card>
      </div>
    </div>
  );
}

// Simple custom toggle component since Switch wasn't explicitly provided
function Toggle({ checked, onChange }: { checked: boolean, onChange: () => void }) {
  return (
    <button 
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#c9a96e] focus:ring-offset-2 focus:ring-offset-black ${
        checked ? 'bg-[#c9a96e]' : 'bg-[#333]'
      }`}
    >
      <span 
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
