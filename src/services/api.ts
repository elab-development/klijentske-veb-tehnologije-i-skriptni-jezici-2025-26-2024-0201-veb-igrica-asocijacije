import type { ILevel } from '../models/Level';

export interface IAdviceSuggestion {
  id: number;
  advice: string;
}

interface AdviceSlipResponse {
  slip: {
    id: number;
    advice: string;
  };
}

interface DatamuseWord {
  word: string;
  score?: number;
}

const API_LEVEL_ID = 1000;

interface ApiLevelTemplate {
  finalSolution: string;
  columnSolutions: string[];
}

const API_LEVEL_TEMPLATES: ApiLevelTemplate[] = [
  {
    finalSolution: 'music',
    columnSolutions: ['guitar', 'piano', 'concert', 'song'],
  },
  {
    finalSolution: 'space',
    columnSolutions: ['planet', 'rocket', 'star', 'moon'],
  },
  {
    finalSolution: 'ocean',
    columnSolutions: ['ship', 'fish', 'wave', 'beach'],
  },
  {
    finalSolution: 'cinema',
    columnSolutions: ['actor', 'camera', 'movie', 'popcorn'],
  },
  {
    finalSolution: 'magic',
    columnSolutions: ['wizard', 'spell', 'dragon', 'potion'],
  },
  {
    finalSolution: 'sports',
    columnSolutions: ['football', 'tennis', 'basketball', 'race'],
  },
  {
    finalSolution: 'food',
    columnSolutions: ['pizza', 'burger', 'cake', 'coffee'],
  },
  {
    finalSolution: 'jungle',
    columnSolutions: ['monkey', 'tiger', 'tree', 'river'],
  },
];
const EASY_FIELD_FALLBACKS: Record<string, string[]> = {
  guitar: ['String', 'Rock', 'Acoustic', 'Bass'],
  piano: ['Keys', 'Classic', 'Song', 'Music'],
  concert: ['Stage', 'Crowd', 'Band', 'Ticket'],
  song: ['Voice', 'Lyrics', 'Radio', 'Melody'],

  planet: ['Earth', 'Mars', 'Orbit', 'Space'],
  rocket: ['Launch', 'Fuel', 'NASA', 'Moon'],
  star: ['Sky', 'Night', 'Sun', 'Light'],
  moon: ['Night', 'Crater', 'Orbit', 'Earth'],

  ship: ['Sail', 'Sea', 'Captain', 'Port'],
  fish: ['Water', 'Swim', 'Shark', 'Net'],
  wave: ['Sea', 'Surf', 'Water', 'Beach'],
  beach: ['Sand', 'Sun', 'Sea', 'Shell'],

  actor: ['Movie', 'Role', 'Scene', 'Stage'],
  camera: ['Photo', 'Film', 'Lens', 'Scene'],
  movie: ['Cinema', 'Screen', 'Actor', 'Story'],
  popcorn: ['Cinema', 'Snack', 'Salt', 'Movie'],

  wizard: ['Magic', 'Hat', 'Spell', 'Wand'],
  spell: ['Magic', 'Book', 'Wand', 'Curse'],
  dragon: ['Fire', 'Wing', 'Castle', 'Monster'],
  potion: ['Bottle', 'Magic', 'Witch', 'Spell'],

  football: ['Goal', 'Ball', 'Team', 'Stadium'],
  tennis: ['Racket', 'Court', 'Serve', 'Ball'],
  basketball: ['Hoop', 'Court', 'Ball', 'Team'],
  race: ['Speed', 'Track', 'Car', 'Finish'],

  pizza: ['Cheese', 'Tomato', 'Slice', 'Oven'],
  burger: ['Meat', 'Bun', 'Cheese', 'Fries'],
  cake: ['Sugar', 'Cream', 'Birthday', 'Slice'],
  coffee: ['Cup', 'Bean', 'Milk', 'Morning'],

  monkey: ['Banana', 'Tree', 'Jungle', 'Animal'],
  tiger: ['Stripe', 'Cat', 'Jungle', 'Claw'],
  tree: ['Leaf', 'Forest', 'Wood', 'Branch'],
  river: ['Water', 'Flow', 'Bridge', 'Boat'],
};

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffleArray<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function capitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function cleanDatamuseWords(words: DatamuseWord[], seed: string): string[] {
  const normalizedSeed = seed.toLowerCase();

  const blockedWords = [
    'thing',
    'things',
    'something',
    'someone',
    'anything',
    'everything',
    'people',
    'person',
    'place',
    'object',
  ];

  return Array.from(
    new Set(
      words
        .map((item) => item.word.toLowerCase().trim())
        .filter((word) => word.length >= 3)
        .filter((word) => word.length <= 10)
        .filter((word) => word !== normalizedSeed)
        .filter((word) => /^[a-z]+$/.test(word))
        .filter((word) => !blockedWords.includes(word)),
    ),
  );
}

