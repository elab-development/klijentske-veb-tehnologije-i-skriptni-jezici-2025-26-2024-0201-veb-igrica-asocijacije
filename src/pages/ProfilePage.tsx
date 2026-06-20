import { useEffect, useState } from 'react';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import type { IUserStats } from '../models/StatsManager';
import { getStoredStats, resetStoredStats } from '../services/statsStorage';

function formatTime(totalSeconds: number): string {
  if (totalSeconds === 0) {
    return '0:00';
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function ProfilePage() {
  const [stats, setStats] = useState<IUserStats>(() => getStoredStats());

  useEffect(() => {
    setStats(getStoredStats());
  }, []);

  const winRate =
    stats.totalGames === 0 ? 0 : Math.round((stats.wins / stats.totalGames) * 100);

  const averageScore =
    stats.totalGames === 0 ? 0 : Math.round(stats.totalPoints / stats.totalGames);

  const averageTime =
    stats.totalGames === 0
      ? '0:00'
      : formatTime(Math.round(stats.totalTimeSeconds / stats.totalGames));

  const xpGoal = 10000;
  const currentXp = Math.min(stats.totalPoints, xpGoal);
  const xpPercent = Math.min(100, Math.round((currentXp / xpGoal) * 100));

  const profileStats = [
    ['ODIGRANE IGRE', String(stats.totalGames), `Pobede: ${stats.wins}, porazi: ${stats.losses}`],
    ['POBEDE', String(stats.wins), `Uspešnost ${winRate}%`],
    [
      'UKUPNI POENI',
      stats.totalPoints.toLocaleString('sr-RS'),
      `Prosek ${averageScore} po igri`,
    ],
    ['NAJBOLJI REZULTAT', String(stats.bestScore), 'Najveći ostvareni broj poena'],
    ['NIZ POBEDA', String(stats.currentStreak), `Najbolji niz: ${stats.bestStreak}`],
    ['PROSEČNO VREME', averageTime, 'min:sec po igri'],
  ];

  function handleResetStats() {
    const emptyStats = resetStoredStats();
    setStats(emptyStats);
  }

  return (
    <main className="page profile">
      <section className="profile-head">
        <div className="avatar">MS</div>

        <div>
          <h1>Milja Stojanović</h1>
          <p>@milja_asoc</p>

          <span className="tag">Nivo 24</span>
          <span className="tag">Top 50 igrač</span>
          <span className="tag">Veteran</span>
        </div>
      </section>

      <div className="section-title-row">
        <h2>Statistike</h2>

        <Button variant="ghost" onClick={handleResetStats}>
          Resetuj statistiku
        </Button>
      </div>

      <div className="stats wide">
        {profileStats.map((stat) => (
          <StatCard key={stat[0]} label={stat[0]} value={stat[1]} caption={stat[2]} />
        ))}
      </div>

      <section className="xp">
        <b>Iskustveni poeni</b>
        <strong>
          {currentXp.toLocaleString('sr-RS')} / {xpGoal.toLocaleString('sr-RS')} XP
        </strong>
        <span style={{ width: `${xpPercent}%` }} />
      </section>

      <h2>Završeni nivoi</h2>

      <div className="activity">
        {stats.completedLevelIds.length > 0
          ? `Završeni nivoi: ${stats.completedLevelIds.join(', ')}`
          : 'Još nema završenih nivoa.'}
      </div>

      <h2>Poslednje aktivnosti</h2>

      {stats.activities.length > 0 ? (
        stats.activities.map((activity) => (
          <div className="activity" key={activity}>
            {activity}
          </div>
        ))
      ) : (
        <div className="activity">
          Još nema aktivnosti. Odigraj nivo da bi se statistika prikazala ovde.
        </div>
      )}
    </main>
  );
}