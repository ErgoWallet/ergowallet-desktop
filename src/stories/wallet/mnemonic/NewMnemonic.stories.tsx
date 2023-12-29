import NewMnemonic from '../../../renderer/modules/app/onboarding/CreateWallet/NewMnemonic';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NewMnemonic> = {
    title: 'Wallet/mnemonic/NewMnemonic',
    component: NewMnemonic,
};
export default meta;
type Story = StoryObj<typeof NewMnemonic>;


const backendApi = {
    generateMnemonic: () => Promise.resolve("one two three four five six seven eight nine ten eleven one")
};

export const Default: Story = {
    args: {
        backendApi : backendApi
    }
};