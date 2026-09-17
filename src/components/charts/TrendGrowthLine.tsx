import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { TrendTimelinePoint, TrendingTopicItem } from '../../types/analytics';

interface TrendGrowthLineProps {
  data: TrendTimelinePoint[];
  topics: TrendingTopicItem[];
  height?: number;
}

export const TrendGrowthLine: React.FC<TrendGrowthLineProps> = ({ 
  data, 
  topics, 
  height = 300 
}) => {
  const lineColors = ['#6366F1', '#10B981', '#F59E0B', '#06B6D4', '#EC4899'];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 15, right: 20, left: -20, bottom: 5 }}>
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
            domain={[20, 100]}
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
            height={40} 
            iconType="circle"
            formatter={(value) => (
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">
                {value}
              </span>
            )}
          />

          {topics.slice(0, 5).map((topic, index) => {
            const key = `topic${index + 1}` as keyof TrendTimelinePoint;
            return (
              <Line
                key={topic.id}
                type="monotone"
                dataKey={key}
                name={topic.title}
                stroke={lineColors[index % lineColors.length]}
                strokeWidth={index === 0 || index === 1 ? 3 : 2}
                dot={{ r: 3, fill: lineColors[index % lineColors.length] }}
                activeDot={{ r: 6 }}
                animationDuration={1000}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
