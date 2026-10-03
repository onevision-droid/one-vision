import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'programme',
        'story',
        'impact',
        'volunteer',
        'community',
        'urgent',
        'active',
        'pending',
        'completed',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Programme: Story = {
  args: {
    children: 'Programme',
    variant: 'programme',
  },
};

export const StoryPill: Story = {
  args: {
    children: 'Story',
    variant: 'story',
  },
};

export const Impact: Story = {
  args: {
    children: 'Impact',
    variant: 'impact',
  },
};

export const ActiveStatus: Story = {
  args: {
    children: 'Active',
    variant: 'active',
  },
};
