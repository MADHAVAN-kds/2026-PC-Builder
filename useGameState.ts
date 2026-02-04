import { useState, useEffect, useCallback } from 'react';
import { PC_COMPONENTS } from '@/data/components';
interface GameState {
  placedComponents: Record<string, string>;
  timer: number;
  wrongAttempts: number;
  achievements: string[];
  isComplete: boolean;
}
export const useGameState = () => {
  const [placedComponents, setPlacedComponents] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const totalCount = PC_COMPONENTS.length;
  const placedCount = Object.keys(placedComponents).length;
  // Timer effect
  useEffect(() => {
    if (!isStarted || isComplete) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isStarted, isComplete]);
  // Check achievements
  const checkAchievements = useCallback((newPlacedCount: number) => {
    const progress = (newPlacedCount / totalCount) * 100;
    const newAchievements: string[] = [];
    if (progress >= 25 && !achievements.includes('started')) {
      newAchievements.push('started');
    }
    if (progress >= 50 && !achievements.includes('halfway')) {
      newAchievements.push('halfway');
    }
    if (progress >= 75 && !achievements.includes('almost')) {
      newAchievements.push('almost');
    }
    if (progress >= 100 && !achievements.includes('complete')) {
      newAchievements.push('complete');
      setIsComplete(true);
    }
    if (newAchievements.length > 0) {
      setAchievements((prev) => [...prev, ...newAchievements]);
      return newAchievements[0]; // Return the first new achievement for toast
    }
    return null;
  }, [achievements, totalCount]);
  const placeComponent = useCallback((slotId: string, componentId: string) => {
    if (!isStarted) {
      setIsStarted(true);
    }
    setPlacedComponents((prev) => {
      const newPlaced = { ...prev, [slotId]: componentId };
      return newPlaced;
    });
    const newPlacedCount = Object.keys(placedComponents).length + 1;
    return checkAchievements(newPlacedCount);
  }, [checkAchievements, isStarted, placedComponents]);
  const incrementWrongAttempts = useCallback(() => {
    setWrongAttempts((prev) => prev + 1);
  }, []);
  const resetGame = useCallback(() => {
    setPlacedComponents({});
    setTimer(0);
    setWrongAttempts(0);
    setAchievements([]);
    setIsComplete(false);
    setIsStarted(false);
  }, []);
  return {
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
  };
};
