import type { Meta, StoryObj } from '@storybook/react';
import AssetValueInput from '../../renderer/modules/wallet/transfer/AssetValueInput';

const meta: Meta<typeof AssetValueInput> = {
    title: 'AssetValueInput',
    component: AssetValueInput,
};

export default meta;
type Story = StoryObj<typeof AssetValueInput>;

export const ZeroDecimals: Story = {
    args: {
        assetDecimals: 0,
        assetSymbol: "TKN",
        initialValue: "0"
    }
};