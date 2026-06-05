import { NavLink } from 'react-router-dom';
export default function Navbar({ currentPath }: { currentPath: string }) {
  return (
    <header className="nav">
      <NavLink to="/" className="brand">
        <span className="dot" />
        Asocijacije
      </NavLink>
      <nav>
        <NavLink to="/">Početna</NavLink>
        <NavLink to="/levels">Nivoi</NavLink>
        <NavLink to="/leaderboard">Rang lista</NavLink>
        <NavLink to="/profile">Profil</NavLink>
        <NavLink className="login-pill" to="/login">
          Prijavi se
        </NavLink>
      </nav>
    </header>
  );
}
