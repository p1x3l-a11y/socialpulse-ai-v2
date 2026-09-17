import { TopicAnalyticsDataset } from '../types/analytics';
import cyberSecurityData from './cyberSecurityData.json';
import aiData from './aiData.json';
import digitalIndiaData from './digitalIndiaData.json';
import electionsData from './electionsData.json';

export const ALL_DATASETS: Record<string, TopicAnalyticsDataset> = {
  'cyber-security': cyberSecurityData as unknown as TopicAnalyticsDataset,
  'ai-tools': aiData as unknown as TopicAnalyticsDataset,
  'digital-india': digitalIndiaData as unknown as TopicAnalyticsDataset,
  'elections': electionsData as unknown as TopicAnalyticsDataset,
};

export const AVAILABLE_TOPICS = [
  { id: 'cyber-security', label: 'Cyber Security', query: 'Cyber Security', tag: 'High Priority' },
  { id: 'ai-tools', label: 'AI Tools', query: 'AI Tools', tag: 'Trending' },
  { id: 'digital-india', label: 'Digital India', query: 'Digital India', tag: 'National' },
  { id: 'elections', label: 'Elections', query: 'Elections', tag: 'Civic' },
];

export function resolveDatasetBySearch(query: string): TopicAnalyticsDataset {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return ALL_DATASETS['cyber-security'];

  if (normalized.includes('cyber') || normalized.includes('secur') || normalized.includes('hack') || normalized.includes('malware')) {
    return ALL_DATASETS['cyber-security'];
  }
  if (normalized.includes('ai') || normalized.includes('artific') || normalized.includes('intel') || normalized.includes('gpt') || normalized.includes('tool')) {
    return ALL_DATASETS['ai-tools'];
  }
  if (normalized.includes('digital') || normalized.includes('india') || normalized.includes('upi') || normalized.includes('gov')) {
    return ALL_DATASETS['digital-india'];
  }
  if (normalized.includes('elect') || normalized.includes('vote') || normalized.includes('poll') || normalized.includes('eci')) {
    return ALL_DATASETS['elections'];
  }

  // Fallback to cyber-security default
  return ALL_DATASETS['cyber-security'];
}
