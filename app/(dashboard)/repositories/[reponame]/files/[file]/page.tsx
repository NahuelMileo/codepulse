"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Loader2,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Issue {
  line: number;
  message: string;
  severity: "low" | "medium" | "high";
  type: string;
  snippet: string;
  solution: string;
}

interface AnalysisResult {
  fileName: string;
  score: number;
  issues: Issue[];
}

export default function Page() {
  const { data: session } = useSession();
  const params = useParams();
  console.log(params);
  const repoName = params.reponame as string;
  const filePath = decodeURIComponent(params.file as string);
  const fileName = filePath.split("/").pop() as string;
  //   console.log(filePath);

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [analyzing, setAnalyzing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.accessToken || !session.user?.name) return;
    analyzeFile(repoName, filePath);
  }, [repoName, filePath]);

  async function analyzeFile(repo: string, file: string) {
    setAnalyzing(true);
    setAnalysisResult(null);
    setError(null);

    try {
      const res = await fetch(
        `https://api.github.com/repos/${session!.user!.name}/${repoName}/contents/${file}`,
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
            Accept: "application/vnd.github.v3.raw",
          },
        },
      );
      console.log(res);
      if (!res.ok) throw new Error("No se pudo obtener el archivo");

      const codeWithoutLineNumbers = await res.text();
      const code = codeWithoutLineNumbers
        .split("\n")
        .map((line, index) => `${index + 1}|${line}`)
        .join("\n");

      const analysisRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!analysisRes.ok) throw new Error("Error al analizar el archivo");

      const result = await analysisRes.json();
      setAnalysisResult({
        fileName: file,
        score: result.score || 85,
        issues: result.issues || [],
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error al analizar archivo:", err);
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  }

  if (analyzing)
    return (
      <div className="text-muted-foreground flex h-[70vh] flex-col items-center justify-center">
        <Loader2 className="mb-2 h-8 w-8 animate-spin text-teal-500" />
        <p>Analyzing {fileName}...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-red-500">
        <XCircle className="mb-2 h-8 w-8" />
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-8">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold">
            <span className="text-teal-600">{fileName}</span> analysis
          </h1>
          <p className="text-muted-foreground text-sm">
            Repository: {repoName}
          </p>
        </div>
        <Button variant={"accent"} asChild>
          <Link
            href={`/repositories/${repoName}/files`}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Return
          </Link>
        </Button>
      </div>

      {analysisResult && (
        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">General score</h2>
            <div
              className={`rounded-md px-3 py-1 text-sm font-semibold ${
                analysisResult.score >= 80
                  ? "bg-green-100 text-green-700"
                  : analysisResult.score >= 60
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {analysisResult.score}/100
            </div>
          </div>

          <div className="space-y-3">
            {analysisResult.issues.length === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <p>No issues detected 🎉</p>
              </div>
            ) : (
              analysisResult.issues.map((issue, i) => (
                <div
                  key={i}
                  className="border-border bg-background/60 flex items-start gap-3 rounded-md border p-3"
                >
                  {issue.severity === "high" ? (
                    <XCircle className="mt-0.5 h-4 w-4 text-red-500" />
                  ) : issue.severity === "medium" ? (
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-500" />
                  ) : (
                    <Activity className="mt-0.5 h-4 w-4 text-blue-500" />
                  )}
                  <div>
                    <p className="text-foreground font-medium">
                      {issue.message}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Line {issue.line} — {issue.type}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      <span className="text-foreground font-semibold">
                        Solution:
                      </span>{" "}
                      {issue.solution}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-4">
            <Button
              onClick={() => analyzeFile(repoName, fileName)}
              className="gap-2 bg-teal-500 text-white hover:bg-teal-600"
            >
              <Activity className="h-4 w-4" />
              Reanalyze
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
