import { KeyManager } from "./KeyManager";

describe("KeyManager", () => {
  it("works", () => {
    const km = KeyManager.recover('');
    expect(km.hdPubKeys[0].index()).toEqual(0);

    km.generateNewKey();
    expect(km.hdPubKeys[1].index()).toEqual(1);

    km.generateNewKey(true);
    expect(km.hdPubKeys.map((value) => value.index())).toEqual([
      0,  1,  2,  3,  4,  5,  6,  7, 8,  9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21
    ]);
  });
});
