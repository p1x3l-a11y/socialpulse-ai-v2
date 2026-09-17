import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { SentimentTimelinePoint } from '../../types/analytics';

interface SentimentTimelineProps {
  data: SentimentTimelinePoint[];
  height?: number;
}

export const SentimentTimeline: React.FC<SentimentTimelineProps> = ({ 
  data, 
  height = 280 
}) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="neuGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="negGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 11 }}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '12px',
            }}
          />
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ paddingBottom: '10px' }}
          />
          <Area 
            type="monotone" 
            dataKey="positive" 
            name="Positive %" 
            stroke="#10B981" 
            strokeWidth={2.5} 
            fillOpacity={1} 
            fill="url(#posGrad)" 
          />
          <Area 
            type="monotone" 
            dataKey="neutral" 
            name="Neutral %" 
            stroke="#F59E0B" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#neuGrad)" 
          />
          <Area 
            type="monotone" 
            dataKey="negative" 
            name="Negative %" 
            stroke="#EF4444" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#negGrad)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
