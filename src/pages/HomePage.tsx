import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import { fetchAdviceSuggestion, type IAdviceSuggestion } from '../services/api';

export default function HomePage() {
  const nav = useNavigate();

const [adviceSuggestion, setAdviceSuggestion] = useState<IAdviceSuggestion | null>(
  null,
);

const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

async function loadAdviceSuggestion() {
  setIsLoadingAdvice(true);

  const suggestion = await fetchAdviceSuggestion();

  setAdviceSuggestion(suggestion);
  setIsLoadingAdvice(false);
}

useEffect(() => {
  loadAdviceSuggestion();
}, []);

  const features = [
    {
      icon: '🔍',
      title: 'Otkrivajte polja',
      text: 'Kliknite na polje da otkrijete reč. Koristite poene za otvaranje novih polja.',
    },
    {
      icon: '🧩',
      title: 'Pogađajte kolone',
      text: 'Svaka kolona ima 4 reči koje nešto povezuje. Pronađite tu vezu i unesite rešenje.',
    },
    {
      icon: '⚡',
      title: 'Vremenski limit',
      text: 'Brži odgovori donose više poena. Pratite vreme i osvajajte bonus poene.',
    },
    {
      icon: '🏆',
      title: 'Rang lista',
      text: 'Poredite se sa najboljim igračima. Svaka pobeda donosi poene i rangiranje.',
    },
    {
      icon: '📊',
      title: 'Statistike',
      text: 'Pratite svoj napredak, broj pobeda i postignute rezultate na profilu.',
    },
    {
      icon: '🎯',
      title: 'Različite težine',
      text: 'Izaberite između lakih, srednje teških i teških nivoa prilagođenih svim igračima.',
    },
  ];

  return (
    <main className="page home">
      <section className="hero home-hero">
        <span className="badge">✦ Sezona 5 • Novo</span>

        <h1>
          Igra <br />
          <span className="gradient-text">Asocijacije</span>
          <br />
          počinje ovde
        </h1>

        <p>
          Otvorite polja, pronađite skrivene veze između reči i pogodite konačno
          rešenje. Takmičite se sa igračima iz celog sveta.
        </p>

        <div className="actions">
          <Button onClick={() => nav('/levels')}>🎮 Započni igru</Button>

          <Button variant="ghost" onClick={() => nav('/levels')}>
            📋 Pogledaj nivoe
          </Button>
        </div>
      </section>

      <section className="stats home-stats">
        <StatCard label="Aktivnih igrača" value="12,847" caption="" />
        <StatCard label="Nivoa igre" value="50+" caption="" />
        <StatCard label="Zadovoljnih igrača" value="98%" caption="" />
        <StatCard label="Prosečno vreme" value="3 min" caption="" />
      </section>

      <section className="api-card">
  <span className="badge">Eksterni API</span>

  <h2>💡 Savet za fokus pre igre</h2>

  {adviceSuggestion ? (
    <>
      <p>{adviceSuggestion.advice}</p>

      <small>Izvor: Advice Slip API · ID saveta: {adviceSuggestion.id}</small>

      <div className="actions">
        <Button
          variant="ghost"
          onClick={loadAdviceSuggestion}
          disabled={isLoadingAdvice}
        >
          {isLoadingAdvice ? 'Učitavanje...' : 'Učitaj novi savet'}
        </Button>
      </div>
    </>
  ) : (
    <p>Učitavanje saveta...</p>
  )}
</section>

      <section className="how-section">
        <h2>Kako funkcioniše?</h2>
        <p>Igra asocijacija je jednostavna ali izazovna</p>

        <div className="features home-features">
          {features.map((feature) => (
            <div className="feature" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta home-cta">
        <h2>Spreman si za izazov?</h2>

        <p>
          Registrujte se i dobićete pristup svim nivoima, rang listi i
          naprednom praćenju statistika.
        </p>

        <div className="actions">
          <Button onClick={() => nav('/register')}>Registruj se besplatno</Button>

          <Button variant="ghost" onClick={() => nav('/levels')}>
            Isprobaj bez naloga
          </Button>
        </div>
      </section>
    </main>
  );
}