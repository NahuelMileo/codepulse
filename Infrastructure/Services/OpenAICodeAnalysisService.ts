import { FileAnalysis } from "@/Domain/Entities/FileAnalysis";
import { ICodeAnalyzer } from "@/Domain/Interfaces/ICodeAnalyzer";
import { OpenAI } from "openai";

export class OpenAICodeAnalysisService implements ICodeAnalyzer {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async analyzeCode(code: string, fileName: string): Promise<FileAnalysis> {
    const prompt = `
    You are a code analysis tool. Analyze the following code and provide a score from 0 to 100, where 100 is perfect code. Also, list any issues found with line numbers, messages, severity (low, medium, high), and type of issue.
    The output should be in JSON format as follows:
  {
  "fileName": string,
  "score": number,
  "issues": [
    {
      "line": number,
      "message": string,
      "severity": "low" | "medium" | "high",
      "type": string
    }
  ]
}
  ${fileName} code:
  ${code}
    `;

    const response = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a proffessional code analyzer." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message?.content || "{}");

    return new FileAnalysis(result.fileName, result.score, result.issues);
  }
}
