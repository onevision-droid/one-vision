import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EditorialIndex } from '@/components/composition/EditorialIndex';

const meta: Meta<typeof EditorialIndex> = {
  title: 'Composition/EditorialIndex',
  component: EditorialIndex,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EditorialIndex>;

export const Default: Story = {};
