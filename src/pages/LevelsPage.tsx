import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LevelCard from '../components/LevelCard';
import type { ILevel } from '../models/Level';
import { fetchLevels } from '../services/api';
import { getStoredStats } from '../services/statsStorage';

export default function LevelsPage() {
  const location = useLocation();

  const [levels, setLevels] = useState<ILevel[]>([]);
  const [completedLevelIds, setCompletedLevelIds] = useState<number[]>([]);
  const [filter, setFilter] = useState('Svi nivoi');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLevels().then(setLevels);
  }, []);

  useEffect(() => {
    const stats = getStoredStats();
    setCompletedLevelIds(stats.completedLevelIds);
  }, [location.pathname]);

  const levelsWithProgress = useMemo<ILevel[]>(
  () =>
    levels.map((level) => {
      if (level.status === 'Zaključano') {
        return level;
      }

      return {
        ...level,
        status: completedLevelIds.includes(level.id) ? 'Završeno' : 'Dostupno',
      };
    }),
  [levels, completedLevelIds],
);

  const filtered = useMemo(
    () =>
      levelsWithProgress.filter(
        (level) =>
          (filter === 'Svi nivoi' ||
            level.difficulty === filter ||
            level.status === filter) &&
          level.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [levelsWithProgress, filter, search],
  );

  const filters = ['Svi nivoi', 'Lako', 'Srednje', 'Teško', 'Završeno'];

  return (
    <main className="page">
      <h1>Svi nivoi</h1>
      <p>Izaberite nivo i počnite sa igrom</p>

      <input
        className="search"
        placeholder="Pretraži nivoe..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="filters">
        {filters.map((filterOption) => (
          <button
            className={filter === filterOption ? 'active' : ''}
            onClick={() => setFilter(filterOption)}
            key={filterOption}
          >
            {filterOption}
          </button>
        ))}
      </div>

      <div className="level-grid">
        {filtered.map((level) => (
          <LevelCard level={level} key={level.id} />
        ))}
      </div>
    </main>
  );
}