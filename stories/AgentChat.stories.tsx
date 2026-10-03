import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AgentChat } from '@/components/ai/agent-chat';
import { getFixtureChatMessages, useCommunityGuideChat } from '@/lib/ai/chat-fixtures';

const meta: Meta<typeof AgentChat> = {
  title: 'AI/AgentChat',
  component: AgentChat,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AgentChat>;

export const Empty: Story = {
  args: {
    className: 'h-125',
  },
};

export const ActiveConversation: Story = {
  args: {
    className: 'h-125',
    initialMessages: getFixtureChatMessages(),
  },
};

export const ThinkingLoading: Story = {
  args: {
    className: 'h-125',
    initialMessages: getFixtureChatMessages().slice(0, 1),
    initialLoading: true,
  },
};

export const OfflineStreamDemo: Story = {
  render: () => {
    function StreamPreview() {
      const { messages } = useCommunityGuideChat();
      const mappedMessages = messages.map((m) => {
        let text = "";
        for (const part of m.parts) {
          if (part.type === "text" && "text" in part && typeof part.text === "string") {
            text += part.text;
          }
        }
        return {
          id: m.id,
          role: m.role as "user" | "assistant",
          content: text,
        };
      });
      return (
        <AgentChat
          className="h-125"
          initialMessages={mappedMessages}
          onSendMessage={async (userText) => ({
            id: `assistant-fixture-${Date.now()}`,
            role: "assistant",
            content: `Simulated offline response for: "${userText}". Connected to local community knowledge fixture.`,
            modelUsed: "fixture/community-guide",
          })}
        />
      );
    }
    return <StreamPreview />;
  },
};

