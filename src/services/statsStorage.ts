import type { IGameResult, IUserStats } from '../models/StatsManager';
import { StatsManager } from '../models/StatsManager';

const STORAGE_KEY = 'asocijacijeUserStats';

const statsManager = new StatsManager();

export function getStoredStats(): IUserStats {
  const initialStats = statsManager.getInitialStats();
  const rawStats = localStorage.getItem(STORAGE_KEY);

  if (!rawStats) {
    return initialStats;
  }

  try {
    const parsedStats = JSON.parse(rawStats) as Partial<IUserStats>;

    return {
      ...initialStats,
      ...parsedStats,
      completedLevelIds: parsedStats.completedLevelIds ?? [],
      activities: parsedStats.activities ?? [],
    };
  } catch {
    return initialStats;
  }
}

export function saveGameResult(result: IGameResult): IUserStats {
  const currentStats = getStoredStats();
  const updatedStats = statsManager.applyGameResult(currentStats, result);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));

  return updatedStats;
}

export function resetStoredStats(): IUserStats {
  const emptyStats = statsManager.resetStats();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyStats));

  return emptyStats;
}