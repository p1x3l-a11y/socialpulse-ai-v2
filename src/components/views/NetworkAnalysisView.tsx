import React from 'react';
import { 
  Share2, 
  Award, 
  TrendingUp, 
  MessageSquare, 
  CheckCircle2, 
  Crown, 
  Rocket, 
  HeartHandshake, 
  ExternalLink 
} from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { NetworkGraph } from '../charts/NetworkGraph';
import { PlatformBadge } from '../common/PlatformBadge';

export const NetworkAnalysisView: React.FC = () => {
  const { currentDataset } = useAnalytics();
  const { networkAnalysis } = currentDataset;
  const { highlights, topInfluencers, nodes, links } = networkAnalysis;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
            Graph Centrality & Virality Vectors
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            Network Analysis & Influence Flow
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Visualizing opinion leaders, audience propagation clusters, and multi-tier retweeting cascades
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
            <Share2 size={14} /> Directed Acyclic Propagation
          </span>
        </div>
      </div>

      {/* Top 3 Spotlight Cards: Most Influential, Fastest Growing, Highest Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Most Influential User */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Crown size={70} className="text-amber-500" />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Crown size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {highlights.mostInfluential.title}
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {highlights.mostInfluential.name}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {highlights.mostInfluential.handle}
          </p>

          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 mb-3">
            <div>
              <span className="text-[10px] text-slate-400 block">{highlights.mostInfluential.metricLabel}</span>
              <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">{highlights.mostInfluential.metric}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Growth Momentum</span>
              <p className="text-xs font-bold text-emerald-500 mt-1">{highlights.mostInfluential.growth}</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {highlights.mostInfluential.description}
          </p>
        </div>

        {/* Fastest Growing User */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Rocket size={70} className="text-indigo-500" />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Rocket size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {highlights.fastestGrowing.title}
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {highlights.fastestGrowing.name}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {highlights.fastestGrowing.handle}
          </p>

          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 mb-3">
            <div>
              <span className="text-[10px] text-slate-400 block">{highlights.fastestGrowing.metricLabel}</span>
              <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">{highlights.fastestGrowing.metric}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Growth Momentum</span>
              <p className="text-xs font-bold text-emerald-500 mt-1">{highlights.fastestGrowing.growth}</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {highlights.fastestGrowing.description}
          </p>
        </div>

        {/* Highest Engagement User */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <HeartHandshake size={70} className="text-emerald-500" />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <HeartHandshake size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {highlights.highestEngagement.title}
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {highlights.highestEngagement.name}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {highlights.highestEngagement.handle}
          </p>

          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 mb-3">
            <div>
              <span className="text-[10px] text-slate-400 block">{highlights.highestEngagement.metricLabel}</span>
              <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">{highlights.highestEngagement.metric}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Community Index</span>
              <p className="text-xs font-bold text-emerald-500 mt-1">{highlights.highestEngagement.growth}</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {highlights.highestEngagement.description}
          </p>
        </div>
      </div>

      {/* Network Graph Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Share2 size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Influence Flow Graph
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connected circular nodes: Influencer A, Influencer B, Influencer C, and Follower clusters
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Interactive Node Selection
          </span>
        </div>

        <NetworkGraph nodes={nodes} links={links} height={420} />
      </div>

      {/* Top Influencers Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Award size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Top Influencers Ranking
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Key opinion leaders driving virality, ranked by verified network weight
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Static Sample Dataset
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-4">Name & Handle</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Followers</th>
                <th className="py-3 px-4">Influence Score</th>
                <th className="py-3 px-4">Estimated Reach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {topInfluencers.map((inf, idx) => (
                <tr key={inf.handle} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-400">
                    #{idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                        {inf.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          {inf.name}
                          {inf.verified && (
                            <CheckCircle2 size={13} className="text-indigo-500 fill-indigo-500 text-white" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{inf.handle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <PlatformBadge platform={inf.platform} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                    {inf.followers}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <strong className="text-emerald-500 font-black text-sm">{inf.influenceScore}</strong>
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${inf.influenceScore}%` }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-indigo-600 dark:text-indigo-400">
                    {inf.reach}
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
