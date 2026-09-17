import React, { useState } from 'react';
import { 
  Search, 
  Smile, 
  Sparkles, 
  ThumbsUp, 
  Flame, 
  AlertTriangle, 
  Laugh, 
  Clock, 
  MessageSquare,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { SentimentDonutChart } from '../charts/SentimentDonutChart';
import { SentimentTimeline } from '../charts/SentimentTimeline';

export const SentimentView: React.FC = () => {
  const { currentDataset, searchQuery, setSearchQuery, executeSearch } = useAnalytics();
  const [localInput, setLocalInput] = useState(currentDataset.keyword);

  const { sentiment } = currentDataset;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localInput.trim()) {
      executeSearch(localInput);
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'Excited':
        return <Sparkles className="text-emerald-500" size={20} />;
      case 'Supportive':
        return <ThumbsUp className="text-indigo-500" size={20} />;
      case 'Angry':
        return <Flame className="text-rose-500" size={20} />;
      case 'Concerned':
        return <AlertTriangle className="text-amber-500" size={20} />;
      case 'Sarcastic':
        return <Laugh className="text-purple-500" size={20} />;
      default:
        return <Smile size={20} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Box Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
              NLP Analysis Module
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              Sentiment & Emotion Engine
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter any query to simulate real-time AI sentiment extraction and emotional nuance mapping
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                placeholder="Enter keyword e.g. Cyber Security, AI, Digital India..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              Analyze
            </button>
          </form>
        </div>

        {/* Query Suggestion Pills */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex-wrap text-xs">
          <span className="text-slate-400 text-[11px] font-medium">Quick Queries:</span>
          {['Cyber Security', 'AI Tools', 'Digital India', 'Elections'].map((q) => (
            <button
              key={q}
              onClick={() => {
                setLocalInput(q);
                executeSearch(q);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                currentDataset.keyword.toLowerCase().includes(q.toLowerCase())
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Sentiment Breakdown Top Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Breakdown Numbers & Gauges */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Keyword
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  "{currentDataset.keyword}"
                </h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 size={13} /> {currentDataset.overview.totalPosts} Posts Sampled
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Sentiment distribution evaluated across social comments, video transcripts, community threads, and microblog posts.
            </p>

            {/* Scorecard Trio: Positive 65%, Neutral 20%, Negative 15% */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                  Positive
                </span>
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {sentiment.breakdown.positive}%
                </span>
                <p className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-1 font-medium">
                  {Math.round((sentiment.breakdown.positive / 100) * currentDataset.overview.totalPosts)} posts
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-1">
                  Neutral
                </span>
                <span className="text-3xl font-black text-amber-600 dark:text-amber-400">
                  {sentiment.breakdown.neutral}%
                </span>
                <p className="text-[10px] text-amber-600/80 dark:text-amber-400/80 mt-1 font-medium">
                  {Math.round((sentiment.breakdown.neutral / 100) * currentDataset.overview.totalPosts)} posts
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block mb-1">
                  Negative
                </span>
                <span className="text-3xl font-black text-rose-600 dark:text-rose-400">
                  {sentiment.breakdown.negative}%
                </span>
                <p className="text-[10px] text-rose-600/80 dark:text-rose-400/80 mt-1 font-medium">
                  {Math.round((sentiment.breakdown.negative / 100) * currentDataset.overview.totalPosts)} posts
                </p>
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="mt-6">
              <div className="flex h-3.5 rounded-full overflow-hidden w-full bg-slate-100 dark:bg-slate-800">
                <div style={{ width: `${sentiment.breakdown.positive}%` }} className="bg-emerald-500 transition-all duration-500" />
                <div style={{ width: `${sentiment.breakdown.neutral}%` }} className="bg-amber-500 transition-all duration-500" />
                <div style={{ width: `${sentiment.breakdown.negative}%` }} className="bg-rose-500 transition-all duration-500" />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Confidence Index: <strong>94.2%</strong></span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Fine-tuned RoBERTa Transformer</span>
          </div>
        </div>

        {/* Donut Chart Display */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
              Polarity Visualization
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ratio breakdown in interactive donut chart
            </p>
            <div className="mt-2">
              <SentimentDonutChart data={sentiment.breakdown} height={230} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200">Algorithm Note:</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
              Polarity thresholding leverages multi-class classification to isolate sarcastic nuances from authentic criticism.
            </p>
          </div>
        </div>
      </div>

      {/* Emotion Cards Section */}
      <div>
        <div className="mb-3">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-500" />
            Fine-Grained Emotion Profiling
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Categorized into 5 distinctive emotional triggers with extracted sample verbatim
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sentiment.emotions.map((emo) => (
            <div
              key={emo.emotion}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {getEmotionIcon(emo.emotion)}
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {emo.percentage}%
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {emo.emotion}
                </h4>
                <span className="text-[11px] text-slate-400 block mb-3">
                  {emo.count} verified mentions
                </span>

                {/* Percentage bar */}
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
                  <div
                    style={{ width: `${emo.percentage}%`, backgroundColor: emo.color }}
                    className="h-full rounded-full"
                  />
                </div>

                {/* Sample Quote */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 italic">
                  "{emo.sampleQuote}"
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Emotion score</span>
                <span className="font-bold" style={{ color: emo.color }}>High Signal</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Changes Over Time Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Clock size={18} className="text-indigo-500" />
              Sentiment Evolution Over Time
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Temporal fluctuations of positive, neutral, and negative sentiment over a 24-hour cycle
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Temporal Smoothing
          </span>
        </div>

        <SentimentTimeline data={sentiment.timeline} height={280} />
      </div>
    </div>
  );
};
