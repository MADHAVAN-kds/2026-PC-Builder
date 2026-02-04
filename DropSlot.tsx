import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ComponentIcon } from './ComponentIcon';
import { PC_COMPONENTS } from '@/data/components';
import { Check } from 'lucide-react';
interface DropSlotProps {
  slotId: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  category: string;
  isOccupied: boolean;
  placedComponentId?: string;
  onDrop: (slotId: string, componentId: string) => void;
  currentDragging: string | null;
  isHovered: boolean;
  onHover: (slotId: string | null) => void;
}
export const DropSlot: React.FC<DropSlotProps> = ({
  slotId,
  label,
  x,
  y,
  width,
  height,
  category,
  isOccupied,
  placedComponentId,
  onDrop,
  currentDragging,
  isHovered,
  onHover,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isOccupied) {
      setIsDragOver(true);
      onHover(slotId);
    }
  };
  const handleDragLeave = () => {
    setIsDragOver(false);
    onHover(null);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const componentId = e.dataTransfer.getData('componentId');
    if (!componentId || isOccupied) return;
    // Check if this is the correct slot
    const component = PC_COMPONENTS.find(c => c.id === componentId);
    if (component?.slotId === slotId) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
      onDrop(slotId, componentId);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 500);
    }
  };
  const getCategoryColor = () => {
    switch (category) {
      case 'core': return 'violet';
      case 'storage': return 'cyan';
      case 'cooling': return 'blue';
      case 'power': return 'amber';
      case 'extras': return 'emerald';
      default: return 'violet';
    }
  };
  const color = getCategoryColor();
  const placedComponent = placedComponentId 
    ? PC_COMPONENTS.find(c => c.id === placedComponentId)
    : null;
  return (
    <div
      className={cn(
        'absolute transition-all duration-300 rounded-md',
        'border-2 border-dashed',
        isOccupied 
          ? 'border-emerald-500/50 bg-emerald-500/10' 
          : `border-${color}-500/30 hover:border-${color}-500/60`,
        isDragOver && !isOccupied && 'border-solid animate-slot-pulse',
        showSuccess && 'animate-success-snap',
        showError && 'animate-shake'
      )}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        boxShadow: isDragOver && !isOccupied
          ? `0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)`
          : isOccupied
          ? `0 0 15px rgba(16, 185, 129, 0.4)`
          : showError
          ? `0 0 20px rgba(239, 68, 68, 0.6)`
          : 'none',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={() => onHover(slotId)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Corner Markers */}
      {(isDragOver || isHovered) && !isOccupied && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-violet-500" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-violet-500" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-violet-500" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-violet-500" />
        </>
      )}
      {/* Slot Label */}
      {!isOccupied && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[8px] font-space text-white/40 text-center px-1 truncate">
            {label}
          </span>
        </div>
      )}
      {/* Placed Component */}
      {isOccupied && placedComponent && (
        <div className="absolute inset-0 flex items-center justify-center p-1">
          <div className="w-full h-full flex items-center justify-center">
            <ComponentIcon componentId={placedComponent.id} size="sm" />
          </div>
          {/* Success Checkmark */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
            <Check className="w-3 h-3 text-white" />
          </div>
        </div>
      )}
      {/* Success Flash */}
      {showSuccess && (
        <div className="absolute inset-0 bg-emerald-500/30 rounded-md animate-pulse" />
      )}
      {/* Error Flash */}
      {showError && (
        <div className="absolute inset-0 bg-red-500/30 rounded-md" />
      )}
    </div>
  );
};
