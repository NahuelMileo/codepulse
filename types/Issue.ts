export default interface Issue {
  line: number;
  message: string;
  severity: "low" | "medium" | "high";
  type: string;
  snippet: string;
  solution: string;
}
