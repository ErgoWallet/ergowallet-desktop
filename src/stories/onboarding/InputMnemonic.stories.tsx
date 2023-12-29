import * as React from 'react';
import InputMnemonic from '../../renderer/modules/app/onboarding/ImportWallet/InputMnemonic';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputMnemonic> = {
    title: 'Onboarding/InputMnemonic',
    component: InputMnemonic,
};
export default meta;
type Story = StoryObj<typeof InputMnemonic>;

export const Default: Story = {
    args: {
    }
};