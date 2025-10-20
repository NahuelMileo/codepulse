import { Activity, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import GitHubIcon from "../ui/GitHubIcon";
import { motion } from "framer-motion";
import background from "@/public/repositories.png";
import Image from "next/image";

interface SignInProps {
  loading: boolean;
  handleSignIn: () => void;
}

export default function Page({ loading, handleSignIn }: SignInProps) {
  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sección izquierda - Imagen / Branding */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative hidden w-1/2 items-center justify-center overflow-hidden text-white md:flex"
      >
        {/* Imagen de fondo */}
        <Image
          src={background.src}
          alt="Fondo CodePulse"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-neutral-950/80" />
        <div className="relative z-10 px-8 text-center">
          <h1 className="mb-4 flex items-center justify-center gap-4 text-5xl font-bold tracking-tight">
            CodePulse <Activity className="h-12 w-12 text-teal-500" />
          </h1>
          <p className="text-lg">
            Analyze, visualize, and optimize your GitHub repositories with AI.
          </p>
        </div>
      </motion.div>

      {/* Sección derecha - Formulario */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex w-full flex-col items-center justify-center px-8 sm:px-12 md:w-1/2 md:px-16 lg:px-24"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-semibold text-gray-900">
              Log In
            </h2>
            <p className="text-sm text-gray-600">
              Log in with your GitHub account to continue.
            </p>
          </div>

          <Button
            size="lg"
            className="flex w-full items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-teal-600" />
                Logging in...
              </>
            ) : (
              <>
                <GitHubIcon />
                Login with GitHub
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
