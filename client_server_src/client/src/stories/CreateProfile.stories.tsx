import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CreateProfile from '../Pages/CreateProfile';
import { withRouter } from 'storybook-addon-remix-react-router';

const meta = {
  title: 'Pages/CreateProfile',
  component: CreateProfile,
  decorators: [withRouter],
  args: {
    hasUser: false,
    getUser: async () => ({ id: "123", email: "mock@email.com" }),
  }

} satisfies Meta<typeof CreateProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
