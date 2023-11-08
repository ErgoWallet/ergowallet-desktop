import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import TransactionList from '../../renderer/modules/wallet/Transactions/TransactionList';


const meta: Meta<typeof TransactionList> = {
  title: 'Wallet/Transactions',
  component: TransactionList,
};

export default meta;
type Story = StoryObj<typeof TransactionList>;


export const TxList1: Story = {
  args: {
    txs: { 
      "2023-10-30": [
        {
          timestamp: 1699423997188,
          value: 111,
          id: "ce3957ee88b225b7544759b81e30fb380dcc7e0fe22697aeefaf5ffebe93fa43"
        }
      ],
      "2023-11-03": [

      ],
    }
  }
};

