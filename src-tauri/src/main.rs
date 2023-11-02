// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod address;
use hex;

#[tauri::command]
fn pk2address(pub_key: String) -> String {
    let bytes = hex::decode(pub_key).unwrap();
    address::from_pub_key(bytes.as_slice())
}

#[tauri::command]
fn validate_address(address: &str) -> bool {
    address::validate(address)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            pk2address,
            validate_address
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
