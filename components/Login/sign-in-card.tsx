import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import GitHubIcon from "../ui/GitHubIcon";

interface SignInProps {
  loading: boolean;
  handleSignIn: () => void;
}

export default function Page({ loading, handleSignIn }: SignInProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">CodePulse</h1>
      <Button onClick={handleSignIn}>
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
