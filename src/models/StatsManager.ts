export interface IGameResult {
  levelId: number;
  levelTitle: string;
  isWin: boolean;
  score: number;
  timeSpentSeconds: number;
  remainingSeconds: number;
  openedFields: number;
}

export interface IUserStats {
  totalGames: number;
  wins: number;
  losses: number;
  totalPoints: number;
  bestScore: number;
  currentStreak: number;
  bestStreak: number;
  totalTimeSeconds: number;
  completedLevelIds: number[];
  activities: string[];
}

export interface IStatsManager {
  getInitialStats(): IUserStats;
  applyGameResult(stats: IUserStats, result: IGameResult): IUserStats;
  resetStats(): IUserStats;
}

export class StatsManager implements IStatsManager {
  getInitialStats(): IUserStats {
    return {
      totalGames: 0,
      wins: 0,
      losses: 0,
      totalPoints: 0,
      bestScore: 0,
      currentStreak: 0,
      bestStreak: 0,
      totalTimeSeconds: 0,
      completedLevelIds: [],
      activities: [],
    };
  }

  applyGameResult(stats: IUserStats, result: IGameResult): IUserStats {
    const newCurrentStreak = result.isWin ? stats.currentStreak + 1 : 0;

    const completedLevelIds =
      result.isWin && !stats.completedLevelIds.includes(result.levelId)
        ? [...stats.completedLevelIds, result.levelId]
        : stats.completedLevelIds;

    return {
      totalGames: stats.totalGames + 1,
      wins: stats.wins + (result.isWin ? 1 : 0),
      losses: stats.losses + (result.isWin ? 0 : 1),
      totalPoints: stats.totalPoints + result.score,
      bestScore: Math.max(stats.bestScore, result.score),
      currentStreak: newCurrentStreak,
      bestStreak: Math.max(stats.bestStreak, newCurrentStreak),
      totalTimeSeconds: stats.totalTimeSeconds + result.timeSpentSeconds,
      completedLevelIds,
      activities: [this.createActivity(result), ...stats.activities].slice(0, 10),
    };
  }

  resetStats(): IUserStats {
    return this.getInitialStats();
  }

  private createActivity(result: IGameResult): string {
    const icon = result.isWin ? '🏆' : '❌';
    const status = result.isWin ? 'Pobeda' : 'Poraz';
    const points = result.isWin ? `+${result.score} pts` : '0 pts';

    return `${icon} ${status} - ${result.levelTitle} ${points}`;
  }
}