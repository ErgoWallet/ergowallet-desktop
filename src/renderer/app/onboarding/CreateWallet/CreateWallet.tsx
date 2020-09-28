import * as React from 'react';
import {Container} from '@material-ui/core';
import ConfirmMnemonic from "./ConfirmMnemonic";
import InitWalletParams from "../InitWalletParams";
import NewMnemonic from "./NewMnemonic";
import {makeStyles} from "@material-ui/core/styles";
import * as backend from "../../../Backend";

// ****************************************************************************
// This wizard contains following steps:
//    - Sets wallet name and password;
//    - Creates wallet mnemonic phrase
//    - Verify that user backed up mnemonic
//    - Save (mnemonic, password, wallet name)
// ****************************************************************************

enum Pages {
  InitWalletParams = 0,
  CreateMnemonic = 1,
  VerifyMnemonic = 2
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
}));

function CreateWallet (props: {onFinish?: any; onCancel?: any}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(Pages.InitWalletParams);
  const [walletParams, setWalletParams] = React.useState<{walletName: string, password: string}>();
  const [mnemonic, setMnemonic] = React.useState('');

  function handleSetParams(walletName: string, password: string) {
    setWalletParams({walletName, password});
    setPage(Pages.CreateMnemonic);
  }

  async function handleMnemonicConfirmed() {
    const { walletName, password } = walletParams;

    await backend.importWallet(walletName, mnemonic, password)

    props.onFinish();
  }

  function cancelCreation() {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  function handleNewMnemonic(mnemonic: string) {
    setMnemonic(mnemonic);
    setPage(Pages.VerifyMnemonic);
  }

  async function isNameAvailable(walletName: string): Promise<boolean> {
    const exists = await backend.isWalletExists(walletName);
    return !exists;
  }

  let content = null;
  if (page === Pages.InitWalletParams) {
    content = (
      <InitWalletParams
        onSetParams={handleSetParams}
        onCancel={cancelCreation}
        isNameAvailable={isNameAvailable}
      />
      );
  } else if (page === Pages.CreateMnemonic) {
    content = (
      <NewMnemonic
        onSubmit={handleNewMnemonic}
        backendApi={backend}
      />);
  } else if (page === Pages.VerifyMnemonic) {
    content = (
      <ConfirmMnemonic
        mnemonic={mnemonic}
        onConfirmed={handleMnemonicConfirmed}
      />)
  }

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        {content}
      </div>
    </Container>
  );

}

export default CreateWallet;
