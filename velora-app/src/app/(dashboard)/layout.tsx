'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { User, Package, Heart, PenTool, MapPin, Settings, LogOut } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

const navItems = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Orders', href: '/orders', icon: Package },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Saved Designs', href: '/designs', icon: PenTool },
  { name: 'Addresses', href: '/addresses', icon: MapPin },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black flex flex-col text-white font-inter">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 mb-6 flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-4 border-2 border-[#c9a96e]" />
              <h2 className="text-lg font-semibold">Eleanor Vance</h2>
              <p className="text-[#a0a0a0] text-sm">eleanor@example.com</p>
            </div>
            
            <nav className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden flex md:flex-col overflow-x-auto md:overflow-x-visible">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-4 md:py-3 transition-colors min-w-max md:min-w-0 ${
                      isActive 
                        ? 'bg-[#111] text-[#c9a96e] border-b-2 md:border-b-0 md:border-l-2 border-[#c9a96e]' 
                        : 'text-[#a0a0a0] hover:text-white hover:bg-white/5 border-b-2 md:border-b-0 md:border-l-2 border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <button className="flex items-center gap-3 px-4 py-4 md:py-3 text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors text-left border-l-2 border-transparent w-full">
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </nav>
          </aside>
          
          <section className="flex-1 min-w-0">
            {children}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
