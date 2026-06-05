import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../context/AuthContext';
export default function LoginPage() {
  const [email, setEmail] = useState('korisnik@mail.com');
  const [pass, setPass] = useState('12345678');
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();
  function submit() {
    if (!email || pass.length < 6) {
      setErr('Unesite email i lozinku od najmanje 6 karaktera.');
      return;
    }
    login(email.split('@')[0]);
    nav('/profile');
  }
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="form-logo">
          <span className="dot"></span>
          Asocijacije
        </div>
        <h1>Dobrodošli nazad! 👋</h1>
        <p>Prijavite se i nastavite sa igrom.</p>
        <Input label="Email ili korisničko ime" value={email} onChange={setEmail} />
        <Input label="Lozinka" value={pass} onChange={setPass} type="password" />
        {err && <p className="error">{err}</p>}
        <Button onClick={submit}>Prijavi se →</Button>
        <Button variant="ghost" onClick={() => nav('/')}>
          Nastavi kao gost
        </Button>
        <p>
          Nemate nalog? <Link to="/register">Registrujte se</Link>
        </p>
      </section>
      <section className="auth-promo">
        <span className="badge">✦ Nova sezona 2025</span>
        <h2>
          Igra <span className="gradient-text">Asocijacije</span> čeka vas!
        </h2>
        <p>Otkrijte skrivene veze između reči i popnite se na vrh rang liste.</p>
        <div className="chips">
          <span>✦ 50+ nivoa</span>
          <span>★ Rang lista</span>
          <span>⏱ Limit</span>
        </div>
      </section>
    </main>
  );
}
