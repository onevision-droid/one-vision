import type { Meta, StoryObj } from '@storybook/nextjs';
import { DonateForm } from '@/components/forms/DonateForm';

const meta: Meta<typeof DonateForm> = {
  title: 'Forms/DonateForm',
  component: DonateForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DonateForm>;

export const Default: Story = {
  args: {
    onSubmitOverride: (values) => {
      console.log('Mock submission intercepted with values:', values);
    }
  }
};
