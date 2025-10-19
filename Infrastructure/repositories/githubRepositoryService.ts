import { IRepositoryService } from "@/Domain/Interfaces/IRepositoryService";
import Repository from "@/types/Repository";

export const githubRepositoryService: IRepositoryService = {
  async getUserRepositories(token: string): Promise<Repository[]> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;
    if (!API_URL) {
      throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
    }
    const res = await fetch(`${API_URL}/api/github/repos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Error fetching repositories: ${res.status} ${res.statusText} - ${text}`,
      );
    }
    return res.json();
  },
};
