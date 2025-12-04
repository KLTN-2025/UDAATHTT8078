import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

const ACCOUNT_API_BASE = (import.meta as any).env?.VITE_ACCOUNT_API_BASE ?? "http://localhost:3001";

export function useAccountProfile() {
  const { session } = useAuth();

  const userId = session?.userId;

  return useQuery({
    queryKey: ["account", "me"],
    enabled: Boolean(userId),
    queryFn: async () => {
      const res = await fetch(`${ACCOUNT_API_BASE}/account/me`, {
        headers: {
          "x-user-id": userId!,
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to load profile: ${res.status}`);
      }

      return res.json();
    },
  });
}