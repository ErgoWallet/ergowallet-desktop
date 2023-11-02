// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod address;
mod transaction;

use hex;
use transaction::{UnsignedTransaction, TxInput, TxOutput};

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

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            pk2address,
            validate_address,
            create_tx
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
