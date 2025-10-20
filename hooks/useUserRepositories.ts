import { getUserRepositories } from "@/Application/use-cases/repositories/getUserRepositories";
import Repository from "@/types/Repository";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useUserRepositories(token?: string) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    if (!token) {
      setError("Unauthorized, please login.");
      toast("Unauthorized, please login.");
      return;
    }

    const fetchRepos = async () => {
      try {
        setLoading(true);
        const repos = await getUserRepositories(token);
        setRepositories(repos);
      } catch (err) {
        console.error("Error fetching repositories:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast("Failed to load repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [token]);

  return { repositories, loading, error };
}