async function fetchDatamuseWords(seed: string, max = 50): Promise<string[]> {
  const res = await fetch(
    `https://api.datamuse.com/words?rel_trg=${encodeURIComponent(seed)}&max=${max}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error(`Greška pri učitavanju Datamuse reči za: ${seed}`);
  }

  const data = (await res.json()) as DatamuseWord[];

  return cleanDatamuseWords(data, seed);
}
function pickEasyFieldWords(seed: string, candidates: string[]): string[] {
  const easyCandidates = candidates.slice(0, 16);
  const selectedWords = shuffleArray(easyCandidates).slice(0, 4);

  if (selectedWords.length >= 4) {
    return selectedWords.map(capitalizeWord);
  }

  return EASY_FIELD_FALLBACKS[seed].slice(0, 4);
}

function createFallbackApiLevel(): ILevel {
  return {
    id: API_LEVEL_ID,
    title: 'API English Challenge',
    icon: '🌐',
    difficulty: 'Srednje',
    category: 'API',
    points: 700,
    status: 'Dostupno',
    description: 'Dinamički nivo generisan pomoću Datamuse API-ja.',
    columns: [
      {
        name: 'Kolona A',
        words: ['Planet', 'Rocket', 'Star', 'Moon'],
        solution: 'Space',
      },
      {
        name: 'Kolona B',
        words: ['Wave', 'Ship', 'Island', 'Coral'],
        solution: 'Ocean',
      },
      {
        name: 'Kolona C',
        words: ['Spell', 'Wizard', 'Wand', 'Potion'],
        solution: 'Magic',
      },
      {
        name: 'Kolona D',
        words: ['Clue', 'Secret', 'Shadow', 'Detective'],
        solution: 'Mystery',
      },
    ],
    finalSolution: 'Adventure',
  };
}

async function generateDatamuseLevel(): Promise<ILevel> {
  try {
    const template = getRandomItem(API_LEVEL_TEMPLATES);

    const columns = await Promise.all(
      template.columnSolutions.map(async (columnSolution, index) => {
        const fieldCandidates = await fetchDatamuseWords(columnSolution, 40);
        const words = pickEasyFieldWords(columnSolution, fieldCandidates);

        return {
          name: `Kolona ${String.fromCharCode(65 + index)}`,
          words,
          solution: capitalizeWord(columnSolution),
        };
      }),
    );

    return {
      id: API_LEVEL_ID,
      title: 'API English Challenge',
      icon: '🌐',
      difficulty: 'Srednje',
      category: 'API',
      points: 700,
      status: 'Dostupno',
      description:
        'Nivo koji se dinamički generiše pomoću Datamuse API-ja. Tema i rešenja su prilagođeni lakšem rešavanju.',
      columns,
      finalSolution: capitalizeWord(template.finalSolution),
    };
  } catch (error) {
    console.error('Datamuse API level error:', error);

    return createFallbackApiLevel();
  }
}

export async function fetchLevels(): Promise<ILevel[]> {
  const res = await fetch('/data/levels.json');

  if (!res.ok) {
    throw new Error('Greška pri učitavanju nivoa');
  }

  const localLevels = (await res.json()) as ILevel[];
  const apiLevel = await generateDatamuseLevel();

  return [...localLevels, apiLevel];
}

export async function fetchAdviceSuggestion(): Promise<IAdviceSuggestion> {
  try {
    const res = await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Greška pri učitavanju saveta');
    }

    const data = (await res.json()) as AdviceSlipResponse;

    return {
      id: data.slip.id,
      advice: data.slip.advice,
    };
  } catch (error) {
    console.error('Advice Slip API error:', error);

    return {
      id: 0,
      advice: 'Odigraj jedan nivo asocijacija i pokušaj da oboriš najbolji rezultat.',
    };
  }
}