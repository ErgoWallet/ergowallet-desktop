import * as React from 'react';
import InitWalletParams from "../InitWalletParams";
import InputMnemonic from "./InputMnemonic";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import * as backend from '../../../Backend';

// ****************************************************************************
// This wizard contains following steps:
//    - Set wallet name and password;
//    - Input mnemonic phrase
//    - Save (mnemonic, password, wallet name)
// ****************************************************************************

enum Pages {
  InitWalletParams = 0,
  InputMnemonic= 1
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

  function handleSetParams(walletName: string, password: string) {
    setWalletParams({walletName, password});
    setPage(Pages.InputMnemonic);
  }

  async function handleImport(mnemonic: string) {
    const { walletName, password } = walletParams;
    // We have all data here - (wallet name, mnemonic, password)

    await backend.importWallet(walletName, mnemonic, password)

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
  } else if (page === Pages.InputMnemonic) {
    content = (
      <InputMnemonic
        onCancel={handleCancel}
        onSubmit={handleImport}
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
