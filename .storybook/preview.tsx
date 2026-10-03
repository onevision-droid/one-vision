import type { Preview } from '@storybook/nextjs-vite'
import { MotionConfig } from "framer-motion"
import React from 'react'
import '../app/globals.css' // Ensure Tailwind styles are loaded

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'bone',
      values: [
        { name: 'bone', value: '#F2EFE7' },
        { name: 'paper', value: '#FAF8F2' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    chromatic: { 
      pauseAnimationAtEnd: true,
      delay: 300
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MotionConfig reducedMotion="user">
        <div className="font-sans antialiased text-foreground">
          <Story />
        </div>
      </MotionConfig>
    )
  ],
};

export default preview;
