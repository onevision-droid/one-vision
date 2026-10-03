import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FeatureCard } from '@/components/content/FeatureCard';

const meta: Meta<typeof FeatureCard> = {
  title: 'Content/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = {
  args: {
    eyebrow: 'JOIN OUR WORK',
    title: 'Support Communities in Manipur.',
    buttonText: 'Donate Now',
    buttonHref: '/donate',
    image: '/home-hero-2026.jpg',
  },
};

export const EmergencyRelief: Story = {
  args: {
    eyebrow: 'URGENT RELIEF',
    title: 'Winter Medical Supplies Distribution',
    buttonText: 'Contribute Directly',
    buttonHref: '/donate?campaign=winter-relief',
    image: '/hero-crisis.jpg',
  },
};
