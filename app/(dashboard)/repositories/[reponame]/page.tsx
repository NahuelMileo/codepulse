"use client";

import { use, useEffect, useState } from "react";
import { Repo } from "../page";
import AnalyzeCard from "@/components/RepositoryDetails/analyze-card";
import RepositoryHeader from "@/components/RepositoryDetails/repository-header";
import RepositoryDescription from "@/components/RepositoryDetails/repository-description";
import RepositoryStats from "@/components/RepositoryDetails/repository-stats";
import RepositoryActivity from "@/components/RepositoryDetails/repository-activity";
import RepositorySkeleton from "@/components/RepositoryDetails/repository-skeleton";

interface RepoDetailsPageProps {
  params: Promise<{ reponame: string }>;
}

export default function RepoDetailsPage({ params }: RepoDetailsPageProps) {
  const [loading, setLoading] = useState(true);
  const { reponame } = use(params);
  const [repo, setRepo] = useState<Repo | null>(null);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data: Repo[]) => {
        const found = data.find((r) => r.name === reponame);
        setRepo(found || null);
        setLoading(false);
      })
      .catch(console.error);
  }, [reponame]);

  if (loading || !repo) return <RepositorySkeleton />;

  return (
    <div className="mx-auto mt-8 max-w-7xl space-y-4">
      <RepositoryHeader repo={repo} />
      <RepositoryDescription repo={repo} />
      <RepositoryStats repo={repo} />
      <RepositoryActivity repo={repo} />
      <AnalyzeCard repo={repo} />
    </div>
  );
}
