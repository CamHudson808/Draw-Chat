import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Home from '../Pages/Home';
import { withRouter } from 'storybook-addon-remix-react-router';
import mockSupabase from '../../.storybook/mocks/supabaseClient';

const meta = {
  title: 'Pages/Home',
  component: Home,
  decorators: [withRouter],
  args: {
    // supabaseClient: 

  }

} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
    args: {
        supabaseClient: {
            ...mockSupabase,
            auth: {
                ...mockSupabase.auth,
                 getSession: () =>
                    Promise.resolve({
                        data: { 
                            session: {
                                user: {email: "test@example.com"},
                        } 
                    }, 
                    }),
            }

        }
    }
};
export const LoggedOut: Story = {
    args: {
        supabaseClient: mockSupabase,
    }
};