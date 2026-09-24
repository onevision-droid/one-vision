"use server";

import { fetchChatCompletion } from "@/lib/openrouter";
import { headers } from "next/headers";

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

export async function submitChatMessage(message: string) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown_ip";
    
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
        rateLimitMap.clear(); // Safety fallback
      }
    }
    
    rateLimitMap.set(ip, userLimit);

    if (userLimit.count > RATE_LIMIT) {
      return { success: false, error: "Rate limit exceeded. Please try again later." };
    }
    const data = await fetchChatCompletion([
      {
        role: "user",
        content: message,
      },
    ]);

    if (data.choices && data.choices.length > 0) {
      return { success: true, reply: data.choices[0].message.content };
    }
    
    return { success: false, error: "No response from AI." };
  } catch (error: unknown) {
    console.error("Chat error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch response." };
  }
}
