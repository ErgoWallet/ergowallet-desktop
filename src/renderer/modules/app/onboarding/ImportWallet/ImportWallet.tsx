import * as React from "react";
import InitWalletParams from "../InitWalletParams";
import InputMnemonic from "./InputMnemonic";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as backend from "../../../../Backend";
import SelectWalletType, {WalletType} from "./SelectWalletType";
import InputPrivateKey from "./InputPrivateKey";

// ****************************************************************************
// This wizard contains following steps:
//    - Set wallet name and password;
//    - Select type of importing wallet (mnemonic, single private key, etc.)
//    - Input BIP39 mnemonic phrase and passphrase (optional) or single private key
//    - Save (mnemonic, passphrase, password, wallet name) or
//      (private key, password, wallet name)
// ****************************************************************************

enum Pages {
  InitWalletParams = 0,
  SelectWalletType = 1,
  InputMnemonic = 2,
  InputPrivateKey = 3
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function ImportWallet (props: {onFinish?: any, onCancel?: any}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(Pages.InitWalletParams);
  const [walletParams, setWalletParams] = React.useState<{walletName: string, password: string}>();
  const [walletType, setWalletType] = React.useState('mnemonic');

  function handleSetParams(walletName: string, password: string) {
    setWalletParams({walletName, password});
    setPage(Pages.SelectWalletType);
  }

  function handleWalletType(walletType: any) {
    setWalletType(walletType);
    if (walletType === WalletType.Mnemonic) {
      setPage(Pages.InputMnemonic);
    } else if (walletType === WalletType.PrivateKey) {
      setPage(Pages.InputPrivateKey);
    }
  }

  async function handleImportMnemonic(mnemonic: string, bip39Passphrase: string) {
    const { walletName, password } = walletParams;
    // We have all data here - (wallet name, mnemonic, password)

    await backend.importMnemonic(walletName, mnemonic, bip39Passphrase, password)
    props.onFinish();
  }

  async function handleImportPrivateKey(privateKey: string) {
    const { walletName, password } = walletParams;
    // We have all data here - (wallet name, mnemonic, password)

    await backend.importPrivateKey(walletName, privateKey, password)
    props.onFinish();
  }

  function handleCancel(): void {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  async function isNameAvailable(walletName: string): Promise<boolean> {
    const exists = await backend.isWalletExists(walletName);
    return !exists;
  }

  let content = null;
  if (page === Pages.InitWalletParams) {
    content = (
      <InitWalletParams
        onCancel={handleCancel}
        onSetParams={handleSetParams}
        isNameAvailable={isNameAvailable}
      />);
  } else if (page === Pages.SelectWalletType) {
    content = (
      <SelectWalletType
        onCancel={handleCancel}
        onSubmit={handleWalletType}
      />
    );
  } else if (page === Pages.InputPrivateKey) {
    content = (
      <InputPrivateKey
        onCancel={handleCancel}
        onSubmit={handleImportPrivateKey}
      />
    );
  } else if (page === Pages.InputMnemonic) {
    content = (
      <InputMnemonic
        onCancel={handleCancel}
        onSubmit={handleImportMnemonic}
      />);
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        {content}
      </div>
    </Container>
  );
}

export default ImportWallet;
