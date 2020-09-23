import * as React from 'react';
import {Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";
import * as backend from '../../../Backend';
import InitialStep from "./InitialStep";
import ConfirmationStep from "./ConfirmationStep";
import {UnsignedTransaction} from "../../../../main/application/services/wallet/TransactionBuilder";
import FinalStep from "./FinalStep";
import {WalletBox} from "../../../../main/application/services/wallet/Wallet";

enum Page {
  INITIAL,
  CONFIRMATION,
  DONE
}

interface TransferProps {
  open: boolean;
  onClose: () => void;
  fromBoxes: Array<WalletBox>;
}

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

function TransferDialog(props: TransferProps): React.ReactElement {
  const classes = useStyles();
  const {onClose, open, fromBoxes} = props;

  const [page, setPage] = React.useState<Page>(Page.INITIAL);
  const [unsignedTx, setUnsignedTx] = React.useState(null);
  const [sendingError, setSendingError] = React.useState(null);
  const [resultTxId, setResultTxId] = React.useState<string>();

  function handleClose(): void {
    onClose();
  }

  function openConfirmPage(tx: UnsignedTransaction): void {
    setUnsignedTx(tx);
    setPage(Page.CONFIRMATION);
  }

  async function handleSend(): Promise<void> {
    try {
      const signedTx = await backend.signTransaction(unsignedTx);

      const txId = await backend.sendTransaction(signedTx.ergoTx);

      if (txId != signedTx.ergoTx.id) {
        console.warn(`Got tx id ${txId} != ${signedTx.ergoTx.id}`);
      }
      setResultTxId(txId);
      setPage(Page.DONE);
    } catch (err) {
      setSendingError(err.message);
    }
  }

  function renderCurrentPage(): React.ReactElement {
    switch (page) {
      case Page.INITIAL:
        return (
          <InitialStep
            backendApi={backend}
            fromBoxes={fromBoxes}
            onContinue={openConfirmPage}
          />
        );

      case Page.CONFIRMATION:
        return (
          <ConfirmationStep
            error={sendingError}
            onSend={handleSend}
            tx={unsignedTx}
          />
        );

      case Page.DONE:
        return (
          <FinalStep
            txId={resultTxId}
            onClose={handleClose}
          />
        );
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle disableTypography={true}>
        <Typography variant="h6">Transfer ERG</Typography>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {renderCurrentPage()}
      </DialogContent>
    </Dialog>
  );
}

export default TransferDialog;
