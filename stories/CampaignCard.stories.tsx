import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CampaignCard } from '@/components/content/CampaignCard';

const meta: Meta<typeof CampaignCard> = {
  title: 'Content/CampaignCard',
  component: CampaignCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CampaignCard>;

export const Active: Story = {
  args: {
    title: 'Emergency Medical Support for Displaced Families',
    summary: 'Providing essential medicines and field trauma care to vulnerable communities across Imphal and Churachandpur.',
    status: 'Active',
    href: '/campaigns/emergency-medical-support',
    image: '/hero-crisis.jpg',
  },
};

export const Urgent: Story = {
  args: {
    title: 'Winter Shelter & Warmth Initiative',
    summary: 'Distributing insulated blankets, thermal wear, and weatherized bedding before peak frost.',
    status: 'Urgent',
    href: '/campaigns/winter-shelter',
    image: '/hero-imphal.jpg',
  },
};
