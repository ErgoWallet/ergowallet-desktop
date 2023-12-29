import TransactionList from '../../renderer/modules/wallet/Transactions/TransactionList';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TransactionList> = {
    title: 'Wallet/TransactionList',
    component: TransactionList,
};
export default meta;
type Story = StoryObj<typeof TransactionList>;

const txs = {
    "2020-01-24": [
        {
            id: "c11c8dd8aeb9a94b82c98c1a3abf7710aa1c4b05d270b7474a019fa67e811764",
            value: "191812625615762367857234",
            timestamp: 1596448265401

        }
    ],
    "2020-02-01": [
        {
            id: "b95b321507d7a520ff324a02127a238827a76f8ad25ca0fa30c4f5a1f924d319",
            value: "1000",
            timestamp: 1596448205396

        },
        {
            id: "49525bd05d65847f43c52f99d964e5f047487432d2431e091a0a5069ed7e3ff9",
            value: "500",
            timestamp: 1596448205396

        }
    ]
};

export const Default: Story = {
    args: {
        txs
    },
};