use ergo_lib::{ergotree_ir::chain::ergo_box::ErgoBox, chain::ergo_state_context::Headers};
use tauri::App;

#[cfg(mobile)]
mod mobile;
#[cfg(mobile)]
pub use mobile::*;

pub type SetupHook = Box<dyn FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send>;

mod address;
mod transaction;

use hex;
use transaction::{UnsignedTransaction, TxInput, TxOutput, Transaction};

#[tauri::command]
fn pk2address(pub_key: String) -> String {
    let bytes = hex::decode(pub_key).unwrap();
    address::from_pub_key(bytes.as_slice())
}

#[tauri::command]
fn validate_address(address: &str) -> bool {
    address::validate(address)
}

#[tauri::command]
fn create_tx(
    inputs: Vec<TxInput>,
    outputs: Vec<TxOutput>,
    fee_amount: String,
    height: u32
) -> Result<UnsignedTransaction, String> {
    let fee = fee_amount.parse::<u64>().unwrap();
    transaction::Transaction::create(inputs.as_slice(), outputs.as_slice(), fee, height)
}

#[tauri::command]
fn sign_tx(
  secret_keys: Vec<String>,
  boxes_to_spend: Vec<ErgoBox>,
  tx: UnsignedTransaction,
  headers: Headers,
) -> Result<Transaction, String> {

  transaction::Transaction::sign(secret_keys.as_slice(), boxes_to_spend, &tx, headers)
}

#[derive(Default)]
pub struct AppBuilder {
  setup: Option<SetupHook>,
}

impl AppBuilder {
  pub fn new() -> Self {
    Self::default()
  }

  #[must_use]
  pub fn setup<F>(mut self, setup: F) -> Self
  where
    F: FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send + 'static,
  {
    self.setup.replace(Box::new(setup));
    self
  }

  pub fn run(self) {
    let setup = self.setup;
    tauri::Builder::default()
      .plugin(tauri_plugin_window::init())
      .plugin(tauri_plugin_shell::init())
      .invoke_handler(tauri::generate_handler![
        pk2address,
        validate_address,
        create_tx,
        sign_tx
        ])
      .setup(move |app| {
        if let Some(setup) = setup {
          (setup)(app)?;
        }
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
  }
}