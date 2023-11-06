
use ergo_lib::{
    chain::{
        self,
        contract::Contract,
        transaction::{TxIoVec, UnsignedInput}, ergo_state_context::{ErgoStateContext, Headers},
    },
    ergo_chain_types::{Base16DecodedBytes, Digest32, Header, PreHeader},
    ergotree_interpreter::sigma_protocol::{prover::{ContextExtension, TestProver}, private_input::{PrivateInput, DlogProverInput}},
    ergotree_ir::chain::{
        address::{AddressEncoder, NetworkPrefix},
        ergo_box::{
            box_value::BoxValue, BoxId, BoxTokens, ErgoBoxCandidate, NonMandatoryRegisters, ErgoBox,
        },
        token::{Token, TokenAmount, TokenId},
    }, wallet::{tx_context::TransactionContext, signing::sign_transaction},
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

#[derive(PartialEq, Debug, Clone, Serialize, Deserialize)]
pub struct Transaction(chain::transaction::Transaction);

impl Transaction {
    pub fn create(
        inputs: &[TxInput],
        outputs: &[TxOutput],
        fee_amount: u64,
        height: u32,
    ) -> Result<UnsignedTransaction, String> {
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

    pub fn sign(
        secret_keys: &[String],
        boxes_to_spend: Vec<ErgoBox>,
        tx: &UnsignedTransaction,
        headers: Headers,
    ) -> Result<Transaction, String> {
        // let secrets: Vec<String> = secret_keys
        //     .into_iter()
        //     .map(|x| x.into_serde().unwrap())
        //     .collect();

        // let boxes_to_spend: Vec<ErgoBox> = boxes_to_spend
        //     .into_iter()
        //     .map(|x| x.into_serde().unwrap())
        //     .collect();

        // 1. Construct prover from secret keys
        let prover = TestProver {
            secrets: secret_keys
                .into_iter()
                .map(|s: &String| {
                    let scalar_bytes = Base16DecodedBytes::try_from(s.as_str()).unwrap();
                    let bytes: &[u8; 32] = scalar_bytes.0.as_slice().try_into().unwrap();
                    PrivateInput::DlogProverInput(DlogProverInput::from_bytes(bytes).unwrap())
                })
                .collect(),
        };

        // 2. Construct unsigned transaction
        // let unsigned: chain::transaction::unsigned::UnsignedTransaction = tx.0;
        let tx_context = TransactionContext::new(tx.clone().0, boxes_to_spend, vec![]).unwrap();

        //     spending_tx: tx.0,
        //     TxIoVec::from_vec(boxes_to_spend).unwrap(),
        //     data_boxes: None
        // };

        let pre_header = PreHeader::from(headers[0].clone());
        let res = sign_transaction(
            &prover,
            tx_context,
            &ErgoStateContext::new(pre_header, headers.try_into().unwrap()),
            None
        ).unwrap();
        // .map_err(|e| JsValue::from_str(&format!("{}", e)))
        // .map(Transaction::from);

        Ok(Transaction(res))
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
