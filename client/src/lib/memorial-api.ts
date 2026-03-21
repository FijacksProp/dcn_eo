import type { MemorialProfile } from "@/types/memorial";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export async function fetchMemorialProfile(signal?: AbortSignal): Promise<MemorialProfile> {
  const response = await fetch(`${API_BASE_URL}/memorial/`, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load memorial content (${response.status})`);
  }

  return response.json() as Promise<MemorialProfile>;
}
