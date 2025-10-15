export class FileAnalysis {
  fileName: string;
  score: number;
  issues: {
    line: number;
    message: string;
    severity: "low" | "medium" | "high";
    type: string;
  }[];

  constructor(
    fileName: string,
    score: number,
    issues: {
      line: number;
      message: string;
      severity: "low" | "medium" | "high";
      type: string;
    }[],
  ) {
    this.fileName = fileName;
    this.score = score;
    this.issues = issues;
  }
}
