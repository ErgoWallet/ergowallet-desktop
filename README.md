# Ergo Desktop Wallet

Non-custodial desktop wallet for [Ergo Platform](https://ergoplatform.org) blockchain

[![Gitter](https://badges.gitter.im/ergo-wallet/community.svg)](https://gitter.im/ergo-wallet/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Twitter](https://img.shields.io/twitter/follow/ErgoWallet?label=Twitter&style=social)](https://twitter.com/ErgoWallet)

### How to run application

Install dependencies
```
$ npm install
```

Start application
```
$ npm run tauri dev
```

### How to build
```
$ npm run build
$ npm run dist
```

### How to verify checksums of release

MacOS, Linux, or Windows with gitbash: `shasum -a 256 <filename>`

Windows with cmd `certutil -hashfile <filename> SHA256`

### Help & Support

https://support.ergowallet.io/