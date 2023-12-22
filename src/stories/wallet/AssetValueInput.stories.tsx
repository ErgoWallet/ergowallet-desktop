import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AssetValueInput from '../../renderer/modules/wallet/transfer/AssetValueInput';

// export default {
//     title: 'AssetValueInput',
//     component: AssetValueInput,
// };


//export const ZeroDecimals = () => (<AssetValueInput assetDecimals={0} assetSymbol={"TKN"} initialValue={"0"}/>);


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

