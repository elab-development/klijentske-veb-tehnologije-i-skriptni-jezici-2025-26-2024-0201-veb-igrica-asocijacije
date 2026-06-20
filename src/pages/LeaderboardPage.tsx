import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import { IPlayer } from '../models/Player';
import type { IUserStats } from '../models/StatsManager';
import { getStoredStats } from '../services/statsStorage';

const basePlayers: IPlayer[] = [
  'Aleksandra K.|alex_kviz|31750|89|102|Legenda',
  'Jana N.|jana_nm|21400|67|84|Majstor',
  'Saša P.|sasha_pro|18900|54|71|Majstor',
  'Nina V.|nina_words|13200|42|58|Ekspert',
  'Ivan J.|ivan_quiz|11800|38|55|Ekspert',
  'Milica T.|milica_99|10400|31|50|Napredni',
  'Petar S.|pera_detektiv|9600|28|46|Napredni',
  'Jovana M.|jovana_m|8100|24|42|Standardni',
  'Bojan A.|bojan_as|7250|19|38|Standardni',
  'Luka R.|luka_r|6900|17|31|Standardni',
  'Mina D.|mina_d|6200|15|29|Početnik',
].map((x, i) => {
  const [name, username, points, wins, games, rank] = x.split('|');

  return {
    id: i + 1,
    name,
    username,
    points: +points,
    wins: +wins,
    games: +games,
    rank,
    difficulty: i % 3 === 0 ? 'Lako' : i % 3 === 1 ? 'Srednje' : 'Teško',
  } as IPlayer;
});

function getPlayerRank(points: number): string {
  if (points >= 30000) return 'Legenda';
  if (points >= 20000) return 'Majstor';
  if (points >= 12000) return 'Ekspert';
  if (points >= 8000) return 'Napredni';
  if (points >= 3000) return 'Standardni';

  return 'Početnik';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function LeaderboardPage() {
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState<IUserStats>(() => getStoredStats());

  const per = 5;

  useEffect(() => {
    setStats(getStoredStats());
  }, []);

  const currentUser = useMemo(
    () =>
      ({
        id: 999,
        name: 'Milja Stojanović',
        username: 'milja_asoc',
        points: stats.totalPoints,
        wins: stats.wins,
        games: stats.totalGames,
        rank: getPlayerRank(stats.totalPoints),
        difficulty: 'Srednje',
      }) as IPlayer,
    [stats],
  );

  const players = useMemo(
    () =>
      [...basePlayers, currentUser].sort((a, b) => b.points - a.points),
    [currentUser],
  );

  const visible = useMemo(
    () => players.slice((page - 1) * per, page * per),
    [page, players],
  );

  const maxPage = Math.ceil(players.length / per);
  const topThree = players.slice(0, 3);

  return (
    <main className="page">
      <h1>🏆 Rang lista</h1>
      <p>Najbolji igrači ove sezone</p>

      <div className="podium">
        {topThree[1] && (
          <div>
            {getInitials(topThree[1].name)}
            <br />
            <b>2.</b>
          </div>
        )}

        {topThree[0] && (
          <div className="winner">
            {getInitials(topThree[0].name)}
            <br />
            <b>1.</b>
          </div>
        )}

        {topThree[2] && (
          <div>
            {getInitials(topThree[2].name)}
            <br />
            <b>3.</b>
          </div>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Igrač</th>
            <th>Poeni</th>
            <th>Pobede</th>
            <th>Igre</th>
            <th>Rang</th>
          </tr>
        </thead>

        <tbody>
          {visible.map((player, index) => (
            <tr
              className={player.username === 'milja_asoc' ? 'highlight' : ''}
              key={player.id}
            >
              <td>{(page - 1) * per + index + 1}</td>

              <td>
                <b>{player.name}</b>
                <br />
                <small>@{player.username}</small>
              </td>

              <td>{player.points.toLocaleString('sr-RS')}</td>
              <td>{player.wins}</td>
              <td>{player.games}</td>

              <td>
                <span className="rank">{player.rank}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pager">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prethodna
        </Button>

        <span>
          Strana {page} / {maxPage}
        </span>

        <Button disabled={page === maxPage} onClick={() => setPage(page + 1)}>
          Sledeća
        </Button>
      </div>
    </main>
  );
}