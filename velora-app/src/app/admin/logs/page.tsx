'use client';

import { useState } from 'react';
import { Search, Filter, Clock } from 'lucide-react';

const MOCK_LOGS = Array.from({ length: 25 }).map((_, i) => {
  const types = ['CREATE', 'UPDATE', 'DELETE', 'AUTH'];
  const type = types[i % 4];
  const admins = ['John Doe', 'Sarah Connor', 'Admin System', 'Emma Watson'];
  const admin = admins[i % 4];
  
  let action = '';
  if (type === 'CREATE') action = 'created new coupon SUMMER20';
  if (type === 'UPDATE') action = 'updated product "Gold Charm Bracelet" price to $45.00';
  if (type === 'DELETE') action = 'deleted customer account CUST-1042';
  if (type === 'AUTH') action = 'logged into the system';

  return {
    id: `LOG-${9000 + i}`,
    type,
    admin,
    action,
    timestamp: `2026-07-28 ${10 + (i % 12)}:${(i * 15) % 60 < 10 ? '0' : ''}${(i * 15) % 60} AM`,
  };
});

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Activity Logs</h1>
          <p className="text-sm text-[#a0a0a0] mt-1">Audit trail of system and admin actions</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111111] border border-[#333] rounded-md py-2 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a96e]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#333] rounded-md text-sm hover:bg-[#1a1a1a] transition-colors text-[#a0a0a0]">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="relative border-l border-[#333] ml-4 space-y-8 py-4">
          {MOCK_LOGS.map((log) => (
            <div key={log.id} className="relative pl-6 sm:pl-8 group">
              <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0a]
                ${log.type === 'CREATE' ? 'bg-green-500' :
                  log.type === 'UPDATE' ? 'bg-blue-500' :
                  log.type === 'DELETE' ? 'bg-red-500' : 'bg-gray-400'
                }
              `} />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-white">
                    <span className="font-medium text-[#c9a96e]">{log.admin}</span> {log.action}
                  </p>
                  <p className="text-xs text-[#666] mt-1 font-mono">{log.id}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#a0a0a0]">
                  <Clock size={12} />
                  {log.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
