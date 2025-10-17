"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Folders, Search } from "lucide-react";
import RepoCard from "@/components/ui/repo-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { toast } from "sonner";

export interface Repo {
  id: number;
  description: string | null;
  language: string | null;
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  homepage: string;
  html_url: string;
  size: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export default function Page() {
  const { data: session } = useSession();
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.accessToken) {
      setError("Unauthorized, please login.");
      toast("Unauthorized, please login.");
      return;
    }

    const fetchRepos = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL!;
        if (!API_URL) {
          throw new Error("Missing NEXT_PUBLIC_API_URL environment variable.");
        }

        const res = await fetch(`${API_URL}/api/github/repos`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `Error fetching repositories: ${res.status} ${res.statusText} - ${text}`,
          );
        }

        const data: Repo[] = await res.json();
        setRepositories(data);
      } catch (err) {
        console.error("Error fetching repositories:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        toast("Failed to load repositories.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [session?.accessToken]);

  const filteredRepos = repositories.filter((repository) =>
    repository.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2 p-6">
      <h1 className="text-3xl font-bold">Repositories</h1>
      <p className="text-muted-foreground">
        Select a repository to start analyzing its health
      </p>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div
        className={`mt-4 grid ${
          loading || filteredRepos.length ? "grid-cols-2" : "grid-cols-1"
        } items-center gap-4`}
      >
        {loading ? (
          <>
            <p className="text-muted-foreground col-span-2 text-center">
              Loading repositories...
            </p>
            {[...Array(8)].map((_, i) => (
              <Skeleton className="h-[178px] w-full rounded-lg" key={i} />
            ))}
          </>
        ) : filteredRepos.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Folders />
              </EmptyMedia>
              <EmptyTitle>No repositories</EmptyTitle>
              <EmptyDescription>No repositories found</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          filteredRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        )}
      </div>
    </div>
  );
}
