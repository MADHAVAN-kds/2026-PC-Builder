import React from 'react';
import { PCComponent } from '@/data/components';
import { ComponentIcon } from './ComponentIcon';
import { cn } from '@/lib/utils';
interface ComponentCardProps {
  component: PCComponent;
  isPlaced: boolean;
  onDragStart: (componentId: string) => void;
  onDragEnd: () => void;
  onHover: (componentId: string | null) => void;
  index: number;
}
export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isPlaced,
  onDragStart,
  onDragEnd,
  onHover,
  index,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };
  const handleDragStart = (e: React.DragEvent) => {
    if (isPlaced) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('componentId', component.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(component.id);
  };
  return (
    <div
      draggable={!isPlaced}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={() => onHover(component.id)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        'group relative p-3 rounded-xl border transition-all duration-300',
        'animate-fade-in',
        isPlaced
          ? 'bg-surface/30 border-border/20 opacity-50 cursor-not-allowed grayscale'
          : 'bg-surface/50 border-border/30 cursor-grab hover:-translate-y-2 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/20 active:cursor-grabbing active:scale-95'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Component Icon */}
      <div className="flex justify-center mb-2 py-2">
        <ComponentIcon componentId={component.id} size="md" />
      </div>
      {/* Name */}
      <h4 className="font-space text-xs font-medium text-foreground text-center mb-2 line-clamp-2">
        {component.name}
      </h4>
      {/* Difficulty Badge */}
      <div className="flex justify-center">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getDifficultyColor(component.difficulty)}`}>
          {component.difficulty}
        </span>
      </div>
      {/* Placed Indicator */}
      {isPlaced && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/80 rounded-xl">
          <span className="text-xs font-space text-emerald-400">Placed ✓</span>
        </div>
      )}
      {/* Hover Glow */}
      {!isPlaced && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
             style={{ boxShadow: 'inset 0 0 20px rgba(139, 92, 246, 0.1)' }} />
      )}
    </div>
  );
};
