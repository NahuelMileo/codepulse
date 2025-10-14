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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Activity, Folders, LayoutDashboard } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function AppSidebar() {
  const { data: session } = useSession();

  const links = [
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

  const pathName = usePathname();
  const actualPath = links.find((link) => pathName === "/" + link.link)?.label;

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
      <div className="flex h-16 w-full flex-row items-center justify-between border-b p-4">
        <h1 className="text-xl font-semibold">{actualPath}</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">{session?.user?.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={session?.user?.image || undefined}
                  className="h-8 w-8 rounded-full"
                />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => signOut()}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
