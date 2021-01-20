import {SingleKeyManager} from "./SingleKeyManager";

describe('SingleKeyManager', () => {
  it('should be built from secret', () => {
    const km = new SingleKeyManager("8e6993a4999f009c03d9457ffcf8ff3d840ae78332c959c8e806a53fbafbbee1");
    expect(km.allKeys()[0].address).toEqual("9gsLq5a12nJe33nKtjMe7NPY7o8CQAtjS9amDgALbebv1wmRXrv");
    const privateKey = km.getSecretKey("9gsLq5a12nJe33nKtjMe7NPY7o8CQAtjS9amDgALbebv1wmRXrv");
    expect(privateKey.toString('hex')).toEqual("8e6993a4999f009c03d9457ffcf8ff3d840ae78332c959c8e806a53fbafbbee1");
  });
});
