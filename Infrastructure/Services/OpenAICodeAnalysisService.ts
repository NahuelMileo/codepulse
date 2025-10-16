import { FileAnalysis } from "@/Domain/Entities/FileAnalysis";
import { ICodeAnalyzer } from "@/Domain/Interfaces/ICodeAnalyzer";
import { OpenAI } from "openai";

export class OpenAICodeAnalysisService implements ICodeAnalyzer {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async analyzeCode(code: string): Promise<FileAnalysis> {
    const prompt = `
You are a code analyzer. Analyze the following code EXACTLY as given.
Provide a score (0-100) and list **ALL issues** found, including minor, medium, and major.
Include:
- line number
- message
- severity (low, medium, high)
- type
- snippet of the code
- suggested solution

Do not omit any issues, even if they are minor.
Return JSON in the format:

{
  "fileName": "string",
  "score": number,
  "issues": [
    {
      "line": number,
      "message": "string",
      "severity": "low" | "medium" | "high",
      "type": "string",
     "snippet": "string",
     "solution": "string"
    
    }
  ]
}

Code to analyze:
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

    if (!result.issues || result.issues.length === 0) {
      result.score = 100;
    }

    return new FileAnalysis(result.fileName, result.score, result.issues);
  }
}
