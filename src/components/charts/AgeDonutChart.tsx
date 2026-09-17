import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { AgeGroupDistribution } from '../../types/analytics';

interface AgeDonutChartProps {
  data: AgeGroupDistribution[];
  height?: number;
}

export const AgeDonutChart: React.FC<AgeDonutChartProps> = ({ 
  data, 
  height = 260 
}) => {
  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={5}
            dataKey="percentage"
            nameKey="range"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="currentColor" className="stroke-white dark:stroke-slate-900" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '12px',
            }}
            formatter={(value: number, name: string) => [`${value}% (${data.find(d => d.range === name)?.count} samples)`, 'Share']}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value, entry: any) => (
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">
                {value} ({entry.payload.percentage}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
        <span className="text-xl font-black text-slate-900 dark:text-white">
          {data[1]?.percentage || 42}%
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
          Core (25-34)
        </span>
      </div>
    </div>
  );
};
