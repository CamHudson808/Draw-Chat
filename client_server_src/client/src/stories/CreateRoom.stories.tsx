import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CreateRoom from '../Pages/CreateRoom';
import { withRouter } from 'storybook-addon-remix-react-router';

const meta = {
  title: 'Pages/CreateRoom',
  component: CreateRoom,
  decorators: [withRouter],

} satisfies Meta<typeof CreateRoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};