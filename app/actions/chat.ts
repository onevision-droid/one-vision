"use server";

import { fetchChatCompletion } from "@/lib/openrouter";

export async function submitChatMessage(message: string) {
  try {
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
  } catch (error: any) {
    console.error("Chat error:", error);
    return { success: false, error: error.message || "Failed to fetch response." };
  }
}
