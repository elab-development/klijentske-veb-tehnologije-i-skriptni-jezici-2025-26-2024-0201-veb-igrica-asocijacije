import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { fetchLevels } from '../services/api';
import type { ILevel } from '../models/Level';
import { ScoreCalculator } from '../models/ScoreCalculator';

export default function GamePage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [level, setLevel] = useState<ILevel | null>(null);
  const [opened, setOpened] = useState<number[]>([]);
  const [time, setTime] = useState(180);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLevels().then((levels) => {
      const selectedLevel = levels.find((x) => x.id === Number(id)) || levels[0];
      setLevel(selectedLevel);
    });
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calc = useMemo(() => new ScoreCalculator(), []);

  if (!level) {
    return <main className="page">Učitavanje...</main>;
  }

  const currentLevel = level;

  const columns =
    currentLevel.columns.length > 0
      ? currentLevel.columns
      : [
          {
            name: 'Kolona A',
            words: ['Lav', 'Tigar', 'Leopard', 'Jaguar'],
            solution: 'Mačke',
          },
          {
            name: 'Kolona B',
            words: ['Hrast', 'Jela', 'Bor', 'Breza'],
            solution: 'Drveće',
          },
          {
            name: 'Kolona C',
            words: ['Sava', 'Dunav', 'Tisa', 'Morava'],
            solution: 'Reke',
          },
          {
            name: 'Kolona D',
            words: ['Ruža', 'Lala', 'Iris', 'Ljiljan'],
            solution: 'Cveće',
          },
        ];

  const allWords = columns.flatMap((column) => column.words);

  const points = calc.calculateScore(currentLevel.points, opened.length, time);

  function openField() {
    const next = allWords.findIndex((_, index) => !opened.includes(index));

    if (next >= 0) {
      setOpened([...opened, next]);
    }
  }

  function check() {
    const possibleAnswers = [
      ...columns.map((column) => column.solution.toLowerCase()),
      currentLevel.finalSolution.toLowerCase(),
    ];

    const isCorrect = possibleAnswers.includes(answer.toLowerCase().trim());

    if (isCorrect) {
      setMessage('Tačan odgovor! Demo rezultat je sačuvan.');
      localStorage.setItem('lastScore', String(points));
    } else {
      setMessage('Nije tačno, pokušajte ponovo.');
    }
  }

  return (
    <main className="page game">
      <div className="game-head">
        <div>
          <h1>🎯 Nivo: {currentLevel.title}</h1>
          <p>Otvorite polja i pogodite asocijacije.</p>
        </div>

        <div className="game-stats">
          <b>
            Poeni
            <br />
            {points}
          </b>

          <b>
            Vreme
            <br />
            {Math.floor(time / 60)
              .toString()
              .padStart(2, '0')}
            :{(time % 60).toString().padStart(2, '0')}
          </b>
          <b>
            Polja
            <br />
            {opened.length}/16
          </b>

          <b>
            Pokušaji
            <br />5
          </b>

          <Button variant="danger" onClick={() => nav('/levels')}>
            Odustani
          </Button>
        </div>
      </div>

      <div className="board">
        {columns.map((column, columnIndex) => (
          <div className="col" key={column.name}>
            <small>{column.name}</small>

            {column.words.map((word, wordIndex) => {
              const index = columnIndex * 4 + wordIndex;

              return (
                <button
                  className="cell"
                  onClick={() => {
                    if (!opened.includes(index)) {
                      setOpened([...opened, index]);
                    }
                  }}
                  key={word}
                >
                  {opened.includes(index) ? word : '?'}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="solutions">
        {columns.map((column) => (
          <span key={column.name}>???</span>
        ))}
      </div>

      <section className="answer">
        <h3>🏁 Konačno rešenje asocijacije</h3>

        <input
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Upišite odgovor ovde..."
        />

        <Button onClick={check}>✓ Proveri</Button>

        <Button variant="ghost" onClick={openField}>
          🔓 Otvori polje (-50 pts)
        </Button>

        <Button variant="ghost" onClick={() => nav('/levels')}>
          ← Nazad na nivoe
        </Button>

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}
