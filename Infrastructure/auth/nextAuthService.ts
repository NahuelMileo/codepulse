import { signIn } from "next-auth/react";

export const nextAuthService = {
  async signInWithGithub() {
    await signIn("github");
  },
};
