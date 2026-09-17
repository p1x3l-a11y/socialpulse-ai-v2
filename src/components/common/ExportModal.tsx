import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  Printer, 
  Check, 
  Calendar, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAnalytics } from '../../context/AnalyticsContext';

export const ExportModal: React.FC = () => {
  const { isExportModalOpen, setIsExportModalOpen, currentDataset } = useAnalytics();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isExportModalOpen) return null;

  const handleDownloadPDF = () => {
    setDownloading(true);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setDownloading(false);
      window.print();
    }, 500);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(currentDataset, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Export Executive Analytics Report
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SIH Hackathon Presentation Brief • {currentDataset.keyword}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExportModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content - Printable */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm" id="printable-report">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Report Topic
              </span>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                {currentDataset.keyword}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Category: {currentDataset.category}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck size={13} /> SIH Validated
              </span>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 justify-end">
                <Calendar size={12} /> Generated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Executive Metrics
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Posts</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{currentDataset.overview.totalPosts}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Positive Sentiment</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{currentDataset.overview.positiveSentimentPct}%</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Active Audience</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{currentDataset.overview.activeUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Top Influencer</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 truncate">{currentDataset.networkAnalysis.topInfluencers[0]?.name.split(' ')[0]}</p>
              </div>
            </div>
          </div>

          {/* Sentiment Breakdown */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Sentiment Distribution
            </h5>
            <div className="flex h-3 rounded-full overflow-hidden w-full bg-slate-200 dark:bg-slate-800">
              <div style={{ width: `${currentDataset.sentiment.breakdown.positive}%` }} className="bg-emerald-500" title={`Positive: ${currentDataset.sentiment.breakdown.positive}%`} />
              <div style={{ width: `${currentDataset.sentiment.breakdown.neutral}%` }} className="bg-amber-500" title={`Neutral: ${currentDataset.sentiment.breakdown.neutral}%`} />
              <div style={{ width: `${currentDataset.sentiment.breakdown.negative}%` }} className="bg-rose-500" title={`Negative: ${currentDataset.sentiment.breakdown.negative}%`} />
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Positive: {currentDataset.sentiment.breakdown.positive}%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Neutral: {currentDataset.sentiment.breakdown.neutral}%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Negative: {currentDataset.sentiment.breakdown.negative}%</span>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              SIH Assessment Summary
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Cross-platform velocity peaked around <strong>04:00 PM</strong> driven by influencer amplification on X and YouTube.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Primary audience demographic concentrated in the <strong>25-34 age cohort</strong> and <strong>IT Professionals</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Regional geographic density led by <strong>Hyderabad</strong> and <strong>Bangalore</strong> tech hubs.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between gap-3">
          <button
            onClick={handleCopyJSON}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Layers size={14} />}
            {copied ? 'Copied JSON!' : 'Copy Dataset JSON'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Printer size={14} />
              Print Preview
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Download size={14} />
              {downloading ? 'Preparing PDF...' : 'Download PDF Report'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
