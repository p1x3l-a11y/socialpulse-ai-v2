import React from 'react';
import { 
  LayoutDashboard, 
  Smile, 
  Users2, 
  TrendingUp, 
  Share2, 
  Clock, 
  Activity, 
  Home, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  LucideIcon
} from 'lucide-react';
import { useAnalytics, ActiveTab } from '../../context/AnalyticsContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { activeTab, setActiveTab, setIsInDashboard, currentDataset } = useAnalytics();

  const menuItems: { id: ActiveTab; label: string; icon: LucideIcon; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: Smile, badge: `${currentDataset.overview.positiveSentimentPct}%` },
    { id: 'demographics', label: 'Demographics', icon: Users2 },
    { id: 'trends', label: 'Trend Detection', icon: TrendingUp, badge: 'Viral' },
    { id: 'network', label: 'Network Analysis', icon: Share2 },
    { id: 'timeline', label: 'Timeline Analysis', icon: Clock },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-200 z-30 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Logo */}
      <div className="h-14 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div 
          onClick={() => setIsInDashboard(false)}
          className="flex items-center gap-2.5 cursor-pointer overflow-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
            <Activity size={18} />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                SocialPulse
              </span>
              <span className="text-xs font-bold ml-1 px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                AI
              </span>
            </div>
          )}
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {!collapsed && (
          <div className="px-2 pt-1 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Dashboard
            </p>
          </div>
        )}

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors group ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'} />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between truncate text-left">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}

        {/* Separator */}
        <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setIsInDashboard(false)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={collapsed ? "Back to Landing Page" : undefined}
          >
            <Home size={17} />
            {!collapsed && <span>Homepage</span>}
          </button>
        </div>
      </div>

      {/* Footer Info Box */}
      {!collapsed ? (
        <div className="p-3 m-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold mb-1">
            <Sparkles size={13} />
            <span>Active Topic</span>
          </div>
          <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
            {currentDataset.keyword}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>{currentDataset.overview.totalPosts} posts</span>
            <span className="text-emerald-500 font-medium">Ready</span>
          </div>
        </div>
      ) : (
        <div className="p-2 text-center text-[10px] text-slate-400 font-bold">
          SIH
        </div>
      )}
    </aside>
  );
};
