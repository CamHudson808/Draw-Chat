import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { sb, fn } from 'storybook/test';
import ChatRooms from '../Pages/ChatRooms';
import { withRouter } from 'storybook-addon-remix-react-router';

const exampleRooms = [
    {roomName: "example room 1", roomDesc: "An example description"},
    {roomName: "example room 2", roomDesc: "An example description"},
    {roomName: "example room 3", roomDesc: "An example description"},
];

const meta = {
  title: 'Pages/ChatRooms',
  component: ChatRooms,
  decorators: [withRouter], 
  args: {
    roomsData: exampleRooms,
    setRoomName: () => fn(),
    //What is setRoomName and Socket again???
  }

} satisfies Meta<typeof ChatRooms>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
