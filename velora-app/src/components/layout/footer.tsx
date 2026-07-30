import Link from 'next/link';
import { Camera, MessageCircle, Globe, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-card pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-light tracking-[0.3em] uppercase">Velora</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Jewelry That Tells Your Story. Premium custom designs crafted with precision and elegance.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Camera className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-medium mb-6 uppercase tracking-wider text-foreground">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-accent transition-colors">Shop All</Link></li>
              <li><Link href="/builder" className="hover:text-accent transition-colors">Custom Builder</Link></li>
              <li><Link href="/collections" className="hover:text-accent transition-colors">Collections</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link href="/journal" className="hover:text-accent transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-base font-medium mb-6 uppercase tracking-wider text-foreground">Customer Care</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/care" className="hover:text-accent transition-colors">Jewelry Care</Link></li>
              <li><Link href="/warranty" className="hover:text-accent transition-colors">Warranty</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-medium mb-6 uppercase tracking-wider text-foreground">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors bg-background border-white/10 text-sm h-10"
              />
              <button type="button" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-transparent text-foreground transition-colors hover:bg-white/5">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <Separator className="bg-white/5 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Velora Jewelry. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
