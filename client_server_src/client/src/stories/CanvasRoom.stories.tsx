import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CanvasRoom from '../Components/CanvasRoom';

const meta = {
  title: 'Components/CanvasRoom',
  component: CanvasRoom,
  args: {
    name: "example name",
    description: "example description",
  }

} satisfies Meta<typeof CanvasRoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
