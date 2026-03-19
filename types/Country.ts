export interface Currency {
  name: string;
  symbol: string;
}

export interface Country {
  name: { common: string; official: string };
  flags: { png: string; svg: string };
  capital?: string[];
  population?: number;
  region: string;
  languages?: Record<string, string>;
  currencies?: Record<string, Currency>;
  cca2: string;
}
