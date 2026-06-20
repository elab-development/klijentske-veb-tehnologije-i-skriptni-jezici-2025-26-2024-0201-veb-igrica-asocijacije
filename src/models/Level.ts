export interface IColumn {
  name: string;
  words: string[];
  solution: string;
}

export type Difficulty = 'Lako' | 'Srednje' | 'Teško';

export type LevelStatus = 'Završeno' | 'Dostupno' | 'Zaključano';

export type AnswerTarget =
  | 'Kolona A'
  | 'Kolona B'
  | 'Kolona C'
  | 'Kolona D'
  | 'Konačno';

export interface ILevel {
  id: number;
  title: string;
  icon: string;
  difficulty: Difficulty;
  category: string;
  points: number;
  status: LevelStatus;
  description: string;
  columns: IColumn[];
  finalSolution: string;
}