export class ScoreCalculator {
  calculateScore(
    basePoints: number,
    openedFields: number,
    remainingTime: number,
  ): number {
    return Math.max(0, basePoints - openedFields * 50);
  }
}
