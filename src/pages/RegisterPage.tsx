import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';

export default function RegisterPage() {
  const [name, setName] = useState('Milja Stojanović');
  const [username, setUsername] = useState('milja_asoc');
  const [email, setEmail] = useState('milja.stojanovic@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const nav = useNavigate();

  const strength = Math.min(100, password.length * 9);

  return (
    <main className="auth-page register-page">
      <section className="auth-panel">
        <h1>Kreirajte nalog 🚀</h1>
        <p>Pridružite se zajednici i počnite da igrate.</p>

        <div className="two">
          <Input label="Ime i prezime" value={name} onChange={setName} />
          <Input label="Korisničko ime" value={username} onChange={setUsername} />
        </div>

        <Input label="Email adresa" value={email} onChange={setEmail} />
        <Input
          label="Lozinka"
          value={password}
          onChange={setPassword}
          type="password"
          placeholder="Minimalno 8 karaktera"
        />

        <div className="strength">
          <span style={{ width: `${strength}%` }} />
        </div>
        <small>Srednja jačina lozinke</small>

        <Input
          label="Potvrda lozinke"
          value={confirmPassword}
          onChange={setConfirmPassword}
          type="password"
          placeholder="Ponovite lozinku"
        />

        <label className="check">
          <input type="checkbox" defaultChecked /> Slažem se sa Uslovima korišćenja i
          Politikom privatnosti
        </label>

        <Button onClick={() => nav('/profile')}>Registruj se →</Button>

        <p>
          Imate nalog? <Link to="/login">Prijavite se</Link>
        </p>
      </section>

      <section className="auth-promo register-promo">
        <div className="puzzle-icon">🧩</div>
        <h2>Zašto igrati Asocijacije?</h2>

        <div className="benefit-card">
          <span>🧠</span>
          <div>
            <strong>Razvijte logičko mišljenje</strong>
            <p>
              Svaki nivo je jedinstvena zagonetka koja testira vaše asocijativno
              razmišljanje.
            </p>
          </div>
        </div>

        <div className="benefit-card">
          <span>🏆</span>
          <div>
            <strong>Takmičite se</strong>
            <p>Popnite se na rang listu i pokažite ko je pravi šampion asocijacija.</p>
          </div>
        </div>

        <div className="benefit-card">
          <span>📈</span>
          <div>
            <strong>Pratite napredak</strong>
            <p>Detaljne statistike i vizuelni prikaz vašeg napretka.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
