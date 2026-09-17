import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Network, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { PlatformBadge } from '../common/PlatformBadge';
import { useAnalytics } from '../../context/AnalyticsContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setIsInDashboard, setActiveTab } = useAnalytics();
  const { theme, toggleTheme } = useTheme();

  const supportedPlatforms = [
    'Twitter',
    'Telegram',
    'Instagram',
    'Facebook',
    'Reddit',
    'YouTube',
  ];

  const features = [
    {
      title: 'Sentiment & Emotion Profiling',
      description: 'Granular sentiment categorization (Positive, Neutral, Negative) and multi-emotion classification (Excited, Supportive, Angry, Concerned, Sarcastic).',
      icon: BarChart3,
      color: 'text-emerald-500 bg-emerald-500/10',
      tab: 'sentiment' as const,
    },
    {
      title: 'Audience Demographics',
      description: 'Age brackets (18-24 to 45+), multi-lingual distribution (English, Hindi, Telugu, Tamil), and top Indian regional clusters (Hyderabad, Bangalore, Delhi, Mumbai).',
      icon: Users,
      color: 'text-indigo-500 bg-indigo-500/10',
      tab: 'demographics' as const,
    },
    {
      title: 'Real-Time Trend Detection',
      description: 'Continuous monitoring of viral keywords, velocity growth rates, and predictive 24-hour progression trajectories.',
      icon: TrendingUp,
      color: 'text-amber-500 bg-amber-500/10',
      tab: 'trends' as const,
    },
    {
      title: 'Influence Network Mapping',
      description: 'Interactive SVG node graphing depicting key opinion leaders (Influencers A, B, C), follower clusters, and amplification pathways.',
      icon: Network,
      color: 'text-cyan-500 bg-cyan-500/10',
      tab: 'network' as const,
    },
    {
      title: 'Chronological Timeline Tracking',
      description: 'Event-by-event timeline reconstruction pinpointing genesis, influencer retweets, sentiment spikes, and normalization.',
      icon: Clock,
      color: 'text-purple-500 bg-purple-500/10',
      tab: 'timeline' as const,
    },
  ];

  const handleLaunch = (tab?: 'overview' | 'sentiment' | 'demographics' | 'trends' | 'network' | 'timeline') => {
    if (tab) setActiveTab(tab);
    setIsInDashboard(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Landing Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Activity size={24} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                SocialPulse
              </span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                AI
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400 tracking-wider">
              SMART INDIA HACKATHON PROTOTYPE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => handleLaunch('overview')}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all hover:gap-3"
          >
            Launch Dashboard
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wide animate-fade-in">
            <Award size={15} className="text-amber-400" />
            <span>Smart India Hackathon • Problem Statement Prototype</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            AI Driven Social Media <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Analytics Framework
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Analyze audience sentiment, demographics, trends, and influence networks across social media platforms in real-time with zero backend requirement.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleLaunch('overview')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]"
            >
              <Zap size={20} className="text-amber-300" />
              Launch Dashboard
            </button>
            <button
              onClick={() => handleLaunch('network')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 text-slate-700 dark:text-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              Explore Influence Graph
            </button>
          </div>

          {/* Supported Platforms Strip */}
          <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800/80 max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
              Supported Platforms
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {supportedPlatforms.map((p) => (
                <PlatformBadge key={p} platform={p} size="lg" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Core Prototype Capabilities
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Tailored visualization modules engineered for Smart India Hackathon jury evaluations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                onClick={() => handleLaunch(feat.tab)}
                className="group cursor-pointer p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color} transition-transform group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Open Simulation</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          SocialPulse AI — AI Driven Social Media Analytics Framework
        </p>
        <p className="mt-1">
          Designed for Smart India Hackathon (SIH) Prototype Submission • Built with React, Vite, Tailwind CSS & Recharts
        </p>
      </footer>
    </div>
  );
};
