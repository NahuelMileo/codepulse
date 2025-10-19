import { nextAuthService } from "@/Infrastructure/auth/nextAuthService";

export async function signInWithGithub() {
  return await nextAuthService.signInWithGithub();
}
