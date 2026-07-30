'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    let strength = 0;
    if (p.length > 5) strength += 1;
    if (p.length > 8) strength += 1;
    if (/[A-Z]/.test(p)) strength += 1;
    if (/[0-9]/.test(p)) strength += 1;
    return strength;
  };
  
  const strength = getPasswordStrength();
  const strengthColors = ['bg-[#333]', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!formData.terms) {
      toast.error('You must accept the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Account created successfully!');
      router.push('/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden py-12">
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#c9a96e] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      
      <Card className="w-full max-w-md bg-[#0a0a0a] border-white/10 p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold tracking-widest text-white">VELORA</span>
          </Link>
          <h1 className="text-2xl font-semibold text-white mb-2">Create Account</h1>
          <p className="text-[#a0a0a0] text-sm">Join Velora to save designs and track orders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 bg-[#111] border-white/10 text-white placeholder:text-[#666666] focus:border-[#c9a96e]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 bg-[#111] border-white/10 text-white placeholder:text-[#666666] focus:border-[#c9a96e]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10 bg-[#111] border-white/10 text-white placeholder:text-[#666666] focus:border-[#c9a96e]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#666666] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex gap-1 h-1.5 mt-2">
              {[1, 2, 3, 4].map((level) => (
                <div 
                  key={level} 
                  className={`flex-1 rounded-full ${strength >= level ? strengthColors[strength] : 'bg-white/10'} transition-all`} 
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
              <Input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 pr-10 bg-[#111] border-white/10 text-white placeholder:text-[#666666] focus:border-[#c9a96e]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-[#666666] hover:text-white transition-colors"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 py-2">
            <input 
              type="checkbox" 
              name="terms"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="w-4 h-4 rounded border-white/20 bg-[#111] text-[#c9a96e] focus:ring-[#c9a96e] focus:ring-offset-0"
            />
            <label htmlFor="terms" className="text-xs text-[#a0a0a0]">
              I agree to the <Link href="/terms" className="text-[#c9a96e] hover:underline">Terms of Service</Link>
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#c9a96e] hover:bg-[#b89a5f] text-black font-medium"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-[#a0a0a0]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#c9a96e] hover:underline">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}
