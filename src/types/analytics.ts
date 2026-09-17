export interface PlatformActivity {
  platform: 'Twitter' | 'Telegram' | 'Instagram' | 'YouTube' | 'Reddit' | 'Facebook';
  posts: number;
  engagement: number;
  sentimentScore: number; // 0 - 100
  color: string;
}

export interface SentimentBreakdown {
  positive: number;
  neutral: number;
  negative: number;
}

export interface EmotionScore {
  emotion: 'Excited' | 'Supportive' | 'Angry' | 'Concerned' | 'Sarcastic';
  percentage: number;
  count: number;
  icon: string;
  sampleQuote: string;
  color: string;
}

export interface SentimentTimelinePoint {
  time: string;
  positive: number;
  neutral: number;
  negative: number;
  totalVolume: number;
}

export interface AgeGroupDistribution {
  range: '18-24' | '25-34' | '35-44' | '45+';
  percentage: number;
  count: number;
  color: string;
}

export interface LanguageDistribution {
  language: 'English' | 'Hindi' | 'Telugu' | 'Tamil';
  percentage: number;
  count: number;
  color: string;
}

export interface RegionLocation {
  city: 'Hyderabad' | 'Bangalore' | 'Delhi' | 'Mumbai';
  state: string;
  mentions: number;
  growth: number;
  sentiment: number;
  topTrend: string;
  coordinates: { x: number; y: number }; // Relative SVG positioning
}

export interface ProfessionInterest {
  profession: 'Students' | 'IT Professionals' | 'Business' | 'Government Employees';
  percentage: number;
  count: number;
  color: string;
}

export interface TrendingTopicItem {
  id: string;
  title: string;
  category: string;
  trendScore: number;
  growthPercentage: number;
  mentionCount: number;
  sparkline: number[];
  status: 'Surging' | 'Peaking' | 'Steady';
}

export interface ViralKeyword {
  rank: number;
  keyword: string;
  mentions: number;
  growth: number;
  platform: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

export interface TrendTimelinePoint {
  time: string;
  topic1: number;
  topic2: number;
  topic3: number;
  topic4: number;
  topic5: number;
}

export interface NetworkNode {
  id: string;
  name: string;
  role: 'influencer' | 'follower' | 'amplification_node';
  platform: string;
  followers: string;
  influenceScore: number;
  x: number;
  y: number;
  radius: number;
  cluster: string;
}

export interface NetworkLink {
  source: string;
  target: string;
  strength: number;
}

export interface InfluencerItem {
  name: string;
  handle: string;
  platform: 'Twitter' | 'Telegram' | 'Instagram' | 'YouTube' | 'Reddit';
  followers: string;
  followersCount: number;
  influenceScore: number;
  verified: boolean;
  reach: string;
  avatarUrl?: string;
}

export interface HighlightCard {
  title: string;
  name: string;
  handle: string;
  metric: string;
  metricLabel: string;
  platform: string;
  growth: string;
  description: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  platform: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative' | 'Alert';
  reach: string;
}

export interface MentionTimePoint {
  time: string;
  mentions: number;
  sentimentRatio: number;
  highlight?: string;
}

export interface TopicAnalyticsDataset {
  id: string;
  keyword: string;
  category: string;
  summary: string;
  lastUpdated: string;
  overview: {
    totalPosts: number;
    positiveSentimentPct: number;
    activeUsers: number;
    trendingTopicsCount: number;
    postGrowthPct: number;
    activeUsersGrowthPct: number;
    platformActivity: PlatformActivity[];
    sentimentBreakdown: SentimentBreakdown;
    trendingKeywords: { keyword: string; count: number; change: string }[];
  };
  sentiment: {
    breakdown: SentimentBreakdown;
    emotions: EmotionScore[];
    timeline: SentimentTimelinePoint[];
  };
  demographics: {
    ageGroups: AgeGroupDistribution[];
    languages: LanguageDistribution[];
    locations: RegionLocation[];
    professions: ProfessionInterest[];
  };
  trendDetection: {
    topTopics: TrendingTopicItem[];
    viralKeywords: ViralKeyword[];
    growthTimeline: TrendTimelinePoint[];
  };
  networkAnalysis: {
    nodes: NetworkNode[];
    links: NetworkLink[];
    topInfluencers: InfluencerItem[];
    highlights: {
      mostInfluential: HighlightCard;
      fastestGrowing: HighlightCard;
      highestEngagement: HighlightCard;
    };
  };
  timelineAnalysis: {
    events: TimelineEvent[];
    mentionsVsTime: MentionTimePoint[];
  };
}
