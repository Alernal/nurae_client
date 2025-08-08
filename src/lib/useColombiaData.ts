// hooks/useColombiaData.ts
import { useEffect, useState } from "react";

export type ColombiaDepto = { departamento: string; ciudades: string[] };

export function useColombiaData() {
  const [data, setData] = useState<ColombiaDepto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const KEY = "colombia_json_cache_v1";
    const cached = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;

    const load = async () => {
      try {
        if (cached) {
          const { data, ts } = JSON.parse(cached);
          const diffHrs = (Date.now() - ts) / 36e5;
          if (Array.isArray(data) && diffHrs < 24) {
            setData(data);
            return;
          }
        }

        const res = await fetch("https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json");
        if (!res.ok) throw new Error("No se pudo cargar el JSON de Colombia");
        const json: ColombiaDepto[] = await res.json();

        const normalized = json
          .map(d => ({
            departamento: d.departamento.trim(),
            ciudades: Array.from(new Set(d.ciudades.map(c => c.trim()))).sort((a, b) => a.localeCompare(b)),
          }))
          .sort((a, b) => a.departamento.localeCompare(b.departamento));

        localStorage.setItem(KEY, JSON.stringify({ data: normalized, ts: Date.now() }));
        setData(normalized);
      } catch (e: any) {
        setError(e?.message || "Error al cargar datos de Colombia");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { data, loading, error };
}
