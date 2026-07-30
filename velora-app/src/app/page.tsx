'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Gem, ShieldCheck, Diamond, ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { name: 'Bracelets', count: '120+ Items', icon: <Diamond className="w-6 h-6 text-[#c9a96e]" /> },
    { name: 'Necklaces', count: '85+ Items', icon: <Gem className="w-6 h-6 text-[#c9a96e]" /> },
    { name: 'Anklets', count: '40+ Items', icon: <Star className="w-6 h-6 text-[#c9a96e]" /> },
    { name: 'Custom Designs', count: 'Infinite Possibilities', icon: <ShieldCheck className="w-6 h-6 text-[#c9a96e]" /> },
  ];

  const featuredProducts = [
    { id: '1', name: 'Obsidian Night Bracelet', price: 120, rating: 4.8, image: '' },
    { id: '2', name: 'Golden Aura Necklace', price: 250, rating: 4.9, image: '' },
    { id: '3', name: 'Silver Whisper Anklet', price: 85, rating: 4.7, image: '' },
    { id: '4', name: 'Rose Quartz Custom', price: 150, rating: 5.0, image: '' },
  ];

  const testimonials = [
    { name: 'Elena R.', location: 'New York, NY', text: 'The custom bracelet I designed tells my exact story. The quality is unmatched.', rating: 5 },
    { name: 'James T.', location: 'London, UK', text: 'Velora provided a seamless experience from design to delivery. A truly premium service.', rating: 5 },
    { name: 'Sophia M.', location: 'Paris, FR', text: 'Stunning craftsmanship. The gold accents are perfectly balanced with the dark stones.', rating: 5 },
  ];

  const builderPoints = [
    { top: '50%', left: '100%' },
    { top: '75%', left: '93.3%' },
    { top: '93.3%', left: '75%' },
    { top: '100%', left: '50%' },
    { top: '93.3%', left: '25%' },
    { top: '75%', left: '6.7%' },
    { top: '50%', left: '0%' },
    { top: '25%', left: '6.7%' },
    { top: '6.7%', left: '25%' },
    { top: '0%', left: '50%' },
    { top: '6.7%', left: '75%' },
    { top: '25%', left: '93.3%' },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#c9a96e] selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a96e]/10 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[128px] animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Jewelry That Tells <br/>
            <span className="font-serif italic text-[#c9a96e]">Your Story</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Design your own custom jewelry pieces with our interactive builder. Premium materials, unmatched craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/builder" className="group flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b3955d] text-black px-8 py-4 rounded-none transition-all duration-300 font-medium tracking-wide">
              Start Designing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/shop" className="group flex items-center gap-2 border border-white/20 hover:border-white/60 bg-transparent text-white px-8 py-4 rounded-none transition-all duration-300 font-medium tracking-wide">
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-light mb-2">Our Collections</h2>
            <div className="h-[1px] w-24 bg-[#c9a96e]"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link href="/shop" key={i} className="group relative h-64 overflow-hidden bg-white/5 border border-white/10 p-6 flex flex-col justify-end hover:border-[#c9a96e]/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div className="absolute top-6 right-6 z-20 transform group-hover:scale-110 transition-transform duration-500">
                {cat.icon}
              </div>
              <div className="relative z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-xl font-medium mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-400">{cat.count}</p>
              </div>
              <div className="absolute inset-0 bg-[#c9a96e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Builder CTA */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-light mb-4">Design Your <span className="font-serif italic text-[#c9a96e]">Perfect Piece</span></h2>
              <p className="text-gray-400 leading-relaxed text-lg font-light">
                Our interactive 3D builder lets you visualize your custom jewelry before it's crafted. Choose your beads, arrange them precisely, and create something completely unique to you.
              </p>
            </div>
            <Link href="/builder" className="inline-flex items-center gap-2 border-b border-[#c9a96e] text-[#c9a96e] pb-1 hover:text-white hover:border-white transition-colors duration-300">
              Try the Builder <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-96 flex items-center justify-center">
            {/* Abstract decorative builder visual */}
            <div className="relative w-64 h-64 rounded-full border border-dashed border-white/20 animate-[spin_60s_linear_infinite]">
              {builderPoints.map((point, i) => (
                <div 
                  key={i} 
                  className={`absolute w-4 h-4 rounded-full -ml-2 -mt-2 shadow-[0_0_10px_rgba(201,169,110,0.5)] ${i % 3 === 0 ? 'bg-[#c9a96e]' : 'bg-white'}`}
                  style={{
                    top: point.top,
                    left: point.left,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-light mb-2">Bestsellers</h2>
            <div className="h-[1px] w-24 bg-[#c9a96e]"></div>
          </div>
          <Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-white/5 border border-white/10 mb-4 relative overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent absolute inset-0"></div>
                {/* Placeholder for product image */}
                <div className="w-32 h-32 rounded-full border-2 border-white/10 group-hover:scale-105 transition-transform duration-700 relative flex items-center justify-center">
                    <span className="text-white/20 text-xs">Image</span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/80 backdrop-blur-sm border-t border-white/10">
                  <button className="w-full py-2 bg-white text-black text-sm font-medium hover:bg-[#c9a96e] transition-colors">
                    Quick Add
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium group-hover:text-[#c9a96e] transition-colors">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-400">${product.price}</span>
                  <div className="flex items-center text-xs text-[#c9a96e]">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="ml-1 text-gray-500">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">What Our Customers Say</h2>
            <div className="h-[1px] w-24 bg-[#c9a96e] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-[#0a0a0a] p-8 border border-white/10 relative">
                <div className="text-4xl font-serif text-[#c9a96e] opacity-50 absolute top-4 left-4">"</div>
                <p className="text-gray-300 relative z-10 mt-4 mb-8 font-light italic">"{test.text}"</p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <h4 className="font-medium text-white">{test.name}</h4>
                    <p className="text-xs text-gray-500">{test.location}</p>
                  </div>
                  <div className="flex gap-1 text-[#c9a96e]">
                    {[...Array(test.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className="py-16 border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {[
              { label: 'Happy Customers', value: '10K+' },
              { label: 'Unique Beads', value: '500+' },
              { label: 'Designs Created', value: '50K+' },
              { label: 'Average Rating', value: '4.9' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className={`text-3xl md:text-4xl font-light text-[#c9a96e] mb-2 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-white/10 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a96e]/10 blur-[64px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-light mb-4">Stay in the Loop</h2>
            <p className="text-gray-400 mb-8 font-light">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#c9a96e] transition-colors"
                required
              />
              <button type="submit" className="bg-white text-black px-6 py-3 font-medium hover:bg-[#c9a96e] transition-colors">
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-6">By subscribing you agree to our Terms & Conditions and Privacy Policy.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
