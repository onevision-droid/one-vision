import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StoryCard } from '@/components/content/StoryCard';

const meta: Meta<typeof StoryCard> = {
  title: 'Content/StoryCard',
  component: StoryCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryCard>;

export const Default: Story = {
  args: {
    title: 'Restoring Water Access in Torbung Community Centers',
    summary: 'Local volunteer youth brigades installed gravity-fed filtration units servicing over 350 residents daily.',
    author: 'L. Sanjit',
    date: 'October 2, 2026',
    href: '/stories/restoring-water-access-torbung',
    image: '/community-voices.jpg',
    badge: 'Field Report',
  },
};
