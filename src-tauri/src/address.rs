use ergo_lib::ergotree_ir::chain::address::{Address, AddressEncoder, NetworkPrefix};

pub fn from_pub_key(pub_key: &[u8], network: NetworkPrefix) -> String {
    let p2pk_address = Address::p2pk_from_pk_bytes(pub_key).unwrap();
    let encoder = AddressEncoder::new(network);
    encoder.address_to_str(&p2pk_address)
}

pub fn validate(address: &str, network: NetworkPrefix) -> bool {
  let encoder = AddressEncoder::new(network);
  let result = encoder.parse_address_from_str(address);
  match result {
      Ok(_addr) => true,
      Err(_err) => false,
  }
}
