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
You are a professional code analyzer.
Analyze the code EXACTLY as given.
Provide:
- A score from 0 to 100
- Any issues found, with correct line numbers as per the text provided
- Return JSON in the exact format below:

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
