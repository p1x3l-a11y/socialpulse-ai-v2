import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Download, 
  Menu, 
  X, 
  Sparkles, 
  FileSpreadsheet, 
  SlidersHorizontal,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAnalytics } from '../../context/AnalyticsContext';
import { AVAILABLE_TOPICS } from '../../data';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { 
    searchQuery, 
    setSearchQuery, 
    executeSearch, 
    setIsExportModalOpen, 
    currentDataset,
    activeTab
  } = useAnalytics();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
    setIsDropdownOpen(false);
  };

  const handleSelectSuggestion = (keyword: string) => {
    setSearchQuery(keyword);
    executeSearch(keyword);
    setIsDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Executive Overview';
      case 'sentiment': return 'Sentiment & Emotion Profiling';
      case 'demographics': return 'Audience Demographics';
      case 'trends': return 'Trend Detection & Velocity';
      case 'network': return 'Network & Influence Flow';
      case 'timeline': return 'Chronological Timeline Tracking';
      default: return 'Analytics Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile toggle + Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 dark:text-white">
              {getTabTitle()}
            </h1>
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Sparkles size={11} /> {currentDataset.keyword}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs xl:max-w-md hidden md:block">
            {currentDataset.summary}
          </p>
        </div>
      </div>

      {/* Middle: Global Search Simulation Bar */}
      <div className="flex-1 max-w-md relative" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-slate-400 dark:text-slate-500" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search topic (e.g. Cyber Security, AI, Elections, Digital India)..."
              className="w-full pl-10 pr-20 py-2 text-xs lg:text-sm rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              Analyze
            </button>
          </div>
        </form>

        {/* Instant Search Suggestions Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-slide-up">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
              <span>Simulated SIH Datasets</span>
              <span className="text-indigo-500 font-normal">Click to switch</span>
            </div>
            <div className="space-y-1 mt-1">
              {AVAILABLE_TOPICS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSuggestion(item.query)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-left transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-slate-400" />
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                    {item.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
        </button>

        {/* Export Report / PDF Button */}
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow flex items-center gap-1.5 transition-all"
          title="Export SIH Evaluation Report"
        >
          <Download size={15} />
          <span className="hidden sm:inline">Export Report</span>
        </button>
      </div>
    </header>
  );
};
