import type { Preview } from '@storybook/nextjs-vite'
import { MotionConfig } from "framer-motion"
import React from 'react'
import '../app/globals.css' // Ensure Tailwind styles are loaded

const preview: Preview = {
  parameters: {
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
        <Story />
      </MotionConfig>
    )
  ],
};

export default preview;