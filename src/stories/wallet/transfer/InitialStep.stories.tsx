import { AdditionalRegisters } from '../../../main/ergoplatform/connector/types';
import InitialStep from '../../../renderer/modules/wallet/transfer/InitialStep';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InitialStep> = {
    title: 'Wallet/transfer/InitialStep',
    component: InitialStep,
};
export default meta;
type Story = StoryObj<typeof InitialStep>;

const boxes = [
  {
      address: "9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV",
      value: "123",
      boxId: "1",
      assets: [],
      index: 0,
      transactionId: "",
      ergoTree: "",
      creationHeight: 555,
      additionalRegisters: {} as AdditionalRegisters,
      spentTransactionId: null,
  },
  {
      address: '9hzP24a2q8KLPVCUk7gdMDXYc7vinmGuxmLp5KU7k9UwptgYBYV',
      value: "555",
      boxId: "2",
      assets: [{tokenId: "a348fa", amount: "23"}],
      index: 0,
      transactionId: "",
      ergoTree: "",
      creationHeight: 555,
      additionalRegisters: {} as AdditionalRegisters,
      spentTransactionId: null,
  }
];

export const Default: Story = {
    args: {
      assetId: "ERG",
      fromBoxes: boxes
    }
};