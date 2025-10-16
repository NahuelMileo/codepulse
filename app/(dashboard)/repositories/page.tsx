"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
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
  homepage: string | null;
  html_url: string;
  size: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export default function Page() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.accessToken) {
      setError("No autorizado. Por favor, inicia sesión de nuevo.");
      return;
    }

    const fetchRepos = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${API_URL}/api/github/repos`);
        if (!res.ok) throw new Error("Error fetching repositories");
        const data: Repo[] = await res.json();
        setRepos(data);
      } catch (err) {
        console.error("Error fetching repos:", err);
        setError("No se pudieron cargar los repositorios");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [session]);

  const filteredRepos = useMemo(
    () =>
      repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [repos, searchQuery],
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2 p-6">
      <h1 className="text-3xl font-bold">Repositories</h1>
      <p className="text-muted-foreground">
        Select a repository to start analyzing its health
      </p>

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
        className={`mt-2 grid ${
          loading
            ? "grid-cols-2"
            : filteredRepos.length !== 0
              ? "grid-cols-2"
              : "grid-cols-1"
        } items-center gap-4`}
      >
        {loading ? (
          [...Array(8)].map((_, i) => (
            <Skeleton className="h-[178px] w-full rounded-lg" key={i} />
          ))
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
