import { useMemo, useState } from 'react';
import Button from '../components/Button';
import { IPlayer } from '../models/Player';
const players: IPlayer[] = [
  'Aleksandra K.|alex_kviz|31750|89|102|Legenda',
  'Jana N.|jana_nm|21400|67|84|Majstor',
  'Saša P.|sasha_pro|18900|54|71|Majstor',
  'Milja S.|milja_asoc|14550|98|142|Veteran',
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
export default function LeaderboardPage() {
  const [page, setPage] = useState(1);
  const per = 5;
  const visible = useMemo(() => players.slice((page - 1) * per, page * per), [page]);
  return (
    <main className="page">
      <h1>🏆 Rang lista</h1>
      <p>Najbolji igrači ove sezone</p>
      <div className="podium">
        <div>
          JN
          <br />
          <b>2.</b>
        </div>
        <div className="winner">
          AK
          <br />
          <b>1.</b>
        </div>
        <div>
          SP
          <br />
          <b>3.</b>
        </div>
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
          {visible.map((p, i) => (
            <tr className={p.username === 'milja_asoc' ? 'highlight' : ''} key={p.id}>
              <td>{(page - 1) * per + i + 1}</td>
              <td>
                <b>{p.name}</b>
                <br />
                <small>@{p.username}</small>
              </td>
              <td>{p.points.toLocaleString('sr-RS')}</td>
              <td>{p.wins}</td>
              <td>{p.games}</td>
              <td>
                <span className="rank">{p.rank}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pager">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prethodna
        </Button>
        <span>Strana {page}</span>
        <Button
          disabled={page === Math.ceil(players.length / per)}
          onClick={() => setPage(page + 1)}
        >
          Sledeća
        </Button>
      </div>
    </main>
  );
}
