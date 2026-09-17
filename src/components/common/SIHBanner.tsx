import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { AVAILABLE_TOPICS } from '../../data';

export const SIHBanner: React.FC = () => {
  const { selectedTopicId, selectTopic } = useAnalytics();

  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-200 dark:border-blue-900">
          <Award size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
              SIH 2026 Prototype
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              Smart India Hackathon • Social Media Analytics Framework
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Demonstrating Multi-Platform Sentiment, Demographics, Trends & Influence Flow without live APIs.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 font-medium">
          Test Topics:
        </span>
        {AVAILABLE_TOPICS.map((topic) => {
          const isActive = selectedTopicId === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => selectTopic(topic.id)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {isActive && <CheckCircle2 size={12} className="text-white" />}
              {topic.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
