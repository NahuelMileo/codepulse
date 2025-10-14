"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import RepoCard from "@/components/ui/repo-card";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  private: boolean;
  description: string | null;
}

export default function Page() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);

  useEffect(() => {
    if (!session?.accessToken) return;
    setLoading(true);
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

  useEffect(() => {
    setFilteredRepos(
      repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [repos, searchQuery]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-2 p-6">
      <h1 className="text-3xl font-bold">Repositories</h1>
      <p className="text-muted-foreground">
        Select a repository to start analyzing its health
      </p>

      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="mt-2 grid grid-cols-2 items-center gap-2">
        {filteredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
