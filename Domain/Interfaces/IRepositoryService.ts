import Repository from "@/types/Repository";

export interface IRepositoryService {
  getUserRepositories(token: string): Promise<Repository[]>;
}
