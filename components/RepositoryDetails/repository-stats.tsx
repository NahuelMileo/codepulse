import { Star, GitFork, Eye, AlertCircle, HardDrive } from "lucide-react";
import { Card } from "../ui/card";
import { Repo } from "@/app/(dashboard)/repositories/page";

export default function Page({ repo }: { repo: Repo }) {
  const stats = [
    {
      icon: Star,
      stat: repo.stargazers_count,
      name: "Stars",
    },
    {
      icon: GitFork,
      stat: repo.forks_count,
      name: "Forks",
    },
    {
      icon: Eye,
      stat: repo.watchers_count,
      name: "Watchers",
    },
    {
      icon: AlertCircle,
      stat: repo.open_issues_count,
      name: "Issues",
    },
    {
      icon: HardDrive,
      stat: Math.round(repo.size / 1024),
      name: "MB",
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card className="p-4" key={stat.name}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10">
                <Icon className="h-5 w-5 text-teal-500" />
              </div>
              <div>
                <p className="text-foreground text-2xl font-bold">
                  {stat.stat}
                </p>
                <p className="text-muted-foreground text-xs">{stat.name}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
