import StatCard from '../components/StatCard';
export default function ProfilePage() {
  const stats = [
    ['ODIGRANE IGRE', '142', 'od toga 38 ove nedelje'],
    ['POBEDE', '98', 'Uspešnost 69%'],
    ['UKUPNI POENI', '24,55', '+1,200 ove nedelje'],
    ['NAJBOLJI REZULTAT', '980', 'Nivo Kultura · Teško'],
    ['NIZ POBEDA', '7', 'Trenutni niz'],
    ['PROSEČNO VREME', '2:34', 'min:sec po igri'],
  ];
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
      <h2>Statistike</h2>
      <div className="stats wide">
        {stats.map((s) => (
          <StatCard key={s[0]} label={s[0]} value={s[1]} caption={s[2]} />
        ))}
      </div>
      <section className="xp">
        <b>Iskustveni poeni</b>
        <strong>7,200 / 10,000 XP</strong>
        <span />
      </section>
      <h2>Poslednje aktivnosti</h2>
      {[
        '🏆 Pobeda - Nivo Sport i kultura +850 pts',
        '❌ Poraz - Nivo Hemija i nauka -0 pts',
        '⭐ Pobeda - Nivo Geografija +620 pts',
        '🎮 Pobeda - Nivo Filmovi i serije +310 pts',
        '🏆 Pobeda - Nivo Muzika sveta +480 pts',
      ].map((a) => (
        <div className="activity" key={a}>
          {a}
        </div>
      ))}
    </main>
  );
}
