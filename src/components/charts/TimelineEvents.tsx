import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceDot 
} from 'recharts';
import { TimelineEvent, MentionTimePoint } from '../../types/analytics';
import { 
  Clock, 
  TrendingUp, 
  Sparkles, 
  Share2, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';
import { PlatformBadge } from '../common/PlatformBadge';

interface TimelineEventsProps {
  events: TimelineEvent[];
  mentionsData: MentionTimePoint[];
}

export const TimelineEvents: React.FC<TimelineEventsProps> = ({ 
  events, 
  mentionsData 
}) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(3); // Default to peak engagement

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Negative':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'Alert':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Mentions vs Time Chart */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-600 dark:text-indigo-400" />
              Mentions vs Time Progression
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chronological tracking of post velocity across 24 hours with event milestones
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> Mentions Volume
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mentionsData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value.toLocaleString()} mentions/hr`, 'Volume']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="mentions"
                stroke="url(#lineGlow)"
                strokeWidth={3}
                dot={{ r: 3, fill: '#6366F1' }}
                activeDot={{ r: 7, fill: '#EC4899' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chronological Event Cards Sequence */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Clock size={18} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                Conversation Timeline
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Key detected inflection points during trend propagation
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            {events.length} Major Milestones
          </span>
        </div>

        {/* Timeline Flow */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-200 dark:before:bg-indigo-950">
          {events.map((evt, idx) => {
            const isSelected = selectedEventIndex === idx;

            return (
              <div 
                key={`event-${idx}`}
                onClick={() => setSelectedEventIndex(idx)}
                className={`relative group cursor-pointer p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500/60 ring-2 ring-indigo-500/20 shadow-md'
                    : 'bg-slate-50/80 dark:bg-slate-850/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Timeline Node Dot */}
                <div
                  className={`absolute -left-[30px] sm:-left-[37px] top-4 w-4 h-4 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                    isSelected
                      ? 'bg-indigo-600 border-white dark:border-slate-900 ring-4 ring-indigo-500/30'
                      : 'bg-white dark:bg-slate-900 border-indigo-400'
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-lg bg-indigo-600 text-white shadow-xs">
                      {evt.time}
                    </span>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      {evt.title}
                    </h5>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <PlatformBadge platform={evt.platform} size="sm" />
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSentimentBadge(evt.sentiment)}`}>
                      {evt.sentiment}
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {evt.description}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Impact Scope: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{evt.reach}</strong></span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                    <CheckCircle2 size={12} /> Logged by Event Engine
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
