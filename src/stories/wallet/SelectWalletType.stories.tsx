import { Meta, StoryObj } from '@storybook/react';
import SelectWalletType from '../../renderer/modules/app/onboarding/ImportWallet/SelectWalletType';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SelectWalletType> = {
    title: 'Wallet/SelectWalletType',
    component: SelectWalletType,
    parameters: {
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
  };
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Default: Story = {
    args: {
    },
  };

