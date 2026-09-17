import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AnalyticsProvider, useAnalytics } from './context/AnalyticsContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './components/views/LandingPage';
import { OverviewView } from './components/views/OverviewView';
import { SentimentView } from './components/views/SentimentView';
import { DemographicsView } from './components/views/DemographicsView';
import { TrendDetectionView } from './components/views/TrendDetectionView';
import { NetworkAnalysisView } from './components/views/NetworkAnalysisView';
import { TimelineAnalysisView } from './components/views/TimelineAnalysisView';

const DashboardContent: React.FC = () => {
  const { isInDashboard, activeTab } = useAnalytics();

  if (!isInDashboard) {
    return <LandingPage />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'sentiment':
        return <SentimentView />;
      case 'demographics':
        return <DemographicsView />;
      case 'trends':
        return <TrendDetectionView />;
      case 'network':
        return <NetworkAnalysisView />;
      case 'timeline':
        return <TimelineAnalysisView />;
      default:
        return <OverviewView />;
    }
  };

  return <Layout>{renderActiveView()}</Layout>;
};

export function App() {
  return (
    <ThemeProvider>
      <AnalyticsProvider>
        <DashboardContent />
      </AnalyticsProvider>
    </ThemeProvider>
  );
}

export default App;
