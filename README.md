# Asocijacije — React demo projekat

Demo verzija veb aplikacije za igru asocijacija, napravljena u React + TypeScript + Vite.

## Pokretanje
```bash
npm install
npm run dev
```

## Stranice
- `/` — početna
- `/login` — prijava
- `/register` — registracija
- `/levels` — nivoi sa pretragom i filterima
- `/game/:id` — demo igra
- `/leaderboard` — rang lista sa paginacijom
- `/profile` — profil korisnika

## Funkcionalnosti
- React Router rute
- reusable komponente
- useState, useEffect, useContext, useNavigate, useLocation, useParams
- fetch iz `/public/data/levels.json`
- filteri, pretraga, paginacija
- demo tajmer, otvaranje polja i provera odgovora
- interface modeli i ScoreCalculator klasa
- localStorage za login i rezultat
