import { createContext, ReactNode, useContext, useState } from 'react';
type AuthContextType = {
  username: string;
  isLoggedIn: boolean;
  login: (name: string) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || 'milja_asoc',
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('isLoggedIn')),
  );
  const login = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
    localStorage.setItem('username', name);
    localStorage.setItem('isLoggedIn', 'true');
  };
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };
  return (
    <AuthContext.Provider value={{ username, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth mora biti unutar AuthProvider');
  return ctx;
}
