import { Repo } from "@/app/(dashboard)/repositories/page";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { FolderGit2 } from "lucide-react";

export default function Page({ repo }: { repo: Repo }) {
  console.log(repo);
  return (
    <Card className="">
      <CardHeader>
        <div className="flex gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
            <FolderGit2 className="text-teal-500" />
          </div>
          <div className="flex flex-col">
            <CardTitle>{repo.name}</CardTitle>
            <CardDescription>{repo.git_url}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {" "}
          <div className="h-2 w-2 rounded-full bg-teal-500"></div>{" "}
          <p>{repo.language}</p>
        </div>
      </CardContent>
      <hr />
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
