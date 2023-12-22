import * as React from 'react';
import InitialStep from '../../renderer/modules/wallet/transfer/InitialStep';
import ConfirmationStep from '../../renderer/modules/wallet/transfer/ConfirmationStep';
import { AdditionalRegisters } from '../../main/ergoplatform/connector/types';

export default {
    title: 'Transfer',
};

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

export const InitialStepStory = () => <InitialStep assetId="ERG" fromBoxes={boxes}/>;

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

export const ConfirmationStepStory = () => (
    <ConfirmationStep tx={tx}/>
);
