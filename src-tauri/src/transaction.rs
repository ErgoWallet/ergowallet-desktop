use std::error::Error;

use ergo_lib::{
    chain::{
        self,
        contract::Contract,
        transaction::{TxIoVec, UnsignedInput},
    },
    ergo_chain_types::{Base16DecodedBytes, Digest32},
    ergotree_interpreter::sigma_protocol::prover::ContextExtension,
    ergotree_ir::chain::{
        address::{AddressEncoder, NetworkPrefix},
        ergo_box::{
            box_value::BoxValue, BoxId, BoxTokens, ErgoBoxCandidate, NonMandatoryRegisters,
        },
        token::{Token, TokenAmount, TokenId},
    },
};
use serde::{Deserialize, Serialize};

const MINER_ERGO_TREE: &str = "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304";
const MINERS_FEE_MAINNET_ADDRESS: &str =
    "2iHkR7CWvD1R4j1yZg5bkeDRQavjAaVPeTDFGGLZduHyfWMuYpmhHocX8GJoaieTx78FntzJbCBVL6rf96ocJoZdmWBL2fci7NqWgAirppPQmZ7fN9V6z13Ay6brPriBKYqLp1bT2Fk4FkFLCfdPpe";

#[derive(Serialize, Deserialize)]
pub struct AssetValue {
    #[serde(rename = "tokenId")]
    pub token_id: String,
    pub amount: String,
}

#[derive(Serialize, Deserialize)]
pub struct TxInput {
    #[serde(rename = "boxId")]
    pub box_id: String,
}

#[derive(Serialize, Deserialize)]
pub struct TxOutput {
    pub value: String,
    pub address: String,
    pub assets: Vec<AssetValue>,
}

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct UnsignedTransaction(chain::transaction::unsigned::UnsignedTransaction);

pub struct Transaction(chain::transaction::Transaction);

impl Transaction {
    pub fn create(
        inputs: &[TxInput],
        outputs: &[TxOutput],
        fee_amount: u64,
        height: u32,
    ) -> Result<UnsignedTransaction, String> {
        // let inputs_from_js: Vec<TxInput> = inputs
        //     .into_iter()
        //     .map(|x| TxInput { ..*x })
        //     .collect();

        // let outputs_from_js: Vec<TxOutput> = outputs
        //     .into_iter()
        //     .map(|x| TxOutput { ..*x })
        //     .collect();

        let encoder = AddressEncoder::new(NetworkPrefix::Mainnet);

        // construct inputs without proofs
        let _inputs: Vec<UnsignedInput> = inputs
            .iter()
            .map(|x: &TxInput| {
                let id_bytes = Base16DecodedBytes::try_from(x.box_id.clone()).unwrap();
                let digest: Digest32 = Digest32::try_from(id_bytes).unwrap();
                let box_id: BoxId = BoxId::from(digest);

                UnsignedInput {
                    box_id,
                    extension: ContextExtension::empty(),
                }
            })
            .collect();

        // construct outputs
        let mut _outputs: Vec<ErgoBoxCandidate> = outputs
            .iter()
            .map(|x: &TxOutput| {
                let addr = encoder.parse_address_from_str(x.address.as_str()).unwrap();
                let contract = Contract::pay_to_address(&addr).unwrap();
                let val = x.value.parse::<u64>().unwrap();

                // tokens
                let tokens: Vec<Token> = x
                    .assets
                    .iter()
                    .map(|t: &AssetValue| {
                        let id_bytes = Base16DecodedBytes::try_from(t.token_id.clone()).unwrap();
                        let digest = Digest32::try_from(id_bytes).unwrap();
                        Token {
                            token_id: TokenId::from(digest),
                            amount: TokenAmount::try_from(t.amount.parse::<u64>().unwrap())
                                .unwrap(),
                        }
                    })
                    .collect();

                let box_tokens = match tokens.is_empty() {
                    true => None,
                    false => Some(BoxTokens::from_vec(tokens).unwrap()),
                };
                ErgoBoxCandidate {
                    value: BoxValue::new(val).unwrap(),
                    ergo_tree: contract.ergo_tree(),
                    tokens: box_tokens,
                    additional_registers: NonMandatoryRegisters::empty(),
                    creation_height: height,
                }
            })
            .collect();

        // add one output for miner fee
        _outputs.push(Self::fee_box_candidate(fee_amount, height));

        // create transaction
        let tx = chain::transaction::unsigned::UnsignedTransaction::new(
            TxIoVec::from_vec(_inputs).unwrap(),
            None,
            TxIoVec::from_vec(_outputs).unwrap(),
        )
        .unwrap();

        Ok(UnsignedTransaction(tx))
    }

    fn fee_box_candidate(fee_amount: u64, creation_height: u32) -> ErgoBoxCandidate {
        let address_encoder = AddressEncoder::new(NetworkPrefix::Mainnet);
        let miner_fee_address = address_encoder
            .parse_address_from_str(MINERS_FEE_MAINNET_ADDRESS)
            .unwrap();
        let fee_ergo_tree = miner_fee_address.script().unwrap();

        //let ergo_tree_bytes = Base16DecodedBytes::try_from(MINER_ERGO_TREE.to_string()).unwrap();
        //let fee_ergo_tree = ErgoTree::sigma_parse_bytes(ergo_tree_bytes.0).unwrap();
        ErgoBoxCandidate {
            value: BoxValue::new(fee_amount).unwrap(),
            ergo_tree: fee_ergo_tree,
            tokens: None,
            additional_registers: NonMandatoryRegisters::empty(),
            creation_height,
        }
    }
}
