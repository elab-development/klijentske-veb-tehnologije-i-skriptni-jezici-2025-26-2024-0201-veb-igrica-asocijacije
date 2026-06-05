export interface IColumn {
  name: string;
  words: string[];
  solution: string;
}
export interface ILevel {
  id: number;
  title: string;
  icon: string;
  difficulty: 'Lako' | 'Srednje' | 'Teško';
  category: string;
  points: number;
  status: 'Završeno' | 'Dostupno' | 'Zaključano';
  description: string;
  columns: IColumn[];
  finalSolution: string;
}
export class ScoreCalculator {
  calculateScore(
    basePoints: number,
    openedFields: number,
    remainingSeconds: number,
  ): number {
    return Math.max(0, basePoints + remainingSeconds * 2 - openedFields * 50);
  }
}
