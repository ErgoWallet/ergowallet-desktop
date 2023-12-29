import { TxDetailsDialogView } from '../../renderer/modules/wallet/Transactions/TxDetailsDialog';
import { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TxDetailsDialogView> = {
    title: 'Wallet/TxDetailsDialog',
    component: TxDetailsDialogView,
    parameters: {
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
};

export default meta;
type Story = StoryObj<typeof meta>;

const tx = {
    value: 12121212,
    id: '17d63de9ca3c5d86e4e5f588e2febbba9f59ddafb6ea312f40ff651da6c1634b',
    size: 1,
    inclusionHeight: 0,
    confirmationsCount: 2,
    timestamp: BigInt(1555450),
    inputs: [{
        address: "9fj9NJpzo13HfNyCdzyfNP8zAfjiTY3pys1JP5wCzez8MiP8QbF",
        value: BigInt("12334"),
        id: "17d63de9ca3c5d86e4e5f588e2febbba9f59ddafb6ea312f40ff651da6c1634b"
    }],
    outputs: [
        {
            ergoTree: "",
            additionalRegisters: {},
            boxId: "",
            index: 0,
            creationHeight: 1,
            transactionId: "",
            address: "9fj9NJpzo13HfNyCdzyfNP8zAfjiTY3pys1JP5wCzez8MiP8QbF",
            value: "2355",
            spentTransactionId: null,
            assets: []
        },
        {
            ergoTree: "",
            creationHeight: 1,
            additionalRegisters: {},
            index: 1,
            boxId: "",
            transactionId: "",
            address: "2iHkR7CWvD1R4j1yZg5bkeDRQavjAaVPeTDFGGLZduHyfWMuYpmhHocX8GJoaieTx78FntzJbCBVL6rf96ocJoZdmWBL2fci7NqWgAirppPQmZ7fN9V6z13Ay6brPriBKYqLp1bT2Fk4FkFLCfdPpe",
            value: "100",
            spentTransactionId: null,
            assets: []
        },
        {
            ergoTree: "",
            creationHeight: 1,
            additionalRegisters: {},
            spentTransactionId: null,
            index: 2,
            boxId: "",
            transactionId: "",
            address: "9fj9NJpzo13HfNyCdzyfNP8zAfjiTY3pys1JP5wCzez8MiP8QbE",
            value: "21666",
            assets: [{
                tokenId: "abcde34",
                amount: "123"
            }]
        },
    ]
};

export const Default: Story = {
    args: {
        tx: tx,
        open: true,
        onClose: () => {},
        onTxClick: () => {}
    },
};


// export const Default = () => (<TxDetailsDialog tx={tx} open={true} onClose={() => {}}/>);