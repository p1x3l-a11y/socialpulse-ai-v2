import React, { useState } from 'react';
import { MapPin, Navigation, TrendingUp, Compass } from 'lucide-react';
import { RegionLocation } from '../../types/analytics';

interface RegionHeatmapProps {
  locations: RegionLocation[];
}

export const RegionHeatmap: React.FC<RegionHeatmapProps> = ({ locations }) => {
  const [selectedCity, setSelectedCity] = useState<string>(locations[0]?.city || 'Hyderabad');
  const activeLocation = locations.find(l => l.city === selectedCity) || locations[0];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visual Map Placeholder & Geo Locator */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-4 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* India Regional Map Silhouette (SVG stylized map) */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full p-4 pointer-events-none"
          >
            {/* Abstract India boundary outline */}
            <path
              d="M38 12 L46 8 L54 12 L50 20 L58 24 L62 30 L56 34 L66 40 L60 48 L52 46 L48 58 L46 76 L44 86 L40 76 L34 66 L30 52 L36 44 L32 34 L38 24 Z"
              fill="none"
              stroke="#4338ca"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              className="opacity-40"
            />
            {/* Connection mesh lines between hubs */}
            <line x1="44" y1="28" x2="34" y2="55" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="1 1" />
            <line x1="34" y1="55" x2="48" y2="62" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="1 1" />
            <line x1="48" y1="62" x2="46" y2="74" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="1 1" />
            <line x1="44" y1="28" x2="48" y2="62" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="1 1" />
          </svg>

          {/* Interactive Geo-Pin Hotspots */}
          <div className="relative z-10 w-full h-full min-h-[220px]">
            {locations.map((loc) => {
              const isSelected = selectedCity === loc.city;
              return (
                <button
                  key={loc.city}
                  onClick={() => setSelectedCity(loc.city)}
                  style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                  title={`${loc.city} (${loc.mentions} mentions)`}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    {isSelected && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-slate-900 ${
                        isSelected ? 'bg-indigo-400' : 'bg-pink-500'
                      }`}
                    />
                  </span>
                  <span
                    className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md border transition-colors whitespace-nowrap block ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                        : 'bg-slate-900/80 text-slate-300 border-slate-700'
                    }`}
                  >
                    {loc.city}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1">
              <Compass size={14} className="text-indigo-400" />
              Regional Geolocation Density
            </span>
            <span>Click any node to inspect region</span>
          </div>
        </div>

        {/* Selected City Breakdown Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                  Regional Focus
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin size={18} className="text-indigo-600 dark:text-indigo-400" />
                  {activeLocation.city}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeLocation.state} Jurisdiction
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  #{locations.findIndex(l => l.city === activeLocation.city) + 1} Volume Rank
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Local Mentions</span>
                <p className="text-xl font-black text-slate-900 dark:text-white">{activeLocation.mentions}</p>
                <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-0.5 mt-0.5">
                  <TrendingUp size={11} /> +{activeLocation.growth}% growth
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Sentiment Index</span>
                <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{activeLocation.sentiment}%</p>
                <span className="text-[10px] text-slate-400 mt-0.5 block">High approval</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/60 dark:border-indigo-900/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                Dominant Local Discussion
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                "{activeLocation.topTrend}"
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Supported Dialects: English, Regional</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">SIH Geo Validated</span>
          </div>
        </div>
      </div>

      {/* Regional Comparison List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {locations.map((loc) => {
          const isSelected = selectedCity === loc.city;
          return (
            <button
              key={loc.city}
              onClick={() => setSelectedCity(loc.city)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{loc.city}</span>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">+{loc.growth}%</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{loc.mentions} posts</span>
                <span className="font-medium text-emerald-500">{loc.sentiment}% pos</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
