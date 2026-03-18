export interface Country {
  name: { common: string; official: string };
  flags: { png: string; svg: string };
  capital?: string[];
  population?: number;
  region: string;
  languages?: Record<string, string>;
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  cca2: string;
}
