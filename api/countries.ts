import { Country } from "../types/Country";

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed fetch");

  return response.json();
}

export async function fetchCountries(): Promise<Country[]> {
  const data = await fetchData<Country[]>(
    "https://restcountries.com/v3.1/independent?status=true&fields=name,flags,capital,languages,region,currencies,cca2",
  );
  return data.filter((country) => country.cca2 !== "AF");
}

export async function fetchCountryByCode(
  code: string,
): Promise<Country | null> {
  try {
    const data = await fetchData<Country[]>(
      `https://restcountries.com/v3.1/alpha/${code}`,
    );

    return data[0] ?? null;
  } catch {
    return null;
  }
}
