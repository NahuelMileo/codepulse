import Repository from "@/types/Repository";
import { Skeleton } from "../ui/skeleton";
import { Folders } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "../ui/empty";
import RepoCard from "../ui/repo-card";

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
}

export default function Page({ repositories, loading }: RepositoryListProps) {
  if (repositories.length === 0 && !loading) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folders />
          </EmptyMedia>
          <EmptyTitle>No repositories</EmptyTitle>
          <EmptyDescription>No repositories found</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  if (loading) {
    return (
      <>
        <p className="text-muted-foreground col-span-2 text-center">
          Loading repositories...
        </p>
        {[...Array(8)].map((_, i) => (
          <Skeleton className="h-[178px] w-full rounded-lg" key={i} />
        ))}
      </>
    );
  }

  return repositories.map((repo) => <RepoCard key={repo.id} repo={repo} />);
}
