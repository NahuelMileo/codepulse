import { NextRequest, NextResponse } from "next/server";
import { OpenAICodeAnalysisService } from "@/Infrastructure/Services/OpenAICodeAnalysisService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "code es requerido" }, { status: 400 });
    }

    const analyzer = new OpenAICodeAnalysisService(process.env.OPENAI_API_KEY!);
    const analysisResult = await analyzer.analyzeCode(code);

    return NextResponse.json(analysisResult);
  } catch (err) {
    console.error("Error en API analyze:", err);
    return NextResponse.json(
      { error: "Error al analizar archivo" },
      { status: 500 },
    );
  }
}
