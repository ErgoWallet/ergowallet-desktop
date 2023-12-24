import ConfirmationStep from '../../../renderer/modules/wallet/transfer/ConfirmationStep';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ConfirmationStep> = {
    title: 'Wallet/transfer/ConfirmationStep',
    component: ConfirmationStep,
};
export default meta;
type Story = StoryObj<typeof ConfirmationStep>;


const tx = {
    outputs: [
        {
            value: "90",
            address: "9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV"
        },
        {
            value: "1",
            address: "9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYK"
        }
    ],
    fee: "1000",
    ergoTx: {
        inputs: [
            {
                boxId: "be1c58a3fb740f2024d744484dc10ca90c1db767bf91807f0edaf4a887a7146e"
            }
        ],
        dataInputs: [],
        outputs: [{

        }],
    }
}

export const Default: Story = {
    args: {
      tx: tx
    }
};