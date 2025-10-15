import { FileAnalysis } from "../Entities/FileAnalysis";

export interface ICodeAnalyzer {
  analyzeCode(code: string, fileName: string): Promise<FileAnalysis>;
}
