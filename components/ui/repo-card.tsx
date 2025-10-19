import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { FolderGit2, Lock, Globe, Eye, Loader2 } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { useState } from "react";
import Repository from "@/types/Repository";

export default function RepoCard({ repo }: { repo: Repository }) {
  const isPrivate = repo.private;
  const language = repo.language || "Unknown";
  const [loading, setLoading] = useState(false);
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
            <FolderGit2 className="text-teal-500" />
          </div>
          <div className="flex flex-col">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              {repo.name}
              {isPrivate ? (
                <Lock className="h-4 w-4 text-gray-400" />
              ) : (
                <Globe className="h-4 w-4 text-teal-500" />
              )}
            </CardTitle>
            <CardDescription className="text-muted-foreground truncate text-sm">
              {repo.description || "No description provided."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-teal-500" />
          <p className="capitalize">{language}</p>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant={"accent"} asChild onClick={() => setLoading(true)}>
          <Link
            href={`/repositories/${repo.name}`}
            prefetch
            onClick={() => setLoading(true)}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Eye></Eye>
                See details
              </>
            )}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
