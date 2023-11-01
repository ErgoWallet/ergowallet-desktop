import { HDKey } from "@scure/bip32";
import { KeyManager } from "./KeyManager";
import * as bip39 from "./bip39";

describe("KeyManager", () => {
  it("works", () => {
    const km = KeyManager.recover(bip39.generateMnemonic());
    expect(km.hdPubKeys[0].index).toEqual(0);

    km.generateNewKey();
    expect(km.hdPubKeys[1].index).toEqual(1);

    km.generateNewKey(true);
    expect(km.hdPubKeys.map((value) => value.index)).toEqual([
      0,  1,  2,  3,  4,  5,  6,  7, 8,  9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21
    ]);
  });

  it("should derive keys", () => {
    const seed = bip39.mnemonicToSeedSync(bip39.generateMnemonic());

    const masterKey = HDKey.fromMasterSeed(seed)
    const km = new KeyManager(masterKey);
    let k = km.generateNewKey();
    k = km.generateNewKey(true);
    k = km.generateNewKey(true);
    expect(km.allKeys().length).toEqual(3);
  });
});
