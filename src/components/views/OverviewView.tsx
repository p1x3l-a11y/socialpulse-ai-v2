import React from 'react';
import { 
  FileText, 
  Smile, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Flame,
  Globe
} from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { StatCard } from '../common/StatCard';
import { PlatformActivityBar } from '../charts/PlatformActivityBar';
import { SentimentDonutChart } from '../charts/SentimentDonutChart';
import { PlatformBadge } from '../common/PlatformBadge';

export const OverviewView: React.FC = () => {
  const { currentDataset, setActiveTab } = useAnalytics();
  const { overview } = currentDataset;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Posts Analyzed"
          value={overview.totalPosts.toLocaleString()}
          subtitle="Cross-platform intake"
          change={`+${overview.postGrowthPct}%`}
          isPositive={true}
          icon={FileText}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-500/10"
          badgeText="Live"
        />
        <StatCard
          title="Positive Sentiment %"
          value={`${overview.positiveSentimentPct}%`}
          subtitle="Overall net positive"
          change="+4.6% shift"
          isPositive={true}
          icon={Smile}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-500/10"
          badgeText="High"
        />
        <StatCard
          title="Active Users"
          value={overview.activeUsers.toLocaleString()}
          subtitle="Unique discourse accounts"
          change={`+${overview.activeUsersGrowthPct}%`}
          isPositive={true}
          icon={Users}
          iconColor="text-cyan-500"
          iconBg="bg-cyan-500/10"
        />
        <StatCard
          title="Trending Topics Count"
          value={overview.trendingTopicsCount}
          subtitle="Active viral clusters"
          change="Surging"
          isPositive={true}
          icon={TrendingUp}
          iconColor="text-amber-500"
          iconBg="bg-amber-500/10"
        />
      </div>

      {/* Main Charts Row: Platform Activity & Sentiment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Platform Activity Bar Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Globe size={18} className="text-indigo-500" />
                Cross-Platform Activity Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Number of analyzed posts across supported social media channels
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Sample Data Model
            </span>
          </div>

          <PlatformActivityBar data={overview.platformActivity} height={290} />

          {/* Platform breakdown pill summary */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {overview.platformActivity.map((p) => (
              <div key={p.platform} className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">{p.platform}</p>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{p.posts}</p>
                <span className="text-[10px] text-emerald-500 font-semibold">{p.sentimentScore}% pos</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Distribution Donut Chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Smile size={18} className="text-emerald-500" />
                Sentiment Distribution
              </h3>
              <button
                onClick={() => setActiveTab('sentiment')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
              >
                Deep-dive <ArrowUpRight size={13} />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Positive vs Neutral vs Negative breakdown
            </p>

            <div className="my-2">
              <SentimentDonutChart data={overview.sentimentBreakdown} height={250} />
            </div>
          </div>

          {/* Quick Stat badges */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Positive Posts:
              </span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{overview.sentimentBreakdown.positive}%</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Neutral Posts:
              </span>
              <strong className="text-amber-600 dark:text-amber-400 font-bold">{overview.sentimentBreakdown.neutral}%</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Negative Posts:
              </span>
              <strong className="text-rose-600 dark:text-rose-400 font-bold">{overview.sentimentBreakdown.negative}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Trending Keywords & Sample Posts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Trending Keywords */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                <Flame size={18} />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Recent Trending Keywords
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Surging phrases identified by the NLP extraction pipeline
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('trends')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              All Trends <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="space-y-2.5">
            {overview.trendingKeywords.map((item, index) => (
              <div
                key={item.keyword}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">
                      {item.keyword}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {item.count.toLocaleString()} mentions logged
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Influencer Spotlight Quick Card */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Primary Influence Anchor
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lead authority driving discourse velocity
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('network')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
              >
                Network Map <ArrowUpRight size={13} />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-900">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Verified Lead Contributor
                  </span>
                  <h5 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                    {currentDataset.networkAnalysis.topInfluencers[0]?.name}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentDataset.networkAnalysis.topInfluencers[0]?.handle}
                  </p>
                </div>
                <PlatformBadge platform={currentDataset.networkAnalysis.topInfluencers[0]?.platform || 'Twitter'} size="sm" />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-indigo-100 dark:border-indigo-800">
                  <span className="text-[10px] text-slate-400">Followers</span>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">
                    {currentDataset.networkAnalysis.topInfluencers[0]?.followers}
                  </p>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-indigo-100 dark:border-indigo-800">
                  <span className="text-[10px] text-slate-400">Influence</span>
                  <p className="font-bold text-sm text-emerald-500">
                    {currentDataset.networkAnalysis.topInfluencers[0]?.influenceScore}/100
                  </p>
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-lg border border-indigo-100 dark:border-indigo-800">
                  <span className="text-[10px] text-slate-400">Total Reach</span>
                  <p className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                    {currentDataset.networkAnalysis.topInfluencers[0]?.reach}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Automated graph centrality score: <strong>0.92</strong></span>
            <span className="text-emerald-500 font-semibold">Active Signal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
