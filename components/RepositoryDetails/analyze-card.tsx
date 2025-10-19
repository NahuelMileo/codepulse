import { Loader2, PlayCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";
import { useState } from "react";
import Repository from "@/types/Repository";

export default function Page({ repo }: { repo: Repository }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Card className="border-2 border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-teal-500/10 p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/20 ring-4 ring-teal-500/10">
            <PlayCircle className="h-10 w-10 text-teal-500" />
          </div>
          <h2 className="text-foreground mt-6 text-2xl font-bold">
            Analyze repository
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed text-balance">
            Run a comprehensive code quality analysis to obtain detailed
            metrics, detect architectural issues, and receive personalized
            improvement recommendations.
          </p>
          <div className="mt-8 flex gap-3">
            <Button
              asChild
              size="lg"
              className="gap-2"
              variant={"accent"}
              onClick={() => setLoading(true)}
            >
              <Link
                href={`/repositories/${repo.name}/files`}
                prefetch
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-5 w-5" />
                    {loading ? "Loading..." : "See files"}
                  </>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
