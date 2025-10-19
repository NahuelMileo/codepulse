import Repository from "@/types/Repository";
import { Card } from "../ui/card";

export default function Page({ repo }: { repo: Repository }) {
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
