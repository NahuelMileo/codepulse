import Issue from "./Issue";

export default interface AnalysisResult {
  fileName: string;
  score: number;
  issues: Issue[];
}
