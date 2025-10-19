"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Folder,
  Loader2,
  FileCode,
  File,
  FileJson,
  FileText,
  Search,
  XCircle,
  ChevronRight,
  ChevronDown,
  Activity,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RepositoryFile from "@/types/RepositoryFile";
import AnalysisResult from "@/types/AnalysisResult";

function getFileIcon(fileName: string) {
  if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) {
    return <FileCode className="h-4 w-4 text-blue-500" />;
  }
  if (fileName.endsWith(".json")) {
    return <FileJson className="h-4 w-4 text-yellow-500" />;
  }
  if (fileName.endsWith(".md")) {
    return <FileText className="h-4 w-4 text-gray-500" />;
  }
  if (fileName.endsWith(".js")) {
    return <FileCode className="h-4 w-4 text-yellow-500" />;
  }
  return <File className="h-4 w-4 text-gray-400" />;
}

export default function Page() {
  const { data: session } = useSession();
  const [files, setFiles] = useState<RepositoryFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<RepositoryFile | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, RepositoryFile[] | null>
  >({});
  const params = useParams();
  const repoName = params.reponame as string;

  useEffect(() => {
    if (!session?.user?.name || !repoName || !session?.accessToken) return;
    getFiles(session.user.name, repoName, "", session.accessToken)
      .then((files) => {
        setFiles(files);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [repoName, session]);

  async function getFiles(
    owner: string,
    repo: string,
    path = "",
    token: string,
  ) {
    const url = path
      ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      : `https://api.github.com/repos/${owner}/${repo}/contents`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok)
      throw new Error("No se pudo obtener el contenido del repositorio");
    return res.json();
  }

  async function handleExpand(path: string) {
    if (expandedFolders[path] !== undefined) {
      setExpandedFolders((prev) => {
        const copy = { ...prev };
        delete copy[path];
        return copy;
      });
      return;
    }

    setExpandedFolders((prev) => ({ ...prev, [path]: null }));

    try {
      const res = await fetch(
        `https://api.github.com/repos/${session!.user!.name}/${repoName}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        },
      );
      const data: RepositoryFile[] = await res.json();
      setExpandedFolders((prev) => ({ ...prev, [path]: data }));
    } catch (err) {
      console.error("Error al cargar carpeta", err);
      setExpandedFolders((prev) => {
        const copy = { ...prev };
        delete copy[path];
        return copy;
      });
    }
  }

  function handleSelectFile(file: RepositoryFile) {
    if (selectedFile?.path === file.path) {
      setSelectedFile(null);
      return;
    }

    if (file.type === "dir") {
      handleExpand(file.path);
    } else {
      setSelectedFile(file);
    }
  }

  function renderFiles(fileList: RepositoryFile[], level = 0) {
    return fileList.map((file) => {
      const isDir = file.type === "dir";
      const isExpanded = expandedFolders[file.path] !== undefined;
      const isSelected = selectedFile?.path === file.path;

      return (
        <div key={file.path}>
          <div
            className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
              isSelected
                ? "bg-accent/20 ring-accent ring-2 ring-inset"
                : "hover:bg-accent/10"
            }`}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
            onClick={() => handleSelectFile(file)}
          >
            {isDir && (
              <span className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronDown className="text-muted-foreground h-4 w-4" />
                ) : (
                  <ChevronRight className="text-muted-foreground h-4 w-4" />
                )}
              </span>
            )}
            {isDir ? (
              <Folder className="text-accent h-4 w-4" />
            ) : (
              getFileIcon(file.name)
            )}
            <span className="text-foreground flex-1 truncate">{file.name}</span>
          </div>

          {isDir && expandedFolders[file.path] !== undefined && (
            <div>
              {expandedFolders[file.path] === null ? (
                <div
                  className="text-muted-foreground flex items-center gap-2 py-2 text-sm"
                  style={{ paddingLeft: `${(level + 1) * 16 + 12}px` }}
                >
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Loading...
                </div>
              ) : (
                renderFiles(expandedFolders[file.path]!, level + 1)
              )}
            </div>
          )}
        </div>
      );
    });
  }

  if (loading)
    return (
      <div className="flex items-center justify-center p-10 text-gray-500">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading files...
      </div>
    );

  if (error)
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 text-red-600">
          <XCircle className="h-5 w-5" />
          <p className="text-sm">Error: {error}</p>
        </div>
      </Card>
    );

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-foreground flex items-center gap-2 text-2xl font-semibold">
              <Folder className="h-6 w-6 text-teal-500" />
              {repoName}
            </h1>
            <p className="text-muted-foreground text-sm">
              {files.length} files in {repoName}
            </p>
          </div>
        </div>
        <div className="bg-border h-px w-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LISTA DE ARCHIVOS */}
        <Card className="border-border/40 bg-background/50 flex flex-col border p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground flex items-center gap-2 text-lg font-semibold">
              <FileCode className="h-5 w-5 text-teal-500" />
              File structure
            </h2>
          </div>

          <div className="max-h-[600px] space-y-1 overflow-y-auto pr-1">
            {renderFiles(files)}
          </div>
        </Card>

        {/* PANEL DE ANÁLISIS */}
        <Card className="relative flex flex-col items-center justify-center overflow-hidden border-teal-500/20 bg-teal-500/10 p-10 shadow-sm transition-all">
          {/* Círculo decorativo */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.08),transparent_70%)]" />

          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {selectedFile ? (
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/15 ring-4 ring-teal-500/10">
                  <FileCode className="h-7 w-7 text-teal-500" />
                </div>
                <h2 className="text-foreground mb-2 text-2xl font-semibold">
                  {selectedFile.name}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                  Selected file ready for analysis. Click below to proceed with
                  detailed analysis.
                </p>
                <Button
                  asChild
                  className={`gap-2 bg-teal-500 text-white transition-all hover:bg-teal-600 ${loading ? "disabled" : ""}`}
                  onClick={() => setLoadingAnalysis(true)}
                >
                  <Link
                    href={`/repositories/${repoName}/files/${encodeURIComponent(selectedFile.path)}`}
                    prefetch
                    className="flex items-center gap-2"
                  >
                    {loadingAnalysis ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                      </>
                    ) : (
                      <>
                        <Activity className="h-4 w-4" />
                        Analyze file
                      </>
                    )}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/15 ring-4 ring-teal-500/10">
                  <Search className="h-7 w-7 text-teal-500" />
                </div>
                <h2 className="text-foreground mb-2 text-2xl font-semibold">
                  Select a file
                </h2>
                <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                  Explore the repository structure and choose a file to start
                  the analysis.
                </p>
                <div className="min-h-[36px]" />
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
