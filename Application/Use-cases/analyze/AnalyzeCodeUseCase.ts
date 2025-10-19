import { ICodeAnalyzer } from "@/Domain/Interfaces/ICodeAnalyzer";

export class AnalyzeCodeUseCase {
  constructor(private codeAnalyzer: ICodeAnalyzer) {}

  async execute(fileName: string, content: string) {
    return this.codeAnalyzer.analyzeCode(fileName, content);
  }
}
