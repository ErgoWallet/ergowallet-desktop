import InitWalletParams from '../../renderer/modules/app/onboarding/InitWalletParams';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InitWalletParams> = {
    title: 'Onboarding/InitWalletParams',
    component: InitWalletParams,
};
export default meta;
type Story = StoryObj<typeof InitWalletParams>;

export const Default: Story = {
    args: {
    }
};

export const NotAvailableName: Story = {
    args: {
        isNameAvailable : () => Promise.resolve(false)
    }
};
