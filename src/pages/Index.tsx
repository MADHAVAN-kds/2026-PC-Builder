import React, { useState, useCallback } from 'react';
import { BackgroundEffects } from '@/components/PCSimulator/BackgroundEffects';
import { Header } from '@/components/PCSimulator/Header';
import { ComponentTray } from '@/components/PCSimulator/ComponentTray';
import { PCCase } from '@/components/PCSimulator/PCCase';
import { InfoPanel } from '@/components/PCSimulator/InfoPanel';
import { CelebrationModal } from '@/components/PCSimulator/CelebrationModal';
import { AchievementToast } from '@/components/PCSimulator/AchievementToast';
import { useGameState } from '@/hooks/useGameState';
const Index: React.FC = () => {
  const {
    placedComponents,
    timer,
    wrongAttempts,
    achievements,
    isComplete,
    placeComponent,
    incrementWrongAttempts,
    resetGame,
    placedCount,
    totalCount,
  } = useGameState();
  const [currentDragging, setCurrentDragging] = useState<string | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [latestAchievement, setLatestAchievement] = useState<string | null>(null);
  const handleDragStart = useCallback((componentId: string) => {
    setCurrentDragging(componentId);
  }, []);
  const handleDragEnd = useCallback(() => {
    setCurrentDragging(null);
  }, []);
  const handleDrop = useCallback((slotId: string, componentId: string) => {
    const newAchievement = placeComponent(slotId, componentId);
    if (newAchievement) {
      setLatestAchievement(newAchievement);
    }
  }, [placeComponent]);
  const handleWrongDrop = useCallback(() => {
    incrementWrongAttempts();
  }, [incrementWrongAttempts]);
const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
      </div>
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Background Effects */}
      <BackgroundEffects />
      {/* Header */}
      <Header
        timer={timer}
        placedCount={placedCount}
        totalCount={totalCount}
      />
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
          {/* Left: Component Tray */}
          <div className="col-span-3 h-full overflow-hidden">
            <ComponentTray
              placedComponents={placedComponents}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onHover={setHoveredComponent}
            />
          </div>
          {/* Center: PC Case */}
          <div className="col-span-6 h-full">
            <PCCase
              placedComponents={placedComponents}
              onDrop={handleDrop}
              currentDragging={currentDragging}
              hoveredSlot={hoveredSlot}
              onSlotHover={setHoveredSlot}
            />
          </div>
          {/* Right: Info Panel */}
          <div className="col-span-3 h-full overflow-auto">
            <InfoPanel
              hoveredComponent={hoveredComponent}
              hoveredSlot={hoveredSlot}
              placedCount={placedCount}
              totalCount={totalCount}
              achievements={achievements}
              wrongAttempts={wrongAttempts}
            />
          </div>
        </div>
      </main>
      {/* Achievement Toast */}
      <AchievementToast
        achievement={latestAchievement}
        onDismiss={() => setLatestAchievement(null)}
      />
      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={isComplete}
        time={timer}
        wrongAttempts={wrongAttempts}
        onRestart={resetGame}
      />
    </div>
  );
