import { Repo } from "@/app/(dashboard)/repositories/page";
import { Card } from "../ui/card";
import {
  Calendar,
  Clock,
  FolderGit2,
  GitBranch,
  GitCommit,
  Globe,
  Lock,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `Hace ${Math.floor(diffInDays / 365)} años`;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Page({ repo }: { repo: Repo }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-foreground mb-4 flex items-center gap-2 text-sm font-semibold">
          <FolderGit2 className="h-4 w-4 text-teal-500" />
          Repository details
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Avatar className="h-3 w-3">
                <AvatarImage
                  src={repo.owner.avatar_url || "/placeholder.svg"}
                  alt={repo.owner.login}
                />
                <AvatarFallback className="text-[10px]">
                  {repo.owner.login.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>Owner</span>
            </div>
            <span className="text-foreground text-sm font-medium">
              {repo.owner.login}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-teal-500" />
              <span>Language</span>
            </div>
            <span className="text-foreground text-sm font-medium">
              {repo.language || "No especificado"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <GitBranch className="h-3.5 w-3.5" />
              <span>Default branch</span>
            </div>
            <Badge className="font-mono text-xs" variant={"secondary"}>
              {repo.default_branch}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              {repo.private ? (
                <Lock className="h-3.5 w-3.5" />
              ) : (
                <Globe className="h-3.5 w-3.5" />
              )}
              <span>Visibility</span>
            </div>
            <span className="text-foreground text-sm font-medium">
              {repo.private ? "Private" : "Public"}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-foreground mb-4 flex items-center gap-2 text-sm font-semibold">
          <Clock className="h-4 w-4 text-teal-500" />
          Recent activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Calendar className="h-3.5 w-3.5" />
              <span>Created</span>
            </div>
            <span className="text-foreground text-sm font-medium">
              {formatDate(repo.created_at)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated</span>
            </div>
            <div className="text-right">
              <p className="text-foreground text-sm font-medium">
                {getTimeAgo(repo.updated_at)}
              </p>
              <p className="text-muted-foreground text-xs">
                {formatDate(repo.updated_at)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <GitCommit className="h-3.5 w-3.5" />
              <span>Last push</span>
            </div>
            <div className="text-right">
              <p className="text-foreground text-sm font-medium">
                {getTimeAgo(repo.pushed_at)}
              </p>
              <p className="text-muted-foreground text-xs">
                {formatDate(repo.pushed_at)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
