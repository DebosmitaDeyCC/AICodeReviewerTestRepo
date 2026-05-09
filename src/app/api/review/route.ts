type ReviewRequest = {
  code?: unknown;
  language?: unknown;
};

type GeminiPart = {
  text?: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
  error?: {
    message?: string;
  };
};

const MAX_CODE_LENGTH = 20_000;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";

const reviewResponseSchema = {
  type: "OBJECT",
  properties: {
    summary: {
      type: "STRING",
    },
    bugs: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          severity: { type: "STRING" },
          description: { type: "STRING" },
          suggestion: { type: "STRING" },
          lineNumber: { type: "INTEGER" },
        },
      },
    },
    securityIssues: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          severity: { type: "STRING" },
          description: { type: "STRING" },
          suggestion: { type: "STRING" },
          lineNumber: { type: "INTEGER" },
        },
      },
    },
    optimizations: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          description: { type: "STRING" },
          impact: { type: "STRING" },
        },
      },
    },
    explanation: {
      type: "STRING",
    },
    improvedCode: {
      type: "STRING",
    },
  },
  propertyOrdering: [
    "summary",
    "bugs",
    "securityIssues",
    "optimizations",
    "explanation",
    "improvedCode",
  ],
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as ReviewRequest;
    const validationError = validateReviewRequest(body);

    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const code = body.code as string;
    const language = body.language as string;
    const review = await reviewCodeWithGemini({ apiKey, code, language });

    return Response.json({ review });
  } catch (error) {
    console.error("Code review request failed:", error);

    return Response.json(
      { error: "Unable to review code right now. Please try again." },
      { status: 500 },
    );
  }
}

function validateReviewRequest(body: ReviewRequest) {
  if (typeof body.code !== "string" || body.code.trim().length === 0) {
    return "Code is required.";
  }

  if (body.code.length > MAX_CODE_LENGTH) {
    return `Code must be ${MAX_CODE_LENGTH} characters or fewer.`;
  }

  if (
    typeof body.language !== "string" ||
    body.language.trim().length === 0
  ) {
    return "Language is required.";
  }

  return null;
}

async function reviewCodeWithGemini({
  apiKey,
  code,
  language,
}: {
  apiKey: string;
  code: string;
  language: string;
}) {
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const response = await fetch(
    `${GEMINI_API_URL}/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text: "You are a senior application security engineer and code reviewer. Return only valid JSON that matches the requested schema.",
            },
          ],
        },
        contents: [
          {
            parts: [
              {
                text: buildReviewPrompt({ code, language }),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
          responseSchema: reviewResponseSchema,
        },
      }),
    },
  );

  const data = (await response.json()) as GeminiResponse;

  if (!response.ok) {
    throw new Error(data.error?.message ?? "Gemini API request failed.");
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini API returned an empty response.");
  }

  return JSON.parse(text);
}

function buildReviewPrompt({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  return `Review this ${language} code.

Focus on:
- Bugs and incorrect behavior
- Security vulnerabilities
- Performance and maintainability optimizations
- Clear explanations of improvements
- A safer, improved version of the code

Use concise, practical feedback. If no items exist in a category, return an empty array for that category.

Code:
\`\`\`${language}
${code}
\`\`\``;
}
