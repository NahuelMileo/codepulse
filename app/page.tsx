"use client";
import { Button } from "@/components/ui/button";
import GitHubIcon from "@/components/ui/GitHubIcon";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">CodePulse</h1>
      <Button onClick={() => signIn("github")}>
        <GitHubIcon />
        Iniciar sesion con GitHub
      </Button>
    </div>
  );
}
