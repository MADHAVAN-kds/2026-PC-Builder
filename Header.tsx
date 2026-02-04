import React from 'react';
import { Cpu, Clock, Target } from 'lucide-react';
interface HeaderProps {
  timer: number;
  placedCount: number;
  totalCount: number;
}
export const Header: React.FC<HeaderProps> = ({ timer, placedCount, totalCount }) => {
  const progress = (placedCount / totalCount) * 100;
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel mx-4 mt-4 rounded-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center animate-pulse">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 blur-lg opacity-50" />
            </div>
            <div>
              <h1 className="font-orbitron text-xl font-bold gradient-text">
                PC BUILD SIMULATOR
              </h1>
              <p className="text-xs font-space text-muted-foreground">
                Learn to build your dream PC
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="flex items-center gap-8">
            {/* Timer */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-space text-muted-foreground uppercase tracking-wider">Time</p>
                <p className="font-orbitron text-lg font-bold text-cyan-400">
                  {formatTime(timer)}
                </p>
              </div>
            </div>
            {/* Component Counter */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center">
                <Target className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-xs font-space text-muted-foreground uppercase tracking-wider">Components</p>
                <p className="font-orbitron text-lg font-bold text-violet-400">
                  {placedCount}/{totalCount}
                </p>
              </div>
            </div>
            {/* Progress Ring */}
            <div className="relative w-14 h-14">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="18"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.2)"
                  strokeWidth="4"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="18"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500 ease-out"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-orbitron text-xs font-bold text-white">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
