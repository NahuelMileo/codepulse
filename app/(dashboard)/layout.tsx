"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/ui/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </SidebarProvider>
  );
}
