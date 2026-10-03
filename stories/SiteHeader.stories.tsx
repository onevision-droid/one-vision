import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteHeader } from '@/components/layout/SiteHeader';

const meta: Meta<typeof SiteHeader> = {
  title: 'Layout/SiteHeader',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {};

export const Transparent: Story = {
  args: {
    transparent: true,
  },
};
