import { NextRequest, NextResponse } from"next/server";
import { headers } from"next/headers";
import { z } from"zod";export const runtime ="nodejs";

const FALLBACK_MODELS = [
 "nvidia/nemotron-3.5-lightning:free",
 "inclusionai/ling-3.0-flash-sante:free",
 "liquid/lfm-2.5-2.6b:free",
 "google/gemma-4-31b-it:free",
];

const SYSTEM_PROMPT = `You are the One Vision Community Care AI Assistant.
One Vision is a registered, community-led non-profit organisation working across Manipur, India (established 1988, formerly Society for Health & Education Manipur).

Our Core Community Programmes:
1. Community Health Connect: 18 local healthcare centres providing preventative care, maternal health, medicine, and telemedicine access across rural and urban Manipur.
2. Local Enterprise & Solar Lab: Rural clean energy microgrids powering health centres and cold-chain medicine, combined with micro-grant support for local artisanal and farming cooperatives.
3. Green Manipur Lab: Community seed banks preserving 340+ heirloom crops, neighbourhood tree planting, watershed restoration, and environmental education.
4. FutureWorks: Youth skills lab providing real-world project mentorship, digital education, and vocational pathways.
5. Community Data Lab: Open evidence and participatory surveys empowering local village councils with accurate data.

Key Guidelines:
- Emergency Support: Direct inquiries to our 24/7 Community Helpline (+91 98765 43210) or /get-help.
- Radical Transparency: 100% of donations are publicly accounted for with hourly updates on the Open Ledger (/open-ledger). Donations are eligible for 50% tax deduction under Section 80G.
- Tone & Demeanour: Warm, compassionate, respectful, calm, and grounded in Manipur's local community context. Never use tech jargon, military terms, or marketing fluff. Speak as a trusted non-profit coordinator helping people find genuine support.`;



const BodySchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user","assistant"]),
    content: z.string().trim().min(1).max(4000),
  })).min(1).max(50),
});

const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_MAP_SIZE = 1000;

function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    let parsed;
    try {
      parsed = BodySchema.safeParse(await req.json());
    } catch {
      return NextResponse.json(
        { error:"Invalid JSON body" },
        { status: 400 }
      );
    }

    if (!parsed.success) {
      return NextResponse.json(
        { error:"Invalid request: messages array is required and must follow schema." },
        { status: 400 }
      );
    }
    const { messages } = parsed.data;

    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") ||"unknown_ip";
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    
    if (now - userLimit.timestamp > RATE_LIMIT_WINDOW) {
      userLimit.count = 1;
      userLimit.timestamp = now;
    } else {
      userLimit.count += 1;
    }

    if (!rateLimitMap.has(ip) && rateLimitMap.size >= MAX_MAP_SIZE) {
      cleanupRateLimitMap();
      if (rateLimitMap.size >= MAX_MAP_SIZE) {
        rateLimitMap.clear();
      }
    }
    
    rateLimitMap.set(ip, userLimit);

    if (userLimit.count > RATE_LIMIT) {
      return NextResponse.json(
        { error:"Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:"OPENROUTER_API_KEY is not configured on the server.",
        },
        { status: 500 }
      );
    }

    const formattedMessages = [
      { role:"system", content: SYSTEM_PROMPT },
      ...messages.slice(-10), // keep last 10 messages for context
    ];

    let lastError: string | null = null;
    const failedModels: string[] = [];

    // Model fallback loop
    for (const model of FALLBACK_MODELS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout per model
      
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method:"POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
           "Content-Type":"application/json",
           "HTTP-Referer":"https://onevision.org",
           "X-Title":"One Vision Vanguard",
          },
          body: JSON.stringify({
            model,
            messages: formattedMessages,
            temperature: 0.4,
            max_tokens: 1024,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.warn(`[OpenRouter Fallback] ${model} failed (${response.status}):`, errData);
          failedModels.push(model);
          lastError = errData?.error?.message || `HTTP ${response.status}`;
          continue; // Try next model in sequence
        }

        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content ||"";

        if (!rawContent.trim()) {
          failedModels.push(model);
          continue;
        }

        // Remove embedded <think> tags entirely, don't expose
        let finalContent = rawContent.replace(/<think>[\s\S]*?<\/think>/gi,"").trim();

        // Clean out trailing meta reflections/self-corrections
        const metaMatch = finalContent.match(/\n\n(?:\d+\.\s*)?\*\*(?:Self-Correction|Refinement|Thinking|Internal Review)[\s\S]*$/i);
        if (metaMatch) {
          finalContent = finalContent.replace(metaMatch[0],"").trim();
        }

        const executionTimeMs = Date.now() - startTime;

        return NextResponse.json({
          content: finalContent,
          modelUsed: model,
          fallbackAttempted: failedModels.length > 0,
          failedModels,
          executionTimeMs,
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.warn(`[OpenRouter Fallback] ${model} threw error:`, errorMsg);
        failedModels.push(model);
        lastError = errorMsg;
      } finally {
        clearTimeout(timeoutId);
      }
    }

    // If all models failed, return graceful error
    return NextResponse.json(
      {
        error:"All free AI models are currently rate-limited or unavailable. Please retry in a few moments.",
        failedModels,
        lastError,
      },
      { status: 503 }
    );
  } catch (err: unknown) {
    console.error("[Chat API Fatal Error]:", err);
    return NextResponse.json(
      { error:"Internal server error" },
      { status: 500 }
    );
  }
}
