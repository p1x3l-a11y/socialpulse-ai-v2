import React from 'react';
import { 
  Twitter, 
  Send, 
  Instagram, 
  Youtube, 
  Share2, 
  Facebook 
} from 'lucide-react';

interface PlatformBadgeProps {
  platform: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platform,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const norm = platform.toLowerCase();

  const getPlatformConfig = () => {
    if (norm.includes('twitter') || norm.includes('x')) {
      return {
        name: 'X (Twitter)',
        icon: Twitter,
        bg: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
        badge: 'bg-sky-500',
      };
    }
    if (norm.includes('telegram')) {
      return {
        name: 'Telegram',
        icon: Send,
        bg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        badge: 'bg-cyan-500',
      };
    }
    if (norm.includes('instagram')) {
      return {
        name: 'Instagram',
        icon: Instagram,
        bg: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
        badge: 'bg-pink-500',
      };
    }
    if (norm.includes('youtube')) {
      return {
        name: 'YouTube',
        icon: Youtube,
        bg: 'bg-red-500/10 text-red-500 border-red-500/20',
        badge: 'bg-red-500',
      };
    }
    if (norm.includes('reddit')) {
      return {
        name: 'Reddit',
        icon: Share2,
        bg: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
        badge: 'bg-orange-500',
      };
    }
    if (norm.includes('facebook')) {
      return {
        name: 'Facebook',
        icon: Facebook,
        bg: 'bg-blue-600/10 text-blue-500 border-blue-600/20',
        badge: 'bg-blue-600',
      };
    }
    return {
      name: platform,
      icon: Share2,
      bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      badge: 'bg-slate-500',
    };
  };

  const config = getPlatformConfig();
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full transition-all ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'
      } ${config.bg} ${className}`}
    >
      <Icon size={iconSize} />
      {showLabel && <span>{config.name}</span>}
    </span>
  );
};
