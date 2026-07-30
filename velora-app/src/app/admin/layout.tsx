'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  Package, 
  CircleDot, 
  Tags, 
  ShoppingBag, 
  Ticket, 
  Boxes, 
  Users, 
  MessageSquare, 
  Settings, 
  Activity,
  Menu,
  X,
  Search,
  Bell,
  LogOut,
  User
} from 'lucide-react';

const sidebarSections = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'CATALOG',
    items: [
      { name: 'Products', href: '/admin/products', icon: Package },
      { name: 'Beads', href: '/admin/beads', icon: CircleDot },
      { name: 'Categories', href: '/admin/categories', icon: Tags },
    ]
  },
  {
    title: 'SALES',
    items: [
      { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
      { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
    ]
  },
  {
    title: 'INVENTORY',
    items: [
      { name: 'Stock Management', href: '/admin/inventory', icon: Boxes },
    ]
  },
  {
    title: 'USERS',
    items: [
      { name: 'Customers', href: '/admin/customers', icon: Users },
      { name: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { name: 'Settings', href: '/admin/settings', icon: Settings },
      { name: 'Activity Logs', href: '/admin/logs', icon: Activity },
    ]
  }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#000000] text-white flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-[#222] transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#222]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-widest uppercase">VELORA</span>
            <span className="text-[10px] uppercase bg-[#c9a96e] text-black px-2 py-0.5 rounded-sm font-semibold tracking-wider">Admin</span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4 no-scrollbar">
          {sidebarSections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-xs font-semibold text-[#666666] tracking-wider mb-3 px-3 uppercase">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors relative group
                        ${isActive 
                          ? 'text-[#c9a96e] bg-[#1a1a1a]' 
                          : 'text-[#a0a0a0] hover:text-white hover:bg-[#111111]'}
                      `}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9a96e] rounded-r-md" />
                      )}
                      <item.icon size={18} className={isActive ? 'text-[#c9a96e]' : 'text-[#666666] group-hover:text-gray-300'} />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-[#0a0a0a] border-b border-[#222] flex items-center justify-between px-4 lg:px-8 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#111111] border border-[#222] rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a96e]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#c9a96e] rounded-full"></span>
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center overflow-hidden">
                  <User size={16} className="text-gray-400" />
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-[#222] rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-[#222]">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-500">admin@velora.com</p>
                  </div>
                  <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                    <Settings size={14} /> Settings
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#1a1a1a] hover:text-red-300">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 bg-[#000000]">
          {children}
        </div>
      </main>
    </div>
  );
}
