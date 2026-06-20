import { ILevel } from '../models/Level';

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

export async function fetchLevels(): Promise<ILevel[]> {
  const res = await fetch('/data/levels.json');

  if (!res.ok) {
    throw new Error('Greška pri učitavanju nivoa');
  }

  return res.json();
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