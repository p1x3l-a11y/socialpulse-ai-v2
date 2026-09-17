import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { PlatformActivity } from '../../types/analytics';

interface PlatformActivityBarProps {
  data: PlatformActivity[];
  height?: number;
}

export const PlatformActivityBar: React.FC<PlatformActivityBarProps> = ({ 
  data, 
  height = 280 
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: PlatformActivity = payload[0].payload;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-xl text-xs text-white">
          <p className="font-bold text-sm text-indigo-400">{item.platform}</p>
          <div className="mt-1.5 space-y-1">
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Posts Analyzed:</span>
              <span className="font-bold">{item.posts.toLocaleString()}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Total Engagement:</span>
              <span className="font-bold text-emerald-400">{item.engagement.toLocaleString()}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-400">Sentiment Score:</span>
              <span className="font-bold text-amber-400">{item.sentimentScore}/100</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
          <XAxis 
            dataKey="platform" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }} />
          <Bar 
            dataKey="posts" 
            radius={[8, 8, 0, 0]} 
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
