import React, { useState } from 'react';
import { NetworkNode, NetworkLink } from '../../types/analytics';
import { Share2, Info, Users, CheckCircle } from 'lucide-react';
import { PlatformBadge } from '../common/PlatformBadge';

interface NetworkGraphProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  height?: number;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ 
  nodes, 
  links, 
  height = 420 
}) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(nodes[0] || null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [filterRole, setFilterRole] = useState<'all' | 'influencer' | 'follower'>('all');

  const getNodeColor = (node: NetworkNode) => {
    if (node.role === 'influencer') return '#6366F1'; // Indigo
    if (node.role === 'amplification_node') return '#EC4899'; // Pink
    return '#06B6D4'; // Cyan
  };

  const filteredNodes = nodes.filter(n => {
    if (filterRole === 'all') return true;
    if (filterRole === 'influencer') return n.role === 'influencer';
    return n.role === 'follower' || n.role === 'amplification_node';
  });

  const activeInspect = hoveredNode || selectedNode;

  return (
    <div className="relative w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden" style={{ height }}>
      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs flex items-center gap-2 text-white">
          <Share2 size={14} className="text-indigo-400" />
          <span className="font-semibold">Influence Flow Canvas</span>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-md p-1 rounded-xl border border-slate-700 flex items-center gap-1 text-xs">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              filterRole === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterRole('influencer')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              filterRole === 'influencer' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Influencers
          </button>
          <button
            onClick={() => setFilterRole('follower')}
            className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
              filterRole === 'follower' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            Clusters
          </button>
        </div>
      </div>

      {/* Node Inspector Card (Top Right) */}
      {activeInspect && (
        <div className="absolute top-4 right-4 z-20 w-72 bg-slate-800/95 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-2xl text-white animate-fade-in pointer-events-auto">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                {activeInspect.role.replace('_', ' ')}
              </span>
              <h5 className="font-bold text-base flex items-center gap-1.5">
                {activeInspect.name}
                {activeInspect.role === 'influencer' && (
                  <CheckCircle size={14} className="text-indigo-400 fill-indigo-400 text-slate-900" />
                )}
              </h5>
            </div>
            <PlatformBadge platform={activeInspect.platform} size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400">Reach / Audience</span>
              <p className="font-bold text-sm text-cyan-300">{activeInspect.followers}</p>
            </div>
            <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/60">
              <span className="text-[10px] text-slate-400">Influence Score</span>
              <p className="font-bold text-sm text-emerald-400">{activeInspect.influenceScore}/100</p>
            </div>
          </div>

          <div className="mt-2.5 text-[11px] text-slate-400 flex items-center gap-1">
            <Info size={12} className="text-indigo-400" />
            <span>Click or hover nodes to analyze influence path</span>
          </div>
        </div>
      )}

      {/* SVG Canvas for Network Graph */}
      <svg className="w-full h-full cursor-grab active:cursor-grabbing" viewBox="0 0 750 450">
        {/* Subtle background grid pattern */}
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Links */}
        <g className="links">
          {links.map((link, idx) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
            if (!sourceNode || !targetNode) return null;

            const isHighlighted = activeInspect && (activeInspect.id === link.source || activeInspect.id === link.target);

            return (
              <line
                key={`link-${idx}`}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={isHighlighted ? '#818cf8' : '#334155'}
                strokeWidth={isHighlighted ? link.strength * 1.5 : link.strength * 0.8}
                strokeOpacity={isHighlighted ? 0.9 : 0.4}
                strokeDasharray={link.strength === 2 ? '3 3' : undefined}
                className="transition-all duration-300"
              />
            );
          })}
        </g>

        {/* Halo circles for main influencers */}
        {filteredNodes.filter(n => n.role === 'influencer').map(node => (
          <circle
            key={`halo-${node.id}`}
            cx={node.x}
            cy={node.y}
            r={node.radius + 14}
            fill="url(#nodeGlow)"
            className="animate-pulse-slow"
          />
        ))}

        {/* Nodes */}
        <g className="nodes">
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode?.id === node.id;
            const color = getNodeColor(node);

            return (
              <g
                key={`node-${node.id}`}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node circle */}
                <circle
                  r={isHovered ? node.radius + 3 : node.radius}
                  fill={color}
                  stroke="#0f172a"
                  strokeWidth={3}
                  className="transition-all duration-200"
                  filter={isSelected || isHovered ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.8))' : undefined}
                />

                {/* Ring on selection */}
                {(isSelected || isHovered) && (
                  <circle
                    r={node.radius + 6}
                    fill="none"
                    stroke="#a5b4fc"
                    strokeWidth={2}
                    strokeDasharray="4 2"
                  />
                )}

                {/* Node Label */}
                <text
                  y={node.radius + 14}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize={node.role === 'influencer' ? 11 : 9}
                  fontWeight={node.role === 'influencer' ? 700 : 500}
                  className="pointer-events-none select-none drop-shadow"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend Footer */}
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-4 text-xs text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> Central Influencer
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block" /> Audience Cluster
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-3 h-3 rounded-full bg-pink-500 inline-block" /> Amplification Node
        </span>
      </div>
    </div>
  );
};
