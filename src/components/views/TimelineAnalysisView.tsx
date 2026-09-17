import React from 'react';
import { 
  Clock, 
  TrendingUp, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { TimelineEvents } from '../charts/TimelineEvents';

export const TimelineAnalysisView: React.FC = () => {
  const { currentDataset } = useAnalytics();
  const { timelineAnalysis } = currentDataset;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
            Temporal Sequence Reconstruction
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            Timeline Analysis & Event Progression
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Chronological audit of topic emergence, influencer acceleration, sentiment peaks, and decay
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
            <Clock size={14} /> Full 24-Hour Cycle
          </span>
        </div>
      </div>

      {/* Timeline Events & Mentions vs Time Chart */}
      <TimelineEvents
        events={timelineAnalysis.events}
        mentionsData={timelineAnalysis.mentionsVsTime}
      />
    </div>
  );
};
