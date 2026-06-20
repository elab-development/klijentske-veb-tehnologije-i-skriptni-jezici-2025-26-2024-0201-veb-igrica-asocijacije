# Asocijacije — React TypeScript aplikacija

Veb aplikacija za igru **Asocijacije**, razvijena korišćenjem React-a, TypeScript-a i Vite-a. Aplikacija omogućava korisniku da pregleda nivoe, filtrira ih po težini, igra funkcionalnu igru asocijacija, pogađa rešenja kolona i konačno rešenje, prati rezultate, statistiku i rang listu.

Projekat je rađen kao seminarski rad iz predmeta **Klijentske veb tehnologije i skriptni jezici**.

## Tehnologije

* React
* TypeScript
* Vite
* React Router DOM
* CSS
* LocalStorage
* Git i GitHub
* Advice Slip API
* Datamuse API

## Pokretanje projekta

Za pokretanje projekta na lokalnoj mašini potrebno je instalirati Node.js.

```bash
npm install
npm run dev
```

Nakon pokretanja aplikacija je dostupna na adresi:

```txt
http://localhost:5173
```

Za proveru produkcionog build-a:

```bash
npm run build
```

## Stranice aplikacije

* `/` — početna stranica
* `/login` — prijava korisnika
* `/register` — registracija korisnika
* `/levels` — pregled nivoa sa pretragom i filterima
* `/game/:id` — stranica za igranje izabranog nivoa
* `/leaderboard` — rang lista sa paginacijom
* `/profile` — profil korisnika sa statistikom

## Glavne funkcionalnosti

* pregled dostupnih nivoa igre
* pretraga nivoa po nazivu
* filtriranje nivoa po težini i statusu
* pokretanje izabranog nivoa
* otvaranje polja u igri
* pogađanje rešenja pojedinačnih kolona
* pogađanje konačnog rešenja
* tajmer igre
* sistem poena
* ograničen broj pokušaja
* prikaz rešenja nakon završetka igre
* čuvanje rezultata u localStorage
* prikaz stvarne statistike korisnika
* prikaz završenih nivoa
* rang lista sa paginacijom
* dinamički API nivo generisan pomoću Datamuse API-ja
* savet na početnoj strani preuzet sa Advice Slip API-ja
* responzivan prikaz za mobilne uređaje

## Reusable komponente

U aplikaciji su kreirane komponente koje se koriste na više mesta:

* `Navbar`
* `Button`
* `Input`
* `LevelCard`
* `StatCard`

## React hooks

U projektu su korišćeni React hookovi:

* `useState` — za stanje forme, igre, filtera, tajmera i statistike
* `useEffect` — za učitavanje podataka i pokretanje tajmera
* `useMemo` — za optimizaciju filtriranja nivoa, rang liste i ScoreCalculator instance
* `useNavigate` — za programsku navigaciju između stranica
* `useParams` — za čitanje ID-ja nivoa iz URL-a
* `useLocation` — za osvežavanje podataka o završenim nivoima
* `useContext` — za globalno upravljanje korisnikom preko AuthContext-a

## Modeli, klase i interfejsi

Aplikacija koristi TypeScript modele i interfejse za jasniju strukturu podataka.

Primeri interfejsa:

* `ILevel`
* `IColumn`
* `IScoreCalculator`
* `IStatsManager`
* `IUserStats`
* `IGameResult`

Primeri klasa:

* `ScoreCalculator` — računa broj poena na osnovu osnovnih poena, otvorenih polja, preostalog vremena, rešenih kolona i konačnog rešenja
* `StatsManager` — obrađuje rezultat igre i ažurira statistiku korisnika

## API integracije

Aplikacija koristi dva eksterna API-ja.

### Advice Slip API

Na početnoj strani se prikazuje savet za fokus pre igre. Podaci se preuzimaju sa eksternog Advice Slip API-ja.

Koristi se za dodatni dinamički sadržaj na početnoj strani.

### Datamuse API

Datamuse API se koristi za generisanje posebnog nivoa igre pod nazivom **API English Challenge**.

Aplikacija koristi unapred definisane teme i rešenja kolona, a Datamuse API pomaže u generisanju povezanih engleskih reči za polja u igri. Na taj način API podaci učestvuju u glavnoj funkcionalnosti aplikacije.

## LocalStorage

LocalStorage se koristi za čuvanje smislenih podataka o korisniku i igri:

* ukupan broj odigranih igara
* broj pobeda
* broj poraza
* ukupni poeni
* najbolji rezultat
* trenutni niz pobeda
* najbolji niz pobeda
* prosečno vreme igre
* završeni nivoi
* poslednje aktivnosti
* korišćene API reči za smanjenje ponavljanja u generisanom nivou

Podaci ostaju sačuvani i nakon osvežavanja stranice.

## Struktura projekta

```txt
src
├── components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── LevelCard.tsx
│   ├── Navbar.tsx
│   └── StatCard.tsx
│
├── context
│   └── AuthContext.tsx
│
├── models
│   ├── Level.ts
│   ├── Player.ts
│   ├── ScoreCalculator.ts
│   └── StatsManager.ts
│
├── pages
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── LevelsPage.tsx
│   ├── GamePage.tsx
│   ├── LeaderboardPage.tsx
│   └── ProfilePage.tsx
│
├── services
│   ├── api.ts
│   └── statsStorage.ts
│
├── App.tsx
├── main.tsx
└── styles.css
```

## GitHub repozitorijum

Link ka GitHub repozitorijumu:

```txt
https://github.com/elab-development/klijentske-veb-tehnologije-i-skriptni-jezici-2025-26-2024-0201-veb-igrica-asocijacije
```

## Verzionisanje

Kod je verzionisan pomoću Git-a. Projekat sadrži više smislenih commitova koji prate razvoj aplikacije kroz faze:

* inicijalna React + TypeScript struktura
* rute i stranice
* reusable komponente
* modeli i servisi
* logika igre
* localStorage statistika
* rang lista
* API integracije
* responsive stilizovanje
* završna dokumentacija

