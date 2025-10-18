"use client";
import { Button } from "@/components/ui/button";
import GitHubIcon from "@/components/ui/GitHubIcon";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">CodePulse</h1>
      <Button
        onClick={() => {
          signIn("github");
          setLoading(true);
        }}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
          </>
        ) : (
          <>
            <GitHubIcon />
            Sign in with GitHub
          </>
        )}
      </Button>
    </div>
  );
}
