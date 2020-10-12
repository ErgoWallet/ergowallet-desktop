import {ErgoBoxSet} from "./ErgoBoxSet";

describe("ErgoBoxSet", () => {
  it("calc ERG balance", () => {
    const boxes = [
      {
        "boxId": "5ddeb5b1e7c62ff522e7a776c15d066cbaa2e03379509c87b443f38ade7c5808",
        "transactionId": "33b588717c538f9f85a7fbea8eb3df112f013bd6e15343aaac5ad42088a4c8d0",
        "value": "15126500000",
        "index": 0,
        "creationHeight": 324574,
        "ergoTree": "100604000580df9825043c0e20d595c4a6575a58b394644979225cbf1564a73eded8cb10386f41d02d4f6b9e910428040ad806d601b2a5730000d602c67201060ed603e4c6a70504d604c1a7d6059272047301d6069aa3730295e67202d801d607ed93e47202cbc2a793cbc272017303eb02d1ededededededed8fa3720391a39972037304720593e4c672010405e4c6a7040593e4c672010504720393db63087201db6308a792c1720172047207d1ededededededed92a37203720593e4c672010405e4c6a7040592e4c672010504720690e4c6720105049a7206730593db63087201db6308a792c1720172047207d1edededed93e4c672010405e4c6a7040593e4c672010504720393c27201c2a793db63087201db6308a791c172017204",
        "address": "Gxd4hMRT6Lbs5atqVxppyRNa4pKntcdMiAzAnmobNoncQKGBzo7pXBnx2u2D9R9nSfFvtoePzrjxZReT3mx5S4Mg1yjZysXrZHXT2Fb8DJ171ipa5FUbN6skZduVHnjgcpHKymxp9PBMb7j7bXirPRdVdx27qBzUcHyyaHunXRDC7qXRHxESSY3rdzLAX61XLci3SF1PdgBYhSwDgwtuDCDtKBFVvEWXg5eWdJ7xEv8rYYK6Nrrhu8mnRUoiMN1PGxo1e4fzz44qHnVFYnLFp64TNLH6nffmYxEWBWkjLBvkhYR3xBpA8FaF7TosmjsoMu3nEzpNUMrL8iQgFhp6FmHxUWswajtpyNwrCQDKa4oKqWyk88SjxVXX94Eussf9BJvuneiKXx2rgZ",
        "assets": [{"tokenId": "08b59b14e4fdd60e5952314adbaa8b4e00bc0f0b676872a5224d3bf8591074cd", "amount": "1"}],
        "additionalRegisters": {"R4": "05fc8ba1ea0c", "R5": "04f8cf27"},
        "spentTransactionId": null
      },
      {
        "boxId": "257be6fe5b5e09746da9d121a1a6a081c7c2b03c33bdc9982926a8e4ebab6818",
        "transactionId": "33b588717c538f9f85a7fbea8eb3df112f013bd6e15343aaac5ad42088a4c8d0",
        "value": "2500000",
        "index": 1,
        "creationHeight": 324574,
        "ergoTree": "0008cd0327e65711a59378c59359c3e1d0f7abe906479eccb76094e50fe79d743ccc15e6",
        "address": "9gmNsqrqdSppLUBqg2UzREmmivgqh1r3jmNcLAc53hk3YCvAGWE",
        "assets": [],
        "additionalRegisters": {},
        "spentTransactionId": null
      },
      {
        "boxId": "5e6584933860f5dcabe535dc555185f9336ae762d79f28d493bac28a596dc5f3",
        "transactionId": "33b588717c538f9f85a7fbea8eb3df112f013bd6e15343aaac5ad42088a4c8d0",
        "value": "2500000",
        "index": 2,
        "creationHeight": 324574,
        "ergoTree": "0008cd0327e65711a59378c59359c3e1d0f7abe906479eccb76094e50fe79d743ccc15e6",
        "address": "9gmNsqrqdSppLUBqg2UzREmmivgqh1r3jmNcLAc53hk3YCvAGWE",
        "assets": [], "additionalRegisters": {},
        "spentTransactionId": null
      },
      {
        "boxId": "7e61ea89c721b91a8cf3f2337fb1002c58e859a825243fa5012444ce2d591f99",
        "transactionId": "33b588717c538f9f85a7fbea8eb3df112f013bd6e15343aaac5ad42088a4c8d0",
        "value": "2000000",
        "index": 3,
        "creationHeight": 324574,
        "ergoTree": "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304",
        "address": "2iHkR7CWvD1R4j1yZg5bkeDRQavjAaVPeTDFGGLZduHyfWMuYpmhHocX8GJoaieTx78FntzJbCBVL6rf96ocJoZdmWBL2fci7NqWgAirppPQmZ7fN9V6z13Ay6brPriBKYqLp1bT2Fk4FkFLCfdPpe",
        "assets": [],
        "additionalRegisters": {},
        "spentTransactionId": "9d879d915986cfe4233b4dcef98fca5ae6b19d9498818d9d25256dce8a4ba2ad"
      },
      {
        "boxId": "c983c53075a703455aa53c3d93836d50cb4ecc7ab47390895b019ce53d9bdb49",
        "transactionId": "33b588717c538f9f85a7fbea8eb3df112f013bd6e15343aaac5ad42088a4c8d0",
        "value": "42362500000",
        "index": 4,
        "creationHeight": 324574,
        "ergoTree": "0008cd0327e65711a59378c59359c3e1d0f7abe906479eccb76094e50fe79d743ccc15e6",
        "address": "9gmNsqrqdSppLUBqg2UzREmmivgqh1r3jmNcLAc53hk3YCvAGWE",
        "assets": [],
        "additionalRegisters": {},
        "spentTransactionId": null
      }];
    const set = new ErgoBoxSet(boxes);
    console.log(set.assetsIds());
    expect(set.balance('ERG').toString()).toEqual("57496000000");
    expect(set.balance('08b59b14e4fdd60e5952314adbaa8b4e00bc0f0b676872a5224d3bf8591074cd').toString()).toEqual("1");
  });
});
