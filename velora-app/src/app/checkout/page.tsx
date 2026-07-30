'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, ChevronRight, CreditCard, Lock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [shippingData, setShippingData] = useState({
    firstName: '', lastName: '', address1: '', address2: '', city: '', state: '', zip: '', country: 'US', phone: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '', expiry: '', cvv: '', name: ''
  });

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      router.push('/checkout/confirmation');
    }, 1500);
  };

  const steps = [
    { num: 1, label: 'Shipping' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Review' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-12">
          <h1 className="text-3xl font-serif tracking-widest uppercase">Velora Checkout</h1>
        </div>

        <div className="flex items-center justify-center max-w-2xl mx-auto mb-16">
          {steps.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg transition-colors border-2",
                  step === s.num ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10" : 
                  step > s.num ? "border-[#c9a96e] bg-[#c9a96e] text-black" : 
                  "border-white/20 text-white/40"
                )}>
                  {step > s.num ? <Check size={20} /> : s.num}
                </div>
                <span className={cn(
                  "text-xs uppercase tracking-widest",
                  step >= s.num ? "text-white" : "text-white/40"
                )}>{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-[2px] mx-4 mb-6",
                  step > s.num ? "bg-[#c9a96e]" : "bg-white/10"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif tracking-wide mb-6 border-b border-white/10 pb-4">Shipping Address</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">First Name</label>
                    <Input className="bg-[#111111] border-white/20 text-white" value={shippingData.firstName} onChange={e => setShippingData({...shippingData, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Last Name</label>
                    <Input className="bg-[#111111] border-white/20 text-white" value={shippingData.lastName} onChange={e => setShippingData({...shippingData, lastName: e.target.value})} />
                  </div>
                  
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs text-white/60">Address Line 1</label>
                    <Input className="bg-[#111111] border-white/20 text-white" value={shippingData.address1} onChange={e => setShippingData({...shippingData, address1: e.target.value})} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs text-white/60">Address Line 2 (Optional)</label>
                    <Input className="bg-[#111111] border-white/20 text-white" value={shippingData.address2} onChange={e => setShippingData({...shippingData, address2: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/60">City</label>
                    <Input className="bg-[#111111] border-white/20 text-white" value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">State / Province</label>
                    <Input className="bg-[#111111] border-white/20 text-white" value={shippingData.state} onChange={e => setShippingData({...shippingData, state: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Postal Code</label>
                    <Input className="bg-[#111111] border-white/20 text-white" value={shippingData.zip} onChange={e => setShippingData({...shippingData, zip: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Phone</label>
                    <Input className="bg-[#111111] border-white/20 text-white" type="tel" value={shippingData.phone} onChange={e => setShippingData({...shippingData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button 
                    onClick={() => setStep(2)} 
                    className="bg-[#c9a96e] hover:bg-[#b8985d] text-black px-8 py-6 rounded-none uppercase tracking-widest"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif tracking-wide mb-6 border-b border-white/10 pb-4">Payment Method</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="border border-[#c9a96e] bg-[#c9a96e]/10 p-4 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <CreditCard size={24} className="text-[#c9a96e]" />
                    <span className="text-sm font-medium">Credit Card</span>
                  </div>
                  <div className="border border-white/10 bg-[#111111] hover:border-white/30 p-4 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors opacity-50">
                    <span className="font-serif italic text-xl tracking-tighter">PayPal</span>
                    <span className="text-xs text-white/50">(Not available)</span>
                  </div>
                </div>

                <div className="space-y-4 bg-[#111111] p-6 rounded-lg border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CreditCard size={100} />
                  </div>
                  
                  <div className="space-y-2 relative z-10">
                    <label className="text-xs text-white/60 uppercase tracking-widest">Card Number</label>
                    <Input className="bg-[#1a1a1a] border-white/20 text-white font-mono text-lg tracking-widest h-12" placeholder="0000 0000 0000 0000" value={paymentData.cardNumber} onChange={e => setPaymentData({...paymentData, cardNumber: e.target.value})} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="space-y-2">
                      <label className="text-xs text-white/60 uppercase tracking-widest">Expiry Date</label>
                      <Input className="bg-[#1a1a1a] border-white/20 text-white font-mono text-lg tracking-widest h-12" placeholder="MM/YY" value={paymentData.expiry} onChange={e => setPaymentData({...paymentData, expiry: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/60 uppercase tracking-widest">CVV</label>
                      <Input className="bg-[#1a1a1a] border-white/20 text-white font-mono text-lg tracking-widest h-12" placeholder="123" type="password" maxLength={4} value={paymentData.cvv} onChange={e => setPaymentData({...paymentData, cvv: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <label className="text-xs text-white/60 uppercase tracking-widest">Cardholder Name</label>
                    <Input className="bg-[#1a1a1a] border-white/20 text-white h-12" placeholder="Name on card" value={paymentData.name} onChange={e => setPaymentData({...paymentData, name: e.target.value})} />
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button variant="ghost" onClick={() => setStep(1)} className="text-white/60 hover:text-white">
                    Back to Shipping
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    className="bg-[#c9a96e] hover:bg-[#b8985d] text-black px-8 py-6 rounded-none uppercase tracking-widest"
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-serif tracking-wide mb-6 border-b border-white/10 pb-4">Review Order</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-[#111111] p-6 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-serif text-lg tracking-wide text-[#c9a96e]">Shipping To</h3>
                      <button onClick={() => setStep(1)} className="text-xs text-white/50 hover:text-white underline">Edit</button>
                    </div>
                    <div className="text-white/80 space-y-1 text-sm">
                      <p className="font-medium text-white">{shippingData.firstName || 'John'} {shippingData.lastName || 'Doe'}</p>
                      <p>{shippingData.address1 || '123 Luxury Ave'}</p>
                      {shippingData.address2 && <p>{shippingData.address2}</p>}
                      <p>{shippingData.city || 'New York'}, {shippingData.state || 'NY'} {shippingData.zip || '10001'}</p>
                      <p>{shippingData.country}</p>
                      <p className="pt-2 text-white/50">{shippingData.phone || '+1 234 567 8900'}</p>
                    </div>
                  </div>

                  <div className="bg-[#111111] p-6 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-serif text-lg tracking-wide text-[#c9a96e]">Payment</h3>
                      <button onClick={() => setStep(2)} className="text-xs text-white/50 hover:text-white underline">Edit</button>
                    </div>
                    <div className="text-white/80 space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-white/60" />
                        <span>Credit Card</span>
                      </div>
                      <p className="font-mono text-white tracking-widest">
                        **** **** **** {paymentData.cardNumber ? paymentData.cardNumber.slice(-4) : '4242'}
                      </p>
                      <p>Exp: {paymentData.expiry || '12/25'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111111] p-6 rounded-lg border border-white/10">
                  <h3 className="font-serif text-lg tracking-wide text-[#c9a96e] mb-4">Terms & Conditions</h3>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-[#c9a96e]" defaultChecked />
                    <span className="text-sm text-white/70">
                      I agree to the Velora Terms of Service, Privacy Policy, and Return Policy. I understand that custom designed jewelry cannot be returned unless defective.
                    </span>
                  </label>
                </div>

                <div className="flex justify-between pt-6">
                  <Button variant="ghost" onClick={() => setStep(2)} className="text-white/60 hover:text-white">
                    Back to Payment
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="bg-[#c9a96e] hover:bg-[#b8985d] text-black px-12 py-6 rounded-none uppercase tracking-widest text-lg font-medium relative overflow-hidden group"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Lock size={16} className="animate-pulse" /> Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock size={16} /> Place Order - {formatPrice(total)}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-white/10 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-serif mb-6 tracking-wide">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="w-16 h-16 bg-[#1a1a1a] rounded flex-shrink-0 border border-white/5 flex items-center justify-center overflow-hidden">
                      {item.type === 'design' ? (
                        <div className="w-10 h-10 rounded-full border border-[#c9a96e] border-dashed" />
                      ) : (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-white/50 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm text-[#c9a96e] mt-1">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex justify-between text-sm text-white/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-serif">
                  <span>Total</span>
                  <span className="text-[#c9a96e]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
