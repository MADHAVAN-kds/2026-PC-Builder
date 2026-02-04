import React, { useEffect, useState } from 'react';
import { Trophy, Zap, Target, Flame, Star } from 'lucide-react';
interface AchievementToastProps {
  achievement: string | null;
  onDismiss: () => void;
}
const ACHIEVEMENT_CONFIG: Record<string, { 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string;
  color: string;
  bgColor: string;
}> = {
  'started': {
    icon: <Zap className="w-6 h-6" />,
    title: 'Getting Started!',
    subtitle: '25% Complete',
    color: 'text-cyan-400',
    bgColor: 'from-cyan-500/20 to-blue-500/20',
  },
  'halfway': {
    icon: <Target className="w-6 h-6" />,
    title: 'Halfway There!',
    subtitle: '50% Complete',
    color: 'text-violet-400',
    bgColor: 'from-violet-500/20 to-purple-500/20',
  },
  'almost': {
    icon: <Flame className="w-6 h-6" />,
    title: 'Almost Done!',
    subtitle: '75% Complete',
    color: 'text-amber-400',
    bgColor: 'from-amber-500/20 to-orange-500/20',
  },
  'complete': {
    icon: <Trophy className="w-6 h-6" />,
    title: 'PC Master!',
    subtitle: '100% Complete',
    color: 'text-emerald-400',
    bgColor: 'from-emerald-500/20 to-green-500/20',
  },
};
export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);
  if (!achievement || !ACHIEVEMENT_CONFIG[achievement]) return null;
  const config = ACHIEVEMENT_CONFIG[achievement];
  return (
    <div
      className={`fixed top-24 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`glass-panel p-4 flex items-center gap-4 bg-gradient-to-r ${config.bgColor} border border-white/10`}
           style={{ 
             boxShadow: `0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)` 
           }}>
        {/* Icon */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center ${config.color} animate-bounce`}>
          {config.icon}
        </div>
        {/* Text */}
        <div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '2s' }} />
            <span className="text-xs font-space uppercase tracking-wider text-gray-400">
              Achievement Unlocked!
            </span>
          </div>
          <h4 className={`font-orbitron text-lg font-bold ${config.color}`}>
            {config.title}
          </h4>
          <p className="text-sm font-space text-gray-400">{config.subtitle}</p>
        </div>
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl animate-pulse opacity-30"
             style={{ 
               background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.3), transparent)` 
             }} />
      </div>
    </div>
  );
};
