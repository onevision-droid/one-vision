import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MetricCard } from '@/components/content/MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Content/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  args: {
    value: '2,500+',
    label: 'People Reached',
    bars: [20, 35, 50, 65, 80, 95, 70],
  },
};
