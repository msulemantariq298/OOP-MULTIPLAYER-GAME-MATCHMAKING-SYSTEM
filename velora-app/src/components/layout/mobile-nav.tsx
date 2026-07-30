'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Camera, MessageCircle, Globe } from 'lucide-react';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/builder', label: 'Builder' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function MobileNav() {
  const isMobileNavOpen = useUIStore((state) => state.isMobileNavOpen);
  const closeMobileNav = useUIStore((state) => state.closeMobileNav);
  const pathname = usePathname();

  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300',
          isMobileNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeMobileNav}
      />
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm bg-card border-l border-white/10 p-6 flex flex-col transition-transform duration-300 ease-in-out',
          isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between mb-12">
          <span className="text-xl font-light tracking-[0.3em] uppercase">Velora</span>
          <Button variant="ghost" size="icon" onClick={closeMobileNav}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-col space-y-6 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-2xl font-light transition-colors hover:text-accent',
                pathname === link.href ? 'text-accent' : 'text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10 flex justify-center space-x-6">
          <Link href="#" className="text-muted-foreground hover:text-accent">
            <Camera className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-accent">
            <MessageCircle className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-accent">
            <Globe className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
