"use client";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Search } from "lucide-react";
import { useUserRepositories } from "@/hooks/useUserRepositories";
import RepositoryList from "@/components/Repositories/repository-list";

export default function Page() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const { repositories, loading, error } = useUserRepositories(
    session?.accessToken,
  );

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
        <RepositoryList loading={loading} repositories={filteredRepos} />
      </div>
    </div>
  );
}
