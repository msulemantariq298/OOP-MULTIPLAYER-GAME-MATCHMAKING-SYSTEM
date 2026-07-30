'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Store');

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Settings</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">Manage your platform configurations</p>
        </div>
        <button className="flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985d] text-black px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <Save size={16} /> Save Settings
        </button>
      </div>

      <div className="flex gap-4 border-b border-[#222]">
        {['Store', 'Shipping', 'Notifications', 'Security'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-sm font-medium transition-colors relative
              ${activeTab === tab ? 'text-[#c9a96e]' : 'text-[#a0a0a0] hover:text-white'}
            `}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c9a96e]" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
        {activeTab === 'Store' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-white mb-4">Store Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Store Name</label>
                <input type="text" defaultValue="Velora" className="w-full bg-[#111] border border-[#333] rounded p-2.5 text-white outline-none focus:border-[#c9a96e]" />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Contact Email</label>
                <input type="email" defaultValue="support@velora.com" className="w-full bg-[#111] border border-[#333] rounded p-2.5 text-white outline-none focus:border-[#c9a96e]" />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Currency</label>
                <select className="w-full bg-[#111] border border-[#333] rounded p-2.5 text-white outline-none focus:border-[#c9a96e]">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Tax Rate (%)</label>
                <input type="number" defaultValue="8.5" className="w-full bg-[#111] border border-[#333] rounded p-2.5 text-white outline-none focus:border-[#c9a96e]" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Shipping' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-white mb-4">Shipping Settings</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Free Shipping Threshold ($)</label>
                <input type="number" defaultValue="150" className="w-full bg-[#111] border border-[#333] rounded p-2.5 text-white outline-none focus:border-[#c9a96e]" />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Standard Flat Rate ($)</label>
                <input type="number" defaultValue="15" className="w-full bg-[#111] border border-[#333] rounded p-2.5 text-white outline-none focus:border-[#c9a96e]" />
              </div>
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Express Rate ($)</label>
                <input type="number" defaultValue="35" className="w-full bg-[#111] border border-[#333] rounded p-2.5 text-white outline-none focus:border-[#c9a96e]" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-white mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { id: 'notif1', label: 'Order Notifications', desc: 'Receive emails when a new order is placed.' },
                { id: 'notif2', label: 'Low Stock Alerts', desc: 'Get alerted when products or beads fall below reorder level.' },
                { id: 'notif3', label: 'New Customer Alerts', desc: 'Receive emails when a new customer registers.' },
              ].map((item) => (
                <div key={item.id} className="flex items-start justify-between p-4 border border-[#333] rounded-lg bg-[#111]">
                  <div>
                    <p className="text-white font-medium text-sm">{item.label}</p>
                    <p className="text-[#a0a0a0] text-xs mt-1">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c9a96e]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-white mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 border border-[#333] rounded-lg bg-[#111]">
                <div>
                  <p className="text-white font-medium text-sm">Two-Factor Authentication (2FA)</p>
                  <p className="text-[#a0a0a0] text-xs mt-1">Require 2FA for all admin logins.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c9a96e]"></div>
                </label>
              </div>
              <div className="max-w-md mt-6">
                <label className="block text-sm text-[#a0a0a0] mb-2">Session Timeout (minutes)</label>
                <select className="w-full bg-[#111] border border-[#333] rounded p-2.5 text-white outline-none focus:border-[#c9a96e]">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
