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
import { ProfessionInterest } from '../../types/analytics';

interface ProfessionBarChartProps {
  data: ProfessionInterest[];
  height?: number;
}

export const ProfessionBarChart: React.FC<ProfessionBarChartProps> = ({ 
  data, 
  height = 240 
}) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} horizontal={false} />
          <XAxis 
            type="number" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 11 }}
            unit="%"
          />
          <YAxis 
            type="category" 
            dataKey="profession" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '12px',
            }}
            formatter={(value: number, name: string, item: any) => [
              `${value}% (${item.payload.count} contributors)`,
              'Interest Share'
            ]}
          />
          <Bar 
            dataKey="percentage" 
            radius={[0, 8, 8, 0]} 
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
