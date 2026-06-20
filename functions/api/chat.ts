// Cloudflare Pages Function — POST /api/chat (streaming)
// Relaie la conversation vers Groq en streaming, clé gardée côté serveur.
// Le prompt système est construit depuis lib/clubData -> infos toujours à jour.

import { buildSystemPrompt } from "../../lib/agentKnowledge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function sanitize(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));
}

function jsonError(error: string, status = 500, detail?: string) {
  return new Response(JSON.stringify({ error, detail }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const onRequestPost: PagesFunction<{ GROQ_API_KEY: string }> = async (
  context
) => {
  const { request, env } = context;
  const apiKey = env.GROQ_API_KEY;
  if (!apiKey) return jsonError("missing_api_key", 500);

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonError("invalid_json", 400);
  }

  const history = sanitize(body.messages);
  if (history.length === 0) return jsonError("no_messages", 400);

  const payload = {
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    max_tokens: 600,
    stream: true,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      ...history,
    ],
  };

  let groqRes: Response;
  try {
    groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return jsonError("fetch_failed", 502, String(e));
  }

  if (!groqRes.ok || !groqRes.body) {
    const detail = await groqRes.text().catch(() => "");
    return jsonError("groq_error", 502, detail);
  }

  // Transforme le flux SSE de Groq en texte brut (tokens) pour le client.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";

  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqRes.body!.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const token: string | undefined =
                json?.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              /* ligne SSE incomplète — ignorée */
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
};

export const onRequestGet: PagesFunction = async () =>
  new Response(JSON.stringify({ status: "Agent Étoile API — utilisez POST." }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
