import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { fetchLevels } from '../services/api';
import { saveGameResult } from '../services/statsStorage';
import type { AnswerTarget, ILevel } from '../models/Level';
import { ScoreCalculator } from '../models/ScoreCalculator';

const GAME_DURATION_SECONDS = 300;

const TARGETS: AnswerTarget[] = [
  'Kolona A',
  'Kolona B',
  'Kolona C',
  'Kolona D',
  'Konačno',
];

function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function GamePage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [level, setLevel] = useState<ILevel | null>(null);
  const [opened, setOpened] = useState<number[]>([]);
  const [time, setTime] = useState(GAME_DURATION_SECONDS);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [selectedTarget, setSelectedTarget] = useState<AnswerTarget>('Konačno');
  const [solvedColumns, setSolvedColumns] = useState<number[]>([]);
  const [isFinalSolved, setIsFinalSolved] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const calc = useMemo(() => new ScoreCalculator(), []);

  const currentLevel = level;
  const columns = currentLevel?.columns ?? [];
  const allWords = columns.flatMap((column) => column.words);

  function calculateCurrentPoints(
    finalSolved = isFinalSolved,
    solvedColumnCount = solvedColumns.length,
  ): number {
    if (!currentLevel) {
      return 0;
    }

    return calc.calculateScore(
      currentLevel.points,
      opened.length,
      time,
      solvedColumnCount,
      finalSolved,
    );
  }

  const points = calculateCurrentPoints();

  useEffect(() => {
    fetchLevels().then((levels) => {
      const selectedLevel = levels.find((x) => x.id === Number(id)) || levels[0];

      setLevel(selectedLevel);
      setOpened([]);
      setTime(GAME_DURATION_SECONDS);
      setAnswer('');
      setMessage('');
      setAttemptsLeft(5);
      setSelectedTarget('Konačno');
      setSolvedColumns([]);
      setIsFinalSolved(false);
      setGameFinished(false);
    });
  }, [id]);

  useEffect(() => {
    if (!currentLevel || gameFinished) {
      return;
    }

    if (time <= 0) {
      finishGame(false);
      return;
    }

    const timer = setInterval(() => {
      setTime((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentLevel, gameFinished, time]);

  function finishGame(
    isWin: boolean,
    finalSolved = isFinalSolved,
    solvedColumnCount = solvedColumns.length,
  ) {
    if (!currentLevel || gameFinished) {
      return;
    }

    const finalScore = isWin
      ? calculateCurrentPoints(finalSolved, solvedColumnCount)
      : 0;

    saveGameResult({
      levelId: currentLevel.id,
      levelTitle: currentLevel.title,
      isWin,
      score: finalScore,
      timeSpentSeconds: GAME_DURATION_SECONDS - time,
      remainingSeconds: time,
      openedFields: opened.length,
    });

    setGameFinished(true);

    if (isWin) {
      setIsFinalSolved(true);
      setMessage(`Bravo! Pogodili ste konačno rešenje i osvojili ${finalScore} poena.`);
    } else {
      setMessage('Igra je završena. Rezultat je sačuvan kao poraz.');
    }
  }

  function openCell(index: number) {
    if (gameFinished) {
      return;
    }

    setOpened((previousOpened) =>
      previousOpened.includes(index)
        ? previousOpened
        : [...previousOpened, index],
    );
  }

  function openField() {
    if (gameFinished) {
      return;
    }

    setOpened((previousOpened) => {
      const next = allWords.findIndex((_, index) => !previousOpened.includes(index));

      if (next < 0) {
        return previousOpened;
      }

      return [...previousOpened, next];
    });
  }

  function handleWrongAnswer() {
    const nextAttempts = attemptsLeft - 1;

    setAttemptsLeft(nextAttempts);
    setAnswer('');

    if (nextAttempts <= 0) {
      finishGame(false);
      return;
    }

    setMessage(`Nije tačno. Preostalo pokušaja: ${nextAttempts}.`);
  }

  function check() {
    if (!currentLevel || gameFinished) {
      return;
    }

    const normalizedUserAnswer = normalizeAnswer(answer);

    if (!normalizedUserAnswer) {
      setMessage('Unesite odgovor pre provere.');
      return;
    }

    if (selectedTarget === 'Konačno') {
      const normalizedFinalSolution = normalizeAnswer(currentLevel.finalSolution);

      if (normalizedUserAnswer === normalizedFinalSolution) {
        finishGame(true, true, solvedColumns.length);
        setAnswer('');
        return;
      }

      handleWrongAnswer();
      return;
    }

    const columnIndex = TARGETS.indexOf(selectedTarget);
    const selectedColumn = columns[columnIndex];

    if (!selectedColumn) {
      setMessage('Izabrana kolona ne postoji za ovaj nivo.');
      return;
    }

    if (solvedColumns.includes(columnIndex)) {
      setMessage('Ova kolona je već rešena.');
      setAnswer('');
      return;
    }

    const normalizedColumnSolution = normalizeAnswer(selectedColumn.solution);

    if (normalizedUserAnswer === normalizedColumnSolution) {
      const nextSolvedColumns = [...solvedColumns, columnIndex];

      setSolvedColumns(nextSolvedColumns);
      setMessage(`Tačno! Rešenje za ${selectedTarget} je: ${selectedColumn.solution}.`);
      setAnswer('');
      return;
    }

    handleWrongAnswer();
  }

  function quitGame() {
    if (!gameFinished) {
      finishGame(false);
    }

    nav('/levels');
  }

  if (!currentLevel) {
    return <main className="page">Učitavanje...</main>;
  }

  return (
    <main className="page game">
      <div className="game-head">
        <div>
          <h1>🎯 Nivo: {currentLevel.title}</h1>
          <p>Otvorite polja, rešite kolone i pogodite konačno rešenje.</p>
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
            <br />
            {attemptsLeft}
          </b>

          <Button variant="danger" onClick={quitGame}>
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
                  className={`cell ${opened.includes(index) ? 'opened' : ''}`}
                  onClick={() => openCell(index)}
                  disabled={gameFinished || opened.includes(index)}
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
        {columns.map((column, index) => (
          <span
            className={solvedColumns.includes(index) ? 'solved' : ''}
            key={column.name}
          >
            {solvedColumns.includes(index) ? column.solution : '???'}
          </span>
        ))}

        <span className={isFinalSolved ? 'solved final' : 'final'}>
          {isFinalSolved ? currentLevel.finalSolution : 'Konačno: ???'}
        </span>
      </div>

      <section className="answer">
        <h3>🎯 Izabrano za proveru: {selectedTarget}</h3>

        <div className="target-select">
          {TARGETS.map((target) => (
            <button
              type="button"
              className={`target-option ${
                selectedTarget === target ? 'active' : ''
              }`}
              onClick={() => setSelectedTarget(target)}
              disabled={gameFinished}
              key={target}
            >
              {target}
            </button>
          ))}
        </div>

        <input
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Upišite odgovor ovde..."
          disabled={gameFinished}
        />

        <Button onClick={check}>✓ Proveri</Button>

        <Button variant="ghost" onClick={openField}>
          🔓 Otvori polje (-50 pts)
        </Button>

        <Button variant="ghost" onClick={quitGame}>
          ← Nazad na nivoe
        </Button>

        {gameFinished && (
          <Button variant="ghost" onClick={() => nav('/profile')}>
            Pogledaj statistiku
          </Button>
        )}

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}