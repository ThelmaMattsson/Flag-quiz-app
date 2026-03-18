import { Country } from "../types/Country";

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(
    "https://restcountries.com/v3.1/independent?status=true&fields=name,flags,capital,languages,region,currencies,cca2",
  );
  const data: Country[] = await res.json();
  return data.filter((country) => country.cca2 !== "AF");
}

export async function fetchCountryByCode(
  code: string,
): Promise<Country | null> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`,
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data[0] ?? null;
  } catch {
    return null;
  }
}
