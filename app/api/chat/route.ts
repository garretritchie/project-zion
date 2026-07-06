import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message?: string;
  history?: ChatMessage[];
  route?: {
    scope?: string;
    container?: string;
    privacy?: string;
    agent?: string;
    skill?: string;
  };
};

const DEFAULT_MODEL = "gpt-4.1-mini";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI API key is not configured on the server." }, { status: 500 });
  }

  const body = (await request.json()) as ChatRequest;
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  const history = (body.history ?? []).slice(-8);
  const route = body.route;

  const input = [
    {
      role: "system",
      content: [
        "You are Zion, Garret's private AI command center.",
        "Oracle routes user input by scope, container, privacy, agent, and skill before responding.",
        "Stay concise, practical, and clear. Keep unrelated Redstone, Synergy, personal, family, and app-project context separated unless the user explicitly connects them.",
        "If a request is sensitive, recommend privacy-aware handling before storing or sharing details.",
        "Do not claim to have saved memory, created tickets, sent messages, or changed external systems unless the app explicitly confirms that action."
      ].join(" ")
    },
    {
      role: "system",
      content: `Current local route: scope=${route?.scope ?? "unknown"}; container=${route?.container ?? "unknown"}; privacy=${route?.privacy ?? "unknown"}; agent=${route?.agent ?? "Oracle"}; skill=${route?.skill ?? "General Command"}.`
    },
    ...history.map((item) => ({
      role: item.role,
      content: item.content
    })),
    {
      role: "user",
      content: message
    }
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input,
        max_output_tokens: 700
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.error?.message ?? "OpenAI request failed."
        },
        { status: response.status }
      );
    }

    const text = typeof data.output_text === "string" ? data.output_text : extractResponseText(data);

    return NextResponse.json({
      response: text || "Zion did not return a text response.",
      model
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "OpenAI request failed."
      },
      { status: 500 }
    );
  }
}

function extractResponseText(data: unknown) {
  if (!data || typeof data !== "object" || !("output" in data) || !Array.isArray(data.output)) {
    return "";
  }

  return data.output
    .flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content ?? [])
    .filter((content) => content.type === "output_text" && typeof content.text === "string")
    .map((content) => content.text)
    .join("\n")
    .trim();
}
