import React from 'react';
import { 
  TrendingUp, 
  Flame, 
  Sparkles, 
  ArrowUpRight, 
  Table as TableIcon,
  LineChart as LineIcon,
  CheckCircle,
  Zap
} from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { TrendGrowthLine } from '../charts/TrendGrowthLine';
import { PlatformBadge } from '../common/PlatformBadge';

export const TrendDetectionView: React.FC = () => {
  const { currentDataset } = useAnalytics();
  const { trendDetection } = currentDataset;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Surging':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Peaking':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
            Viral Velocity Engine
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            Trend Detection & Velocity Scoring
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time keyword emergence, acceleration metrics, and virality ranking
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
            <Zap size={14} /> High Surge Velocity
          </span>
        </div>
      </div>

      {/* Section: Top Trending Topics Cards (1. AI Tools, 2. Cyber Security, 3. Data Privacy, 4. Digital India, 5. Online Fraud) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
              <Flame size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Top Trending Topics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ranked by multi-platform acceleration score and cross-channel density
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Top 5 Clusters Monitored
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {trendDetection.topTopics.map((topic, index) => (
            <div
              key={topic.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
                    {index + 1}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(topic.status)}`}>
                    {topic.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                  {topic.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {topic.category}
                </p>

                {/* Metrics Stack */}
                <div className="space-y-2 mt-4">
                  {/* Trend Score */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Trend Score</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 font-black text-sm">
                      {topic.trendScore}/100
                    </strong>
                  </div>

                  {/* Growth Percentage */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Growth %</span>
                    <strong className="text-emerald-500 font-black text-sm">
                      +{topic.growthPercentage}%
                    </strong>
                  </div>

                  {/* Mention Count */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Mentions</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-bold">
                      {topic.mentionCount.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* Mini Sparkline Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-end gap-1 h-8">
                  {topic.sparkline.map((val, i) => (
                    <div
                      key={i}
                      style={{ height: `${(val / 100) * 100}%` }}
                      className="flex-1 bg-indigo-500/30 dark:bg-indigo-500/40 rounded-t-xs hover:bg-indigo-600 transition-colors"
                      title={`${val}%`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-3 text-[10px] text-slate-400 text-right">
                24h Trajectory
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart: Trend Growth Over Time */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <LineIcon size={18} className="text-indigo-500" />
              Trend Growth Over Time
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparative multi-line timeline chart showing trend score progression across 24 hours
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Hourly Multi-Line
          </span>
        </div>

        <TrendGrowthLine data={trendDetection.growthTimeline} topics={trendDetection.topTopics} height={300} />
      </div>

      {/* Viral Keyword Ranking Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <TableIcon size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Viral Keyword Ranking
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed metrics table for rapidly spreading hashtags and phrases
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Ranked by Mentions & Growth Rate
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-4">Keyword</th>
                <th className="py-3 px-4">Mentions</th>
                <th className="py-3 px-4">Growth %</th>
                <th className="py-3 px-4">Dominant Platform</th>
                <th className="py-3 px-4">Sentiment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {trendDetection.viralKeywords.map((kw) => (
                <tr key={kw.keyword} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-400">
                    #{kw.rank}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    {kw.keyword}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    {kw.mentions.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-600 dark:text-emerald-400">
                    +{kw.growth}%
                  </td>
                  <td className="py-3.5 px-4">
                    <PlatformBadge platform={kw.platform} size="sm" />
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full text-[10px] border ${
                        kw.sentiment === 'Positive'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : kw.sentiment === 'Negative'
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}
                    >
                      {kw.sentiment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
