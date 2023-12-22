import ConfirmMnemonic from '../../../renderer/modules/app/onboarding/CreateWallet/ConfirmMnemonic';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ConfirmMnemonic> = {
    title: 'Wallet/mnemonic/ConfirmMnemonic',
    component: ConfirmMnemonic,
};
export default meta;
type Story = StoryObj<typeof ConfirmMnemonic>;

export const Default: Story = {
    args: {
        mnemonic : "one two three four five six seven eight nine ten eleven twelve"
    }
};



