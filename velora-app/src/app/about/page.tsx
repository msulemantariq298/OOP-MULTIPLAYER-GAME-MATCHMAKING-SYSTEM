'use client';

import React from 'react';
import Link from 'next/link';
import { Hammer, Leaf, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const values = [
    { title: 'Craftsmanship', desc: 'Every piece is meticulously handcrafted by artisans with decades of experience.', icon: <Hammer className="w-8 h-8 text-[#c9a96e]" /> },
    { title: 'Quality', desc: 'We source only premium materials, from ethically mined gems to high-grade metals.', icon: <ShieldCheck className="w-8 h-8 text-[#c9a96e]" /> },
    { title: 'Sustainability', desc: 'Committed to eco-friendly practices, using recycled metals and sustainable packaging.', icon: <Leaf className="w-8 h-8 text-[#c9a96e]" /> },
    { title: 'Community', desc: 'We support local artisan communities and dedicate a portion of profits to social causes.', icon: <HeartHandshake className="w-8 h-8 text-[#c9a96e]" /> },
  ];

  const team = [
    { name: 'Isabella Vance', role: 'Founder & Lead Designer', bio: 'With 15 years in fine jewelry, Isabella founded Velora to blend traditional techniques with modern personalized design.' },
    { name: 'Marcus Chen', role: 'Master Jeweler', bio: 'A third-generation jeweler, Marcus oversees the crafting process, ensuring every detail meets our exacting standards.' },
    { name: 'Elena Rostova', role: 'Gemologist', bio: 'Elena travels the world to source the finest, most unique stones for our custom collections.' },
  ];

  const process = [
    { step: '01', title: 'Design', desc: 'Use our builder or consult with our designers to conceptualize your piece.' },
    { step: '02', title: 'Sourcing', desc: 'We hand-select the exact stones and materials needed for your specific design.' },
    { step: '03', title: 'Crafting', desc: 'Our artisans bring the design to life using traditional bench techniques.' },
    { step: '04', title: 'Delivery', desc: 'Rigorous quality checks before it arrives beautifully packaged at your door.' },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.15)_0%,rgba(0,0,0,1)_70%)]"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">Our Story</h1>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Redefining luxury jewelry by putting the power of design in your hands. Velora is where traditional craftsmanship meets digital innovation.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif italic text-[#c9a96e] mb-8">"Jewelry should be as unique as the person wearing it."</h2>
        <div className="space-y-6 text-gray-300 font-light text-lg leading-relaxed">
          <p>
            Founded in 2021, Velora began with a simple observation: the fine jewelry industry was disconnected from the personal stories of its wearers. We set out to change that by creating a platform that allows you to co-design your pieces.
          </p>
          <p>
            Our interactive 3D builder is just the beginning. Behind the digital interface is a workshop of master artisans who take your vision and translate it into physical reality using centuries-old techniques.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Our Core Values</h2>
            <div className="h-[1px] w-24 bg-[#c9a96e] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <div key={i} className="bg-black p-8 border border-white/10 hover:border-[#c9a96e]/50 transition-colors duration-300 group">
                <div className="mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">{val.icon}</div>
                <h3 className="text-xl font-medium mb-3">{val.title}</h3>
                <p className="text-gray-400 font-light text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-light mb-4">How It Works</h2>
          <div className="h-[1px] w-24 bg-[#c9a96e] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-white/10"></div>
          {process.map((step, i) => (
            <div key={i} className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-black border border-[#c9a96e] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-serif text-[#c9a96e]">{step.step}</span>
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-gray-400 font-light text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white/5 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">Meet The Team</h2>
            <div className="h-[1px] w-24 bg-[#c9a96e] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#1a1a1a] to-[#333] border-2 border-white/10 group-hover:border-[#c9a96e] transition-colors duration-500 overflow-hidden flex items-center justify-center">
                  <span className="text-gray-600 font-serif italic text-xl">Velora</span>
                </div>
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p className="text-[#c9a96e] text-sm mb-4 font-medium">{member.role}</p>
                <p className="text-gray-400 font-light text-sm px-4">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 text-center">
        <h2 className="text-4xl font-light mb-8">Ready to create your masterpiece?</h2>
        <Link href="/builder" className="inline-flex items-center gap-2 bg-white text-black px-10 py-4 font-medium hover:bg-[#c9a96e] transition-colors duration-300">
          Open Builder <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}
