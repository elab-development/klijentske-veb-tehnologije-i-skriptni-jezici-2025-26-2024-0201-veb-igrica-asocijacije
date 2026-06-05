import { ILevel } from '../models/Level';
export async function fetchLevels(): Promise<ILevel[]> {
  const res = await fetch('/data/levels.json');
  if (!res.ok) throw new Error('Greška pri učitavanju nivoa');
  return res.json();
}
