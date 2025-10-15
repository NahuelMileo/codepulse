import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Globe, ArrowLeft, ExternalLink, Lock } from "lucide-react";
import router from "next/router";
import { Button } from "../ui/button";
import { Repo } from "@/app/(dashboard)/repositories/page";
import { Badge } from "../ui/badge";

export default function Page({ repo }: { repo: Repo }) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 rounded-full border-2 border-teal-500/20">
          <AvatarImage
            className="rounded-full"
            src={repo.owner.avatar_url || "/placeholder.svg"}
            alt={repo.owner.login}
          />
          <AvatarFallback className="bg-teal-500/10 text-teal-500">
            {repo.owner.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-foreground font-mono text-2xl font-bold">
              {repo.name}
            </h1>
            {repo.private ? (
              <Badge variant="secondary" className="gap-1">
                <Lock className="h-3 w-3" />
                Private
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <Globe className="h-3 w-3" />
                Public
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1 text-sm">{repo.full_name}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/repositories")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
