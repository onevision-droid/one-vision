import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TrustPanel } from '@/components/content/TrustPanel';

const meta: Meta<typeof TrustPanel> = {
  title: 'Content/TrustPanel',
  component: TrustPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TrustPanel>;

export const Default: Story = {
  args: {
    variant: 'full',
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
  },
};
