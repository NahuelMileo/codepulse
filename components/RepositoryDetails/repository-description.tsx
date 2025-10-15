import { Repo } from "@/app/(dashboard)/repositories/page";
import { Card } from "../ui/card";

export default function Page({ repo }: { repo: Repo }) {
  return (
    <>
      {repo.description ? (
        <Card className="p-6">
          <p className="text-foreground text-base leading-relaxed">
            {repo.description}
          </p>
        </Card>
      ) : (
        <Card className="p-6">
          <p className="text-muted-foreground text-base leading-relaxed">
            This repository has no description.
          </p>
        </Card>
      )}
    </>
  );
}
