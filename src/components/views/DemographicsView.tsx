import React from 'react';
import { 
  Users2, 
  Languages, 
  MapPin, 
  Briefcase, 
  PieChart as PieIcon,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { AgeDonutChart } from '../charts/AgeDonutChart';
import { LanguagePieChart } from '../charts/LanguagePieChart';
import { RegionHeatmap } from '../charts/RegionHeatmap';
import { ProfessionBarChart } from '../charts/ProfessionBarChart';

export const DemographicsView: React.FC = () => {
  const { currentDataset } = useAnalytics();
  const { demographics } = currentDataset;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
            Demographic Profiling
          </span>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
            Audience Breakdown & Persona Segmentation
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Insights based on linguistic markers, self-declared bio identifiers, and geographic metadata
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Topic: <strong className="text-indigo-600 dark:text-indigo-400">{currentDataset.keyword}</strong>
          </span>
        </div>
      </div>

      {/* Row 1: Age Groups & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Age Groups Card: 18-24, 25-34, 35-44, 45+ */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Users2 size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Age Group Distribution
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cohorts: 18-24, 25-34, 35-44, 45+
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
                Donut Chart
              </span>
            </div>

            <div className="my-2">
              <AgeDonutChart data={demographics.ageGroups} height={250} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            {demographics.ageGroups.map((group) => (
              <div key={group.range} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 font-medium">{group.range}</p>
                <p className="text-base font-black text-slate-900 dark:text-white">{group.percentage}%</p>
                <span className="text-[10px] text-slate-400">{group.count} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Card: English, Hindi, Telugu, Tamil */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-pink-500/10 text-pink-500 rounded-xl">
                  <Languages size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Linguistic Distribution
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Languages: English, Hindi, Telugu, Tamil
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 px-2.5 py-1 rounded-lg border border-pink-200 dark:border-pink-800">
                Pie Chart
              </span>
            </div>

            <div className="my-2">
              <LanguagePieChart data={demographics.languages} height={250} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            {demographics.languages.map((lang) => (
              <div key={lang.language} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 font-medium">{lang.language}</p>
                <p className="text-base font-black text-slate-900 dark:text-white">{lang.percentage}%</p>
                <span className="text-[10px] text-slate-400">{lang.count} posts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Locations (Top Regions: Hyderabad, Bangalore, Delhi, Mumbai) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Geographic Presence & Top Regions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Regional concentration across major Indian tech and cultural epicenters
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
            Interactive Map
          </span>
        </div>

        <RegionHeatmap locations={demographics.locations} />
      </div>

      {/* Row 3: Professional Interests (Students, IT Professionals, Business, Government Employees) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Briefcase size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Professional Interests Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Affiliation split: Students, IT Professionals, Business, Government Employees
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            Horizontal Bar Chart
          </span>
        </div>

        <ProfessionBarChart data={demographics.professions} height={240} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {demographics.professions.map((prof) => (
            <div key={prof.profession} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">{prof.profession}</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">{prof.percentage}%</p>
              <span className="text-[10px] text-indigo-500 font-medium">{prof.count} active profiles</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
