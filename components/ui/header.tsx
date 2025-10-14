import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { links } from "../app-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export default function Page() {
  const { data: session } = useSession();
  const pathName = usePathname();
  const actualPath = links.find((link) => pathName === "/" + link.link)?.label;
  return (
    <>
      <div className="flex h-16 w-full flex-row items-center justify-between border-b p-4">
        <span className="text-lg">{actualPath}</span>
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
