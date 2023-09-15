import * as React from 'react';
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import {MoneyUnits} from "../../../../common/MoneyUnits";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TransferDialog from "../transfer/TransferDialog";
import {ErgoBoxSet} from "../../../../common/ErgoBoxSet";
import {WalletBox} from "../../../../main/application/services/wallet/Wallet";

const container = {
  marginTop: '15px'
}
const assetInput = {
  input: {
    padding: '10.5px'
  }
}

function Send (props: {fromBoxes: Array<WalletBox>}): React.ReactElement {
  const { fromBoxes } = props;
  const [asset, setAsset] = React.useState('ERG');
  const [transferDlgOpen, setTransferDlgOpen ] = React.useState(false);

  const boxSet = new ErgoBoxSet(fromBoxes);
  const decimals = asset === 'ERG' ? 9 : 0;
  const total = new MoneyUnits(boxSet.balance(asset), decimals);

  function handleChange(event: SelectChangeEvent): void {
    setAsset(event.target.value as string);
  }

  const handleTransferClose = () => {
    setTransferDlgOpen(false);
  };

  const handleSendClick = () => {
    setTransferDlgOpen(true);
  };

  const canSend = fromBoxes.length > 0;
  return (
    <Container sx={container}>
      <Grid container spacing={1}>
        <Grid alignItems="center"  spacing={1} container item lg={12} md={12} sm={12} xs={12}>
          <Grid item lg={1} md={1} sm={1}>
            Amount
          </Grid>
          <Grid item>
            <TextField
              size="small"
              variant="outlined"
              value={total.toMainUnits()}
            />
          </Grid>
          <Grid item>
            <FormControl>
              <Select
                value={asset}
                input={<OutlinedInput sx={ assetInput } />}
                onChange={handleChange}
              >
                {boxSet.assetsIds().map((id: string) => (
                  <MenuItem key={id} value={id}>{id.substr(0, 4)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              disabled={!canSend}
              onClick={handleSendClick}
              variant="contained"
              color="secondary"
              endIcon={<SendOutlinedIcon />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {transferDlgOpen && (
        <TransferDialog
          assetId={asset}
          fromBoxes={fromBoxes}
          open={transferDlgOpen}
          onClose={handleTransferClose}
        />)}
    </Container>
  );
}

export default Send;
