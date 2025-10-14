import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Activity, Folders, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Header from "./ui/header";
import { usePathname } from "next/navigation";

export const links = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    link: "dashboard",
  },
  {
    label: "Repositories",
    icon: <Folders className="h-5 w-5" />,
    link: "repositories",
  },
];

export function AppSidebar() {
  const pathName = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarHeader className="items-center">
          <span className="flex items-center gap-2 text-lg font-semibold">
            CodePulse <Activity className="text-teal-500" />
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Links</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem
                    key={link.label}
                    className={pathName === "/" + link.link ? "bg-muted" : ""}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={link.link}>
                        {link.icon}
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}
