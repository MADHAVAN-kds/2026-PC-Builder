import React from 'react';
import { PC_COMPONENTS, PCComponent } from '@/data/components';
import { ComponentIcon } from './ComponentIcon';
import { Info, Lightbulb, Target, Trophy, Zap } from 'lucide-react';
interface InfoPanelProps {
  hoveredComponent: string | null;
  hoveredSlot: string | null;
  placedCount: number;
  totalCount: number;
  achievements: string[];
  wrongAttempts: number;
}
const ACHIEVEMENT_DATA: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  'started': { icon: <Zap className="w-4 h-4" />, label: 'Getting Started! 🚀', color: 'cyan' },
  'halfway': { icon: <Target className="w-4 h-4" />, label: 'Halfway There! ⚡', color: 'violet' },
  'almost': { icon: <Trophy className="w-4 h-4" />, label: 'Almost Done! 🔥', color: 'amber' },
  'complete': { icon: <Trophy className="w-4 h-4" />, label: 'PC Master! 🏆', color: 'emerald' },
};
export const InfoPanel: React.FC<InfoPanelProps> = ({
  hoveredComponent,
  hoveredSlot,
  placedCount,
  totalCount,
  achievements,
  wrongAttempts,
}) => {
  const component = hoveredComponent 
    ? PC_COMPONENTS.find(c => c.id === hoveredComponent)
    : null;
  const slotComponent = hoveredSlot
    ? PC_COMPONENTS.find(c => c.slotId === hoveredSlot)
    : null;
  const displayComponent = component || slotComponent;
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  return (
    <div className="h-full flex flex-col gap-4">
      {/* Component Info */}
      <div className="glass-panel p-4 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-violet-400" />
          <h3 className="font-orbitron text-sm font-bold gradient-text">COMPONENT INFO</h3>
        </div>
        {displayComponent ? (
          <div className="space-y-4">
            {/* Component Preview */}
            <div className="flex justify-center py-4 bg-surface/50 rounded-xl">
              <ComponentIcon componentId={displayComponent.id} size="lg" />
            </div>
            {/* Name & Category */}
            <div>
              <h4 className="font-orbitron text-lg font-bold text-white mb-1">
                {displayComponent.name}
              </h4>
              <span className="text-xs font-space uppercase tracking-wider text-violet-400">
                {displayComponent.category}
              </span>
            </div>
            {/* Description */}
            <p className="text-sm font-space text-gray-300 leading-relaxed">
              {displayComponent.description}
            </p>
            {/* Installation Tip */}
            <div className="flex items-start gap-2 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Lightbulb className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs font-space text-cyan-300">
                {displayComponent.tip}
              </p>
            </div>
            {/* Difficulty */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-space text-gray-400">Difficulty</span>
              <span className={`font-orbitron text-sm font-bold uppercase ${getDifficultyColor(displayComponent.difficulty)}`}>
                {displayComponent.difficulty}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-violet-400/50" />
            </div>
            <p className="text-sm font-space text-gray-500">
              Hover over a component or slot to see details
            </p>
          </div>
        )}
      </div>
      {/* Statistics */}
      <div className="glass-panel p-4">
        <h3 className="font-orbitron text-sm font-bold gradient-text mb-4">STATISTICS</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-space text-gray-400">Progress</span>
            <span className="font-orbitron text-sm font-bold text-emerald-400">
              {Math.round((placedCount / totalCount) * 100)}%
            </span>
          </div>
          
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${(placedCount / totalCount) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-space text-gray-400">Wrong Attempts</span>
            <span className={`font-orbitron text-sm font-bold ${wrongAttempts > 5 ? 'text-red-400' : 'text-amber-400'}`}>
              {wrongAttempts}
            </span>
          </div>
        </div>
      </div>
      {/* Achievements */}
      <div className="glass-panel p-4">
        <h3 className="font-orbitron text-sm font-bold gradient-text mb-4">ACHIEVEMENTS</h3>
        
        <div className="space-y-2">
          {Object.entries(ACHIEVEMENT_DATA).map(([key, data]) => {
            const isUnlocked = achievements.includes(key);
            return (
              <div
                key={key}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                  isUnlocked 
                    ? `bg-${data.color}-500/10 border border-${data.color}-500/30` 
                    : 'bg-surface/30 opacity-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isUnlocked ? `bg-${data.color}-500/20 text-${data.color}-400` : 'bg-gray-700/50 text-gray-500'
                }`}>
                  {data.icon}
                </div>
                <span className={`text-sm font-space ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                  {data.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
