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
You are a professional and helpful code analyzer.
Analyze the following code EXACTLY as given. Provide a score (0-100)
Focus on issues that:
- Could break functionality
- Cause runtime errors
- Affect performance significantly
- Make maintenance difficult

Ignore purely stylistic issues or minor aesthetic suggestions.

For each issue, include:
- line number
- message
- severity (medium or high)
- type
- snippet of the code
- suggested solution

Do not include low severity styling-only issues in the main issues array.
Return JSON in the format:

{
  "fileName": "string",
  "score": number,
  "issues": [
    {
      "line": number,
      "message": "string",
      "severity": "medium" | "high",
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
