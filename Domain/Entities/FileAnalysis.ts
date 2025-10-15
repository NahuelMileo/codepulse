export class FileAnalysis {
  fileName: string;
  score: number;
  issues: {
    line: number;
    message: string;
    severity: "low" | "medium" | "high";
    type: string;
    snippet: string;
    solution: string;
  }[];

  constructor(
    fileName: string,
    score: number,
    issues: {
      line: number;
      message: string;
      severity: "low" | "medium" | "high";
      type: string;
      snippet: string;
      solution: string;
    }[],
  ) {
    this.fileName = fileName;
    this.score = score;
    this.issues = issues;
  }
}
