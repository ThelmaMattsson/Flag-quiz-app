import { useEffect, useState } from "react";
import { fetchCountries } from "../api/countries";
import { Country } from "../types/Country";

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Couldn't load countries");
        setLoading(false);
      });
  }, []);

  const search = (text: string) => {
    setQuery(text);

    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(text.toLowerCase()),
    );

    setResults(filtered);
  };

  const shown = query ? results : countries;

  return {
    countries,
    query,
    search,
    shown,
    error,
    loading,
  };
}
