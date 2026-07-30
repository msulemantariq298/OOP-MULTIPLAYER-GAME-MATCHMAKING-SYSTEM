'use client';

import { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Calendar } from 'lucide-react';

const revenueOverTime = [
  { date: 'Mon', current: 4000, previous: 2400 },
  { date: 'Tue', current: 3000, previous: 1398 },
  { date: 'Wed', current: 2000, previous: 9800 },
  { date: 'Thu', current: 2780, previous: 3908 },
  { date: 'Fri', current: 1890, previous: 4800 },
  { date: 'Sat', current: 2390, previous: 3800 },
  { date: 'Sun', current: 3490, previous: 4300 },
];

const customerGrowth = [
  { name: 'Week 1', users: 400 },
  { name: 'Week 2', users: 600 },
  { name: 'Week 3', users: 800 },
  { name: 'Week 4', users: 1245 },
];

const categoryRev = [
  { name: 'Bracelets', value: 400 },
  { name: 'Necklaces', value: 300 },
  { name: 'Rings', value: 300 },
  { name: 'Earrings', value: 200 },
];
const COLORS = ['#c9a96e', '#a38755', '#7d663e', '#e5cd9e'];

const topProducts = [
  { name: 'Gold Sphere Bead', units: 145, rev: '$2,175', growth: '+12%' },
  { name: 'Diamond Tennis Bracelet', units: 12, rev: '$14,400', growth: '+5%' },
  { name: 'Silver Chain 18"', units: 89, rev: '$4,450', growth: '-2%' },
  { name: 'Pearl Drop Earrings', units: 45, rev: '$3,825', growth: '+18%' },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('This Week');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Analytics</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">Detailed store performance metrics</p>
        </div>
        <div className="relative">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="appearance-none bg-[#111] border border-[#333] text-white py-2 pl-10 pr-8 rounded-md text-sm outline-none focus:border-[#c9a96e]"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Conversion Funnel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Visitors', value: '12,450', rate: null },
          { label: 'Added to Cart', value: '3,210', rate: '25.7%' },
          { label: 'Reached Checkout', value: '1,450', rate: '11.6%' },
          { label: 'Purchased', value: '840', rate: '6.7%' },
        ].map((step, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-[#222] rounded-xl p-5">
            <p className="text-[#a0a0a0] text-sm">{step.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{step.value}</h3>
            {step.rate && (
              <p className="text-xs text-[#666] mt-2">Conversion: <span className="text-[#c9a96e]">{step.rate}</span></p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Line Chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-4">Revenue Comparison</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="date" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a0a0a0' }} />
                <Line type="monotone" name="Current Period" dataKey="current" stroke="#c9a96e" strokeWidth={2} dot={false} />
                <Line type="monotone" name="Previous Period" dataKey="previous" stroke="#666" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-4">Revenue by Category</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryRev} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                  {categoryRev.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-4">Customer Growth</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customerGrowth}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                <Area type="monotone" dataKey="users" stroke="#ffffff" fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <h2 className="text-lg font-medium text-white mb-4">Top Performing Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222]">
                <tr>
                  <th className="py-3 font-medium">Product</th>
                  <th className="py-3 font-medium">Units</th>
                  <th className="py-3 font-medium">Revenue</th>
                  <th className="py-3 font-medium text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, i) => (
                  <tr key={i} className="border-b border-[#222]">
                    <td className="py-3 text-white">{product.name}</td>
                    <td className="py-3 text-[#a0a0a0]">{product.units}</td>
                    <td className="py-3 text-white font-medium">{product.rev}</td>
                    <td className={`py-3 text-right font-medium ${product.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {product.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
