import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { SentimentBreakdown } from '../../types/analytics';

interface SentimentDonutChartProps {
  data: SentimentBreakdown;
  height?: number;
}

export const SentimentDonutChart: React.FC<SentimentDonutChartProps> = ({ 
  data, 
  height = 260 
}) => {
  const chartData = [
    { name: 'Positive', value: data.positive, color: '#10B981' },
    { name: 'Neutral', value: data.neutral, color: '#F59E0B' },
    { name: 'Negative', value: data.negative, color: '#EF4444' },
  ];

  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="currentColor" className="stroke-white dark:stroke-slate-900" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            }}
            formatter={(value: number) => [`${value}%`, 'Sentiment Ratio']}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value, entry: any) => (
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">
                {value} ({entry.payload.value}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center percentage badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
        <span className="text-2xl font-black text-slate-900 dark:text-white">
          {data.positive}%
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
          Positive
        </span>
      </div>
    </div>
  );
};
