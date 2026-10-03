import { createChat } from "@shadcn/helpers/ai-sdk";
import { useChat } from "@ai-sdk/react";
import type { ChatMessage } from "@/components/ai/agent-chat";

export const communityGuideFixture = createChat()
  .user("How does One Vision maintain decentralized health nodes?")
  .assistant(({ writer }) => {
    writer.reasoning("Looking up community health clinic distribution across Manipur...");
    writer.text(
      "One Vision operates 18 local healthcare centres providing preventative care, maternal health, medicine, and telemedicine access across rural and urban Manipur."
    );
  })
  .user("What is the Open Ledger and how are funds audited?")
  .assistant(({ writer }) => {
    writer.reasoning("Checking financial transparency protocols and Section 80G certification...");
    writer.text(
      "100% of donations are publicly accounted for with hourly updates on the Open Ledger (/open-ledger). Contributions are eligible for 50% tax deduction under Section 80G."
    );
  })
  .user("How can I volunteer or mentor in Imphal?")
  .assistant(({ writer }) => {
    writer.text(
      "You can join FutureWorks as a mentor for youth skills, or collaborate with our Green Manipur Lab seed banks. Visit /get-involved to register your interest."
    );
  });

/**
 * Extracts and maps deterministic messages from the AI SDK fixture
 * to the AgentChat UI component message structure.
 */
export function getFixtureChatMessages(): ChatMessage[] {
  const uiMessages = communityGuideFixture.get();
  return uiMessages.map((m) => {
    let content = "";
    for (const part of m.parts) {
      if (part.type === "text" && "text" in part && typeof part.text === "string") {
        content += part.text;
      }
    }
    return {
      id: m.id,
      role: m.role as "user" | "assistant",
      content,
      modelUsed: m.role === "assistant" ? "google/gemma-4-31b-it:free" : undefined,
    };
  });
}

/**
 * Hook providing offline, deterministic useChat transport for testing and previews.
 */
export function useCommunityGuideChat() {
  return useChat({
    messages: communityGuideFixture.get(0),
    transport: communityGuideFixture.transport(),
  });
}
