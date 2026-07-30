'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Plus, Minus } from 'lucide-react';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const faqs = [
    { q: 'How long does custom jewelry take to make?', a: 'Custom pieces typically take 2-4 weeks from final design approval to delivery, as each piece is crafted by hand.' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship globally. International shipping times and customs duties vary by location.' },
    { q: 'Can I return a custom-designed piece?', a: 'Because custom pieces are made specifically for you, they are final sale. However, we offer a lifetime warranty on craftsmanship.' },
    { q: 'What materials do you use?', a: 'We exclusively use solid 18k gold, high-grade 925 sterling silver, and ethically sourced gemstones.' },
    { q: 'How do I care for my Velora jewelry?', a: 'Keep your jewelry away from harsh chemicals and clean gently with the provided polishing cloth. Store in its original pouch.' }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Have a question about a custom design or an existing order? Our team of jewelry experts is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Form */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-12">
            <h2 className="text-2xl font-light mb-8">Send a Message</h2>
            
            {submitted ? (
              <div className="h-64 flex flex-col items-center justify-center text-center animate-in fade-in">
                <div className="w-16 h-16 bg-[#c9a96e]/20 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-[#c9a96e]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Message Sent</h3>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Name</label>
                    <input required type="text" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#c9a96e] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email</label>
                    <input required type="email" className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#c9a96e] transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Subject</label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#c9a96e] transition-colors appearance-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="custom">Custom Design Inquiry</option>
                    <option value="order">Order Status</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Message</label>
                  <textarea required rows={5} className="w-full bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-white text-black py-4 font-medium hover:bg-[#c9a96e] transition-colors duration-300">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#c9a96e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Visit Our Studio</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    124 Luxury Ave, Suite 400<br/>
                    New York, NY 10012<br/>
                    United States
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-[#c9a96e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Business Hours</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    Mon - Fri: 10am - 7pm EST<br/>
                    Saturday: 11am - 5pm EST<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-[#c9a96e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Call Us</h3>
                  <p className="text-gray-400 font-light text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-[#c9a96e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium mb-2">Email</h3>
                  <p className="text-gray-400 font-light text-sm">hello@velora.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gradient-to-br from-white/10 to-black border border-white/10 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <div className="bg-black/80 backdrop-blur-sm px-6 py-3 border border-white/20 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c9a96e]" />
                <span className="text-sm tracking-widest uppercase">Velora Studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">Frequently Asked Questions</h2>
            <div className="h-[1px] w-24 bg-[#c9a96e] mx-auto"></div>
          </div>
          
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className={`text-lg font-light transition-colors ${openFaq === i ? 'text-[#c9a96e]' : 'group-hover:text-gray-300'}`}>
                    {faq.q}
                  </span>
                  {openFaq === i ? <Minus className="w-5 h-5 text-[#c9a96e]" /> : <Plus className="w-5 h-5 text-gray-500 group-hover:text-white" />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-400 font-light">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
