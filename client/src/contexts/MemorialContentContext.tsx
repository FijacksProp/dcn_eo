import { fetchMemorialProfile } from "@/lib/memorial-api";
import type { MemorialProfile } from "@/types/memorial";
import React, { createContext, useContext, useEffect, useState } from "react";

interface MemorialContentContextValue {
  memorial: MemorialProfile | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const MemorialContentContext = createContext<MemorialContentContextValue | undefined>(undefined);

export function MemorialContentProvider({ children }: { children: React.ReactNode }) {
  const [memorial, setMemorial] = useState<MemorialProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMemorial = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      setError(null);
      const payload = await fetchMemorialProfile(signal);
      setMemorial(payload);
    } catch (loadError) {
      if (signal?.aborted) {
        return;
      }

      setError(loadError instanceof Error ? loadError.message : "Failed to load memorial content.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void loadMemorial(controller.signal);

    return () => controller.abort();
  }, []);

  return (
    <MemorialContentContext.Provider
      value={{
        memorial,
        isLoading,
        error,
        refresh: async () => loadMemorial(),
      }}
    >
      {children}
    </MemorialContentContext.Provider>
  );
}

export function useMemorialContent() {
  const context = useContext(MemorialContentContext);
  if (!context) {
    throw new Error("useMemorialContent must be used within MemorialContentProvider");
  }
  return context;
}
