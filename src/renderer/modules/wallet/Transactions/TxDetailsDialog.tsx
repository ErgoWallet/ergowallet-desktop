import * as React from 'react';
import {Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography} from "@material-ui/core";
import Address from "../../../components/Address";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";
import AssetValue from "../../../components/AssetValue";
import Hex from "../../../components/Hex";
import TokensValues from "../TokensValues";
import {WalletTx} from "../../../../common/backend-types";

interface TxDetailsProps {
  open: boolean;
  tx: WalletTx;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

function TxDetailsDialog(props: TxDetailsProps): React.ReactElement {
  const classes = useStyles();
  const {onClose, open, tx}  = props;

  function handleClose(): void {
    onClose();
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle disableTypography={true}>
        <Typography variant="h6">Transaction details</Typography>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Tx general information */}

        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            ID
          </Grid>
          <Grid item>
            <Hex>{tx.id}</Hex>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            Confirmations
          </Grid>
          <Grid item>
            {tx.confirmationsCount}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            Size
          </Grid>
          <Grid item>
            {tx.size}
          </Grid>
        </Grid>
        <br />
        <Grid item>
          <Typography component="div" variant="h6" color="primary" gutterBottom>
            INPUTS
          </Typography>
        </Grid>
        {/* Tx Schema - Inputs -> Outputs */}
        <Grid container direction="column" wrap="nowrap">
          {/* inputs list */}
          <Grid item>

            <Grid container direction={'column'}>
              {
                tx.inputs.map((i: any) => (
                  <Box key={i.id} display="flex">
                    <Box flexBasis={0} flexGrow={2}>
                      {(i.address.length > 60) ? (
                        <Address shortened={true} value={i.address} type={i.addressType}/>
                      ) : (
                        <Address shortened={false} value={i.address} type={i.addressType}/>
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
                      <AssetValue amount={i.value} decimals={9} symbol="ERG"/>
                    </Box>
                  </Box>
                ))
              }
            </Grid>

          </Grid>
          <br />
          <Grid item>
            <Typography component="div" variant="h6" color="primary" gutterBottom>
              OUTPUTS
            </Typography>
          </Grid>

          {/* outputs list */}
          <Grid item>
            <Grid container direction="column">
              {
                tx.outputs.map((i: any) => (
                  <Box key={i.id} display="flex">
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
                        <AssetValue amount={i.value} decimals={9} symbol="ERG"/>
                      </Box>
                  </Box>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default TxDetailsDialog;
