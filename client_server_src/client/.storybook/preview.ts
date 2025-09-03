import type { Preview } from '@storybook/react-webpack5'
import "../src/index.css"
import { sb } from 'storybook/test';

sb.mock(import('../src/supabase_config/supabaseClient'))

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;