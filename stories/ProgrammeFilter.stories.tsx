import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgrammeFilter } from '@/components/content/ProgrammeFilter';

const meta: Meta<typeof ProgrammeFilter> = {
  title: 'Content/ProgrammeFilter',
  component: ProgrammeFilter,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgrammeFilter>;

export const Default: Story = {
  args: {
    programmes: [
      {
        id: 'prog-1',
        title: 'Community Mobile Clinics',
        slug: 'mobile-clinics',
        description: 'Bi-weekly doctor rounds delivering basic triage and chronic care management.',
        category: 'Healthcare',
        status: 'Active',
        location: 'Imphal East & West',
        metrics: [{ label: 'Patients Treated', value: '4,200+' }],
        image: '/about-hero.jpg',
      },
      {
        id: 'prog-2',
        title: 'Child Learning Centers',
        slug: 'child-learning-centers',
        description: 'Safe transitional learning spaces for displaced primary school children.',
        category: 'Education',
        status: 'Active',
        location: 'Churachandpur',
        metrics: [{ label: 'Children Enrolled', value: '850' }],
        image: '/programmes-hero.jpg',
      },
      {
        id: 'prog-3',
        title: 'Emergency Shelter Repair',
        slug: 'shelter-repair',
        description: 'Weatherproofing materials and solar lighting kits for rural settlements.',
        category: 'Shelter',
        status: 'Active',
        location: 'Bishnupur',
        metrics: [{ label: 'Shelters Upgraded', value: '180' }],
        image: '/volunteer-hero.jpg',
      },
    ],
  },
};
