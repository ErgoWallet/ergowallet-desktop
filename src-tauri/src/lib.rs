use std::sync::Mutex;
use ergo_lib::{
    chain::ergo_state_context::Headers,
    ergotree_ir::chain::{address::NetworkPrefix, ergo_box::ErgoBox},
};
use serde_json::Value;
use tauri::{App, Manager};
use tauri_plugin_cli::CliExt;

#[cfg(mobile)]
mod mobile;
#[cfg(mobile)]
pub use mobile::*;

pub type SetupHook = Box<dyn FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send>;

mod address;
mod transaction;
mod wallet;

use hex;
use transaction::{Transaction, TxInput, TxOutput, UnsignedTransaction};
use crate::wallet::Wallet;

struct AppState {
    network: NetworkPrefix,
    wallet: Mutex<Option<Wallet>>
}

#[tauri::command]
fn pk2address(pub_key: String, state: tauri::State<AppState>) -> String {
    let bytes = hex::decode(pub_key).unwrap();
    address::from_pub_key(bytes.as_slice(), state.network)
}

#[tauri::command]
fn validate_address(address: &str, state: tauri::State<AppState>) -> bool {
    address::validate(address, state.network)
}

#[tauri::command]
fn create_tx(
    inputs: Vec<TxInput>,
    outputs: Vec<TxOutput>,
    fee_amount: String,
    height: u32,
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
            .plugin(tauri_plugin_store::Builder::default().build())
            .invoke_handler(tauri::generate_handler![
                pk2address,
                validate_address,
                create_tx,
                sign_tx
            ])
            .setup(move |app| {
                println!("App config dir: {}", app.path().app_config_dir().unwrap().to_str().unwrap());
                println!("App data dir: {}", app.path().app_data_dir().unwrap().to_str().unwrap());

                // set window title with application version
                if let Some(version) = &app.config().package.version {
                    let main_window = app.get_window("main").unwrap();
                    let _ = main_window.set_title(&format!("Ergo Wallet v{}", version));
                }

                let mut network_prefix = NetworkPrefix::Mainnet;

                #[cfg(desktop)]
                {
                    app.handle().plugin(tauri_plugin_cli::init())?;

                    let matches = app.cli().matches().unwrap();
                    for (arg, data) in matches.args {
                        match arg.as_str() {
                            "network" => {
                                match data.value {
                                    Value::String(s) => {
                                        if s == "testnet" {
                                          network_prefix = NetworkPrefix::Testnet
                                        } 
                                    },
                                    Value::Null => {},
                                    _ => panic!("Wrong value of network type"),
                                }
                            }
                            &_ => {}
                        }
                    }
                }
                println!("Network type: {:?}", &network_prefix);

                app.manage(AppState {
                    network: network_prefix,
                    wallet: Default::default()
                });

                if let Some(setup) = setup {
                    (setup)(app)?;
                }
                Ok(())
            })
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}
