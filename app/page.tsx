"use client";

import { useState } from "react";
import { signInWithGithub } from "@/Application/use-cases/auth/SignInWithGithub";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import SignInCard from "@/components/Login/sign-in-card";

export default function Page() {
  const [loading, setLoading] = useState(false);
  useAuthRedirect();

  const handleSignIn = async () => {
    setLoading(true);
    await signInWithGithub();
  };

  return <SignInCard loading={loading} handleSignIn={handleSignIn} />;
}
