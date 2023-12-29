import * as React from 'react';
// import { shell } from 'electron';
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Link, Typography } from "@mui/material";
import Address from "../../../components/Address";
import CloseIcon from '@mui/icons-material/Close';
import AssetValue from "../../../components/AssetValue";
import Hex from "../../../components/Hex";
import TokensValues from "../TokensValues";
import { WalletTx } from "../../../../common/backend-types";
import { Input } from "../../../../main/ergoplatform/connector/types";
import { WalletBox } from "../../../../main/application/services/wallet/Wallet";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import CopyToClipboard from "../../../components/CopyToClipboard";
import { useTheme } from '@mui/material/styles';
import { getTransaction } from '../../../backend';

interface TxDetailsProps {
  open: boolean;
  // tx: WalletTx;
  txId: string;
  onClose: () => void;
}

function TxDetailsDialog(props: TxDetailsProps) {
  const [loading, setLoading] = React.useState(false);
  const [tx, setTx] = React.useState<any>(null);
  const { onClose, open, txId } = props;

  React.useEffect(() => {
    const getTx = async () => {
      // TODO: if tx is null -> show error
      const res = await getTransaction(txId);
      setTx(res);
    };
    getTx();
  }, []);

  function handleClose(): void {
    onClose();
  }

  const handleTxIdClick = () => {
    // shell.openExternal(`${explorerBaseUri}/tx/${tx.id}`);
  };

  return (
    <>
      {tx && (<TxDetailsDialogView
        tx={tx} open={open} onClose={handleClose} onTxClick={handleTxIdClick}
      />)}
    </>
  );
}

export default TxDetailsDialog;

export function TxDetailsDialogView(
  props: { tx: WalletTx, open: boolean, onClose: any, onTxClick }
  ) {
  const theme = useTheme();
  const closeButtonStyle = {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  };
  const { tx, open, onClose, onTxClick } = props;
  return (
    <Dialog
    fullWidth={true}
    maxWidth="md"
    onClose={onClose}
    open={open}
  >
    <DialogTitle>
      <Typography variant="h6">Transaction details</Typography>
      <IconButton sx={closeButtonStyle} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      {/* Tx general information */}
      <Box display="flex" flexDirection="column">
        <Box display={"flex"}>
          <Box flexBasis={0} flexGrow={1}>ID</Box>
          <Box flexBasis={0} flexGrow={3} pl={1}>
            <Link onClick={onTxClick} href="#" variant="body2" title="Open in explorer">
              {/* TODO: on small screens shorten tx id */}
              <Hex>{tx.id}</Hex>
            </Link>

            <CopyToClipboard TooltipProps={{ title: "Tx ID Copied" }}>
              {({ copy }) => (
                <IconButton size="small" onClick={() => copy(tx.id)}>
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              )}
            </CopyToClipboard>
          </Box>
        </Box>
        <Box display={"flex"}>
          <Box flexBasis={0} flexGrow={1}>Block</Box>
          <Box flexBasis={0} flexGrow={3} pl={1}>{tx.inclusionHeight}</Box>
        </Box>
        <Box display={"flex"}>
          <Box flexBasis={0} flexGrow={1}>Confirmations</Box>
          <Box flexBasis={0} flexGrow={3} pl={1}>{tx.confirmationsCount}</Box>
        </Box>
        <Box display={"flex"}>
          <Box flexBasis={0} flexGrow={1}>Size</Box>
          <Box flexBasis={0} flexGrow={3} pl={1}>{tx.size}</Box>
        </Box>
      </Box>

      <Box height={20}></Box>

      {/* Tx Schema - Inputs -> Outputs */}
      <Grid container direction="column" wrap="nowrap">
        <Grid item>
          <Typography component="div" variant="h6" color="primary" gutterBottom>
            INPUTS
          </Typography>
        </Grid>
        {/* inputs list */}
        <Grid item>

          <Grid container direction="column">
            {
              tx.inputs.map((i: Input) => (
                <Box key={i.id} display="flex">
                  <Box flexBasis={0} flexGrow={2}>
                    {(i.address.length > 60) ? (
                      <Address shortened={true} value={i.address} />
                    ) : (
                      <Address shortened={false} value={i.address} />
                    )}
                  </Box>
                  <Box
                    flexBasis={0}
                    flexGrow={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    {/*<TokensValues assets={i.assets} />*/}
                    <AssetValue amount={i.value.toString()} decimals={9} symbol="ERG" />
                  </Box>
                </Box>
              ))
            }
          </Grid>
        </Grid>
        <Box height={20}></Box>
        <Grid item>
          <Typography component="div" variant="h6" color="primary" gutterBottom>
            OUTPUTS
          </Typography>
        </Grid>

        {/* outputs list */}
        <Grid item>
          <Grid container direction="column">
            {
              tx.outputs.map((i: WalletBox) => (
                <Box key={i.boxId} display="flex" alignItems="center">
                  <Box flexBasis={0} flexGrow={2}>
                    {(i.address.length > 60) ? (
                      <Address shortened={true} value={i.address} type={i.addressType} />
                    ) : (
                      <Address shortened={false} value={i.address} type={i.addressType} />
                    )}
                  </Box>
                  <Box
                    flexBasis={0}
                    flexGrow={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <TokensValues assets={i.assets} />
                    <AssetValue amount={i.value} decimals={9} symbol="ERG" />
                  </Box>
                </Box>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
  )
}