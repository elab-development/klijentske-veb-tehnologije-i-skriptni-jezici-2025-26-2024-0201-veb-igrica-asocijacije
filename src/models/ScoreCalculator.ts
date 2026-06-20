export interface IScoreCalculator {
  calculateScore(
    basePoints: number,
    openedFields: number,
    remainingSeconds: number,
    solvedColumns: number,
    isFinalSolved: boolean
  ): number;
}

export class ScoreCalculator implements IScoreCalculator {
  calculateScore(
    basePoints: number,
    openedFields: number,
    remainingSeconds: number,
    solvedColumns: number,
    isFinalSolved: boolean
  ): number {
    const fieldPenalty = openedFields * 50;
    const timeBonus = remainingSeconds * 2;
    const columnBonus = solvedColumns * 100;
    const finalBonus = isFinalSolved ? 300 : 0;

    return Math.max(
      0,
      basePoints + timeBonus + columnBonus + finalBonus - fieldPenalty
    );
  }
}