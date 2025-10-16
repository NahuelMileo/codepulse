"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Folder, Loader2, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RepoFile {
  name: string;
  path: string;
  type: "file" | "dir";
  html_url: string;
}

export default function Page() {
  const { data: session } = useSession();
  const params = useParams();
  const repoName = params.reponame as string;

  const [files, setFiles] = useState<RepoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<RepoFile | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, RepoFile[] | null>
  >({});

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

  if (loading)
    return (
      <div className="flex items-center justify-center p-10 text-gray-500">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Cargando archivos...
      </div>
    );

  if (error)
    return <div className="p-4 text-sm text-red-500">Error: {error}</div>;

  async function handleExpand(path: string) {
    // Si ya está expandida, la cerramos
    if (expandedFolders[path] !== undefined) {
      setExpandedFolders((prev) => {
        const copy = { ...prev };
        delete copy[path];
        return copy;
      });
      return;
    }

    // Inicializamos como null para mostrar loading
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
      const data: RepoFile[] = await res.json();
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

  function handleSelectFile(file: RepoFile) {
    if (file.type === "dir") {
      // Si es un directorio, expandirlo
      handleExpand(file.path);
    } else {
      // Si es un archivo, seleccionarlo
      setSelectedFile(file);
    }
  }

  async function analyze(file: RepoFile) {
    if (!selectedFile) return;

    try {
      const res = await fetch(
        `https://api.github.com/repos/${session!.user!.name}/${repoName}/contents/${file.path}`,
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
            Accept: "application/vnd.github.v3.raw", // esto devuelve texto plano en lugar de base64
          },
        },
      );

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
      const result = await analysisRes.json();
      console.log("✅ Resultado del análisis:", result);
    } catch (err) {
      console.error("❌ Error al analizar archivo:", err);
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-2 text-2xl font-semibold">Archivos de {repoName}</h1>
      <p className="text-muted-foreground mb-4">
        Selected file : {selectedFile?.name}
      </p>
      <div className="rounded border">{renderFiles(files)}</div>
      <Button
        className="mt-4"
        variant={"accent"}
        onClick={() => selectedFile && analyze(selectedFile)}
        disabled={!selectedFile}
      >
        Analyze
      </Button>
    </div>
  );

  function renderFiles(files: RepoFile[], level = 0) {
    return files.map((file) => {
      const isDir = file.type === "dir";
      const Icon = isDir ? Folder : FileCode;

      return (
        <div key={file.path} className={`pl-${level * 4}`}>
          <div
            className="flex cursor-pointer items-center gap-2 p-2 hover:bg-teal-50"
            onClick={() => handleSelectFile(file)}
          >
            <Icon
              className={`h-4 w-4 ${isDir ? "text-amber-500" : "text-teal-500"}`}
            />
            {file.name}
          </div>

          {isDir && expandedFolders[file.path] !== undefined && (
            <div className="ml-4 border-l">
              {expandedFolders[file.path] === null ? (
                <div className="pl-2 text-sm text-gray-500">Cargando...</div>
              ) : (
                renderFiles(expandedFolders[file.path]!, level + 1)
              )}
            </div>
          )}
        </div>
      );
    });
  }
}
