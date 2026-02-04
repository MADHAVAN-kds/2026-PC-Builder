import React, { useEffect, useState } from 'react';
import { Trophy, Clock, Target, Star, RotateCcw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface CelebrationModalProps {
  isOpen: boolean;
  time: number;
  wrongAttempts: number;
  onRestart: () => void;
}
const Confetti: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 3;
  const duration = 3 + Math.random() * 2;
  const size = 6 + Math.random() * 8;
  return (
    <div
      className="absolute animate-confetti"
      style={{
        left: `${left}%`,
        top: '-20px',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
};
export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  time,
  wrongAttempts,
  onRestart,
}) => {
  const [showStats, setShowStats] = useState(false);
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowStats(true), 500);
      return () => clearTimeout(timer);
    }
    setShowStats(false);
  }, [isOpen]);
  if (!isOpen) return null;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const getGrade = () => {
    if (time < 120 && wrongAttempts === 0) return { grade: 'S+', color: 'text-amber-400', glow: 'shadow-amber-500/50' };
    if (time < 180) return { grade: 'S', color: 'text-violet-400', glow: 'shadow-violet-500/50' };
    if (time < 300) return { grade: 'A', color: 'text-cyan-400', glow: 'shadow-cyan-500/50' };
    if (time < 480) return { grade: 'B', color: 'text-emerald-400', glow: 'shadow-emerald-500/50' };
    return { grade: 'C', color: 'text-gray-400', glow: 'shadow-gray-500/50' };
  };
  const gradeInfo = getGrade();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />
      
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <Confetti key={i} index={i} />
        ))}
      </div>
      {/* Modal */}
      <div className="relative glass-panel p-8 max-w-md w-full mx-4 animate-scale-in">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center animate-pulse-glow">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            {/* Pulse Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-ping" />
            <div className="absolute inset-0 rounded-full border border-amber-400/30 animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
        {/* Title */}
        <h2 className="text-center font-orbitron text-3xl font-bold gradient-text mb-2">
          BUILD COMPLETE!
        </h2>
        <p className="text-center font-space text-gray-400 mb-8">
          Congratulations, PC Master!
        </p>
        {/* Grade */}
        <div className="flex justify-center mb-8">
          <div className={`text-7xl font-orbitron font-black ${gradeInfo.color} drop-shadow-lg ${gradeInfo.glow}`}
               style={{ textShadow: `0 0 30px currentColor` }}>
            {gradeInfo.grade}
          </div>
        </div>
        {/* Stats */}
        <div className={`space-y-4 transition-all duration-500 ${showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="font-space text-gray-300">Time</span>
            </div>
            <span className="font-orbitron text-lg font-bold text-cyan-400">
              {formatTime(time)}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-violet-400" />
              <span className="font-space text-gray-300">Components</span>
            </div>
            <span className="font-orbitron text-lg font-bold text-violet-400">
              32/32
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="font-space text-gray-300">Wrong Attempts</span>
            </div>
            <span className={`font-orbitron text-lg font-bold ${wrongAttempts === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {wrongAttempts}
            </span>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={onRestart}
            className="flex-1 h-12 font-orbitron font-bold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0 neon-violet"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            PLAY AGAIN
          </Button>
          <Button
            variant="outline"
            className="h-12 px-6 font-orbitron font-bold border-violet-500/50 text-violet-400 hover:bg-violet-500/10"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
