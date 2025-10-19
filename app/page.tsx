"use client";
import { signInWithGithub } from "@/Application/Use-cases/auth/SignInWithGithub";
import SignInCard from "@/components/Login/sign-in-card";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  useAuthRedirect();

  const handleSignIn = async () => {
    setLoading(true);
    await signInWithGithub();
  };

  return <SignInCard loading={loading} handleSignIn={handleSignIn} />;
}
