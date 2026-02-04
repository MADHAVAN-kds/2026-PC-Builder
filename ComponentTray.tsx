import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ComponentCard } from './ComponentCard';
import { PC_COMPONENTS } from '@/data/components';
interface ComponentTrayProps {
  placedComponents: Record<string, string>;
  onDragStart: (componentId: string) => void;
  onDragEnd: () => void;
  onHover: (componentId: string | null) => void;
}
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'core', label: 'Core' },
  { id: 'storage', label: 'Storage' },
  { id: 'cooling', label: 'Cooling' },
  { id: 'power', label: 'Power' },
  { id: 'extras', label: 'Extras' },
];
export const ComponentTray: React.FC<ComponentTrayProps> = ({
  placedComponents,
  onDragStart,
  onDragEnd,
  onHover,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const placedComponentIds = useMemo(() => {
    return new Set(Object.values(placedComponents));
  }, [placedComponents]);
  const filteredComponents = useMemo(() => {
    return PC_COMPONENTS.filter((component) => {
      const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || component.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);
  return (
    <div className="h-full flex flex-col glass-panel p-4">
      {/* Title */}
      <h2 className="font-orbitron text-sm font-bold gradient-text mb-4">
        COMPONENTS
      </h2>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-surface border-border/50 font-space text-sm focus:border-violet-500/50"
        />
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-space font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50'
                : 'bg-surface/50 text-muted-foreground hover:bg-surface hover:text-foreground border border-transparent'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      {/* Component Grid */}
      <div className="flex-1 overflow-auto pr-2 -mr-2">
        <div className="grid grid-cols-2 gap-3">
          {filteredComponents.map((component, index) => (
            <ComponentCard
              key={component.id}
              component={component}
              isPlaced={placedComponentIds.has(component.id)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onHover={onHover}
              index={index}
            />
          ))}
        </div>
      </div>
      {/* Counter */}
      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="flex justify-between items-center">
          <span className="text-xs font-space text-muted-foreground">Available</span>
          <span className="font-orbitron text-sm font-bold text-violet-400">
            {PC_COMPONENTS.length - placedComponentIds.size}/{PC_COMPONENTS.length}
          </span>
        </div>
      </div>
    </div>
  );
};
