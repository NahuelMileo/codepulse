import { githubRepositoryService } from "@/Infrastructure/repositories/githubRepositoryService";
import Repository from "@/types/Repository";

export async function getUserRepositories(
  token: string,
): Promise<Repository[]> {
  if (!token) throw new Error("Unauthorized: No access token provided.");
  return githubRepositoryService.getUserRepositories(token);
}
