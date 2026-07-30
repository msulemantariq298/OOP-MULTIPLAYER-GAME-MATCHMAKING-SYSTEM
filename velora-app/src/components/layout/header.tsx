'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/builder', label: 'Builder' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const toggleMobileNav = useUIStore((state) => state.toggleMobileNav);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent',
        scrolled ? 'glass border-white/10 py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex-1">
          <Button variant="ghost" size="icon" onClick={toggleMobileNav}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-1 md:flex-none text-center md:text-left">
          <span className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase">Velora</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                pathname === link.href ? 'text-accent' : 'text-foreground/80'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end flex-1 space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-foreground/80 hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative text-foreground/80 hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground font-bold">
                {cartItems.length}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-foreground/80 hover:text-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
