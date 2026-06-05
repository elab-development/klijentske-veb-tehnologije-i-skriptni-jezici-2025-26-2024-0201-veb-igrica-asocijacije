import { useEffect, useMemo, useState } from 'react';
import LevelCard from '../components/LevelCard';
import { ILevel } from '../models/Level';
import { fetchLevels } from '../services/api';
export default function LevelsPage() {
  const [levels, setLevels] = useState<ILevel[]>([]);
  const [filter, setFilter] = useState('Svi nivoi');
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchLevels().then(setLevels);
  }, []);
  const filtered = useMemo(
    () =>
      levels.filter(
        (l) =>
          (filter === 'Svi nivoi' || l.difficulty === filter || l.status === filter) &&
          l.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [levels, filter, search],
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
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filters">
        {filters.map((f) => (
          <button
            className={filter === f ? 'active' : ''}
            onClick={() => setFilter(f)}
            key={f}
          >
            {f}
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
