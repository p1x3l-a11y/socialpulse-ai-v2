import React, { createContext, useContext, useState, useEffect } from 'react';
import { TopicAnalyticsDataset } from '../types/analytics';
import { ALL_DATASETS, resolveDatasetBySearch } from '../data';

export type ActiveTab = 'overview' | 'sentiment' | 'demographics' | 'trends' | 'network' | 'timeline';

interface AnalyticsContextType {
  currentDataset: TopicAnalyticsDataset;
  selectedTopicId: string;
  selectTopic: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  executeSearch: (query: string) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isInDashboard: boolean;
  setIsInDashboard: (inDashboard: boolean) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('cyber-security');
  const [currentDataset, setCurrentDataset] = useState<TopicAnalyticsDataset>(ALL_DATASETS['cyber-security']);
  const [searchQuery, setSearchQuery] = useState<string>('Cyber Security');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isInDashboard, setIsInDashboard] = useState<boolean>(false);

  const selectTopic = (id: string) => {
    if (ALL_DATASETS[id]) {
      setSelectedTopicId(id);
      setCurrentDataset(ALL_DATASETS[id]);
      setSearchQuery(ALL_DATASETS[id].keyword);
    }
  };

  const executeSearch = (query: string) => {
    setSearchQuery(query);
    const resolved = resolveDatasetBySearch(query);
    setCurrentDataset(resolved);
    setSelectedTopicId(resolved.id);
  };

  return (
    <AnalyticsContext.Provider
      value={{
        currentDataset,
        selectedTopicId,
        selectTopic,
        searchQuery,
        setSearchQuery,
        executeSearch,
        activeTab,
        setActiveTab,
        isExportModalOpen,
        setIsExportModalOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isInDashboard,
        setIsInDashboard,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
