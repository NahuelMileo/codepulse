"use client";

import React from "react";
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
  const [loading, setLoading] = React.useState(true);
  const { reponame } = React.use(params);
  const [repo, setRepo] = React.useState<Repo | null>(null);

  React.useEffect(() => {
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
      <AnalyzeCard />
    </div>
  );
}
