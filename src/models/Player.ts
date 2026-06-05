export interface IPlayer {
  id: number;
  name: string;
  username: string;
  points: number;
  wins: number;
  games: number;
  rank: string;
  difficulty: 'Svi nivoi' | 'Lako' | 'Srednje' | 'Teško';
}
