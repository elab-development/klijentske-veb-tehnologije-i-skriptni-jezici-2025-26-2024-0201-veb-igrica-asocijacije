import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ILevel } from '../models/Level';
export default function LevelCard({ level }: { level: ILevel }) {
  const navigate = useNavigate();
  const locked = level.status === 'Zaključano';
  const completed = level.status === 'Završeno';
  return (
    <article className={`level-card ${locked ? 'locked' : ''}`}>
      <div className="level-top">
        <span className="iconbox">{level.icon}</span>
        <div>
          <span className={`tag ${level.difficulty.toLowerCase()}`}>
            {level.difficulty}
          </span>
          <span className="tag status">
            {locked ? '🔒 Zaključano' : completed ? '✅ Završeno' : '🟢 Dostupno'}
          </span>
        </div>
      </div>
      <h3>{level.title}</h3>
      <p>{level.description}</p>
      <div className="line" />
      <div className="card-bottom">
        <strong>{level.points}</strong>
        <span>poena</span>
        <Button disabled={locked} onClick={() => navigate(`/game/${level.id}`)}>
          {locked ? '🔒 Zaključano' : completed ? 'Igraj ponovo →' : 'Igraj →'}
        </Button>
      </div>
    </article>
  );
}
