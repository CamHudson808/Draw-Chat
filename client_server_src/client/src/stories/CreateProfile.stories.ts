import type { Meta, StoryObj } from '@storybook/react-webpack5';

// import { fn } from 'storybook/test';

import CreateProfile from '../Pages/CreateProfile';

const meta = {
  title: 'Pages/CreateProfile',
  component: CreateProfile,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
 
  args: { },
} satisfies Meta<typeof CreateProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    hasUser: true,
  },
};
