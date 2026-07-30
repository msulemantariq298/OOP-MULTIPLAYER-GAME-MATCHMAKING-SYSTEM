'use client';

import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const revenueData = [
  { name: 'Jan', value: 24000 },
  { name: 'Feb', value: 13980 },
  { name: 'Mar', value: 38000 },
  { name: 'Apr', value: 39080 },
  { name: 'May', value: 48000 },
  { name: 'Jun', value: 48250 },
];

const topBeadsData = [
  { name: 'Gold Sphere', sales: 420 },
  { name: 'Onyx Cylinder', sales: 380 },
  { name: 'Silver Star', sales: 310 },
  { name: 'Pearl Drop', sales: 290 },
  { name: 'Diamond Dust', sales: 250 },
  { name: 'Rose Quartz', sales: 210 },
];

const categoryData = [
  { name: 'Bracelets', value: 45 },
  { name: 'Necklaces', value: 25 },
  { name: 'Custom', value: 15 },
  { name: 'Anklets', value: 10 },
  { name: 'Accessories', value: 5 },
];
const COLORS = ['#c9a96e', '#a38755', '#7d663e', '#e5cd9e', '#ffffff'];

const recentOrders = [
  { id: 'ORD-7234', customer: 'Emma Watson', items: 3, total: 450.00, status: 'Processing', date: '2026-07-28' },
  { id: 'ORD-7233', customer: 'James Bond', items: 1, total: 125.00, status: 'Shipped', date: '2026-07-27' },
  { id: 'ORD-7232', customer: 'Sarah Connor', items: 5, total: 1250.00, status: 'Delivered', date: '2026-07-26' },
  { id: 'ORD-7231', customer: 'John Doe', items: 2, total: 85.00, status: 'Cancelled', date: '2026-07-25' },
  { id: 'ORD-7230', customer: 'Alice Smith', items: 4, total: 630.00, status: 'Delivered', date: '2026-07-24' },
];

const lowStockItems = [
  { name: '18k Gold Clasp', stock: 3, reorder: 20, status: 'Critical' },
  { name: 'Onyx Spacer Bead', stock: 4, reorder: 50, status: 'Critical' },
  { name: 'Silver Chain 16"', stock: 12, reorder: 30, status: 'Low' },
  { name: 'Rose Gold Heart', stock: 14, reorder: 25, status: 'Low' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Overview</h1>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$48,250', trend: '+12.5%', isUp: true, icon: DollarSign },
          { label: 'Total Orders', value: '356', trend: '+8.2%', isUp: true, icon: ShoppingBag },
          { label: 'Total Customers', value: '1,245', trend: '+15.3%', isUp: true, icon: Users },
          { label: 'Avg Order Value', value: '$135.50', trend: '-3.7%', isUp: false, icon: TrendingUp },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-[#222] rounded-xl p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#a0a0a0] text-sm">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{stat.value}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <stat.icon size={20} className="text-[#c9a96e]" />
              </div>
            </div>
            <div className={`flex items-center mt-4 text-sm font-medium ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
              {stat.isUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
              {stat.trend} <span className="text-[#666666] ml-2 font-normal">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-white">Revenue Trend</h2>
          <p className="text-sm text-[#a0a0a0]">Last 6 months revenue performance</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a96e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#c9a96e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                itemStyle={{ color: '#c9a96e' }}
              />
              <Area type="monotone" dataKey="value" stroke="#c9a96e" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-white">Recent Orders</h2>
            <button className="text-sm text-[#c9a96e] hover:text-white transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222]">
                <tr>
                  <th className="px-4 py-3 font-medium">Order #</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={i} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                    <td className="px-4 py-3 text-white">{order.id}</td>
                    <td className="px-4 py-3 text-[#a0a0a0]">{order.customer}</td>
                    <td className="px-4 py-3 text-white">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                        ${order.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500' :
                          order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                          order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                          'bg-red-500/10 text-red-500'
                        }
                      `}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Beads */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-white">Top Selling Beads</h2>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBeadsData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#a0a0a0" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip cursor={{ fill: '#1a1a1a' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                <Bar dataKey="sales" fill="#c9a96e" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500" size={20} />
            <h2 className="text-lg font-medium text-white">Low Stock Alerts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#a0a0a0] uppercase border-b border-[#222]">
                <tr>
                  <th className="px-4 py-3 font-medium">Item</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item, i) => (
                  <tr key={i} className="border-b border-[#222] hover:bg-[#111]">
                    <td className="px-4 py-3 text-white">{item.name}</td>
                    <td className="px-4 py-3 text-[#a0a0a0]">{item.stock} / {item.reorder}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider
                        ${item.status === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}
                      `}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#c9a96e] hover:text-black border border-[#333] hover:border-[#c9a96e] transition-colors rounded text-white">
                        Reorder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-white">Revenue by Category</h2>
          </div>
          <div className="h-[250px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-[#a0a0a0]">{entry.name}</span>
                  <span className="text-white font-medium ml-2">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
